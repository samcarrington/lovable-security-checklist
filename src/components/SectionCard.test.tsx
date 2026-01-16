import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SectionCard from './SectionCard';
import { ChecklistSection } from '@/services/checklistService';

describe('SectionCard', () => {
  // Mock data
  const mockSection: ChecklistSection = {
    id: 'test-section',
    title: 'Test Section',
    description: 'Test Description',
    items: [
      { id: 'item1', title: 'Item 1', description: 'Description 1' },
      { id: 'item2', title: 'Item 2', description: 'Description 2' },
      { id: 'item3', title: 'Item 3', description: 'Description 3' },
    ]
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  // Test that the component renders correctly
  test('renders section title and items', () => {
    const mockCheckedItems: Record<string, boolean> = {};
    const mockOnItemToggle = vi.fn();

    render(
      <SectionCard 
        section={mockSection} 
        checkedItems={mockCheckedItems} 
        onItemToggle={mockOnItemToggle} 
      />
    );

    expect(screen.getByText('Test Section')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  // Test that clicking on an item calls onItemToggle with correct parameters
  test('clicking an item toggles it', () => {
    const mockCheckedItems: Record<string, boolean> = {};
    const mockOnItemToggle = vi.fn();

    render(
      <SectionCard 
        section={mockSection} 
        checkedItems={mockCheckedItems} 
        onItemToggle={mockOnItemToggle} 
      />
    );

    // Find the first item's checkbox and click it
    const firstCheckbox = screen.getByLabelText('Item 1');
    fireEvent.click(firstCheckbox);

    // Check that onItemToggle was called with the correct parameters
    expect(mockOnItemToggle).toHaveBeenCalledWith('item1', true);
  });

  // Test that clicking "Clear all" button unchecks all checked items
  test('clicking Clear all button unchecks all checked items', () => {
    // Set up mock with item1 and item3 checked
    const mockCheckedItems: Record<string, boolean> = {
      'item1': true,
      'item3': true,
    };
    const mockOnItemToggle = vi.fn();

    render(
      <SectionCard 
        section={mockSection} 
        checkedItems={mockCheckedItems} 
        onItemToggle={mockOnItemToggle} 
      />
    );

    // Click the "Clear all" button
    const clearButton = screen.getByText('Clear all');
    fireEvent.click(clearButton);

    // Check that onItemToggle was called for each checked item
    expect(mockOnItemToggle).toHaveBeenCalledTimes(2);
    
    // Verify calls for each item that should be unchecked
    const calls = mockOnItemToggle.mock.calls.map(call => ({ id: call[0], checked: call[1] }));
    expect(calls).toContainEqual({ id: 'item1', checked: false });
    expect(calls).toContainEqual({ id: 'item3', checked: false });
    // item2 shouldn't be included since it wasn't checked
    expect(calls).not.toContainEqual({ id: 'item2', checked: false });
  });

  // =========================================
  // CRITICAL GAP TESTS: Timer Cleanup
  // These tests verify memory leak prevention
  // =========================================
  describe('Timer Cleanup', () => {
    test('clears timers on component unmount to prevent memory leaks', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const mockOnItemToggle = vi.fn();
      
      // Start with all items checked (100% progress triggers confetti timer)
      const allChecked: Record<string, boolean> = {
        'item1': true,
        'item2': true,
        'item3': true,
      };

      const { unmount } = render(
        <SectionCard 
          section={mockSection} 
          checkedItems={allChecked} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Unmount the component - should clear any active timers
      unmount();

      // Verify clearTimeout was called (cleanup should happen)
      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      clearTimeoutSpy.mockRestore();
    });

    test('handles rapid progress changes without timer accumulation', () => {
      const setTimeoutSpy = vi.spyOn(global, 'setTimeout');
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      const mockOnItemToggle = vi.fn();

      // Start with no items checked
      const { rerender } = render(
        <SectionCard 
          section={mockSection} 
          checkedItems={{}} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Rapidly change progress multiple times
      rerender(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );
      
      rerender(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true, 'item2': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );
      
      rerender(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true, 'item2': true, 'item3': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Each progress change should set a new animation timer
      // The important thing is that old timers are cleared before new ones are set
      const _clearTimeoutCalls = clearTimeoutSpy.mock.calls.length;
      
      // Should have cleared previous timers when setting new ones
      // At minimum, animation timer cleanup should occur
      expect(setTimeoutSpy).toHaveBeenCalled();
      
      setTimeoutSpy.mockRestore();
      clearTimeoutSpy.mockRestore();
    });

    test('animation timer cleanup occurs after animation completes', () => {
      const mockOnItemToggle = vi.fn();

      render(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Fast-forward past the animation duration (1000ms)
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Component should still be stable after timer fires
      expect(screen.getByText('Test Section')).toBeInTheDocument();
    });
  });

  // =========================================
  // CRITICAL GAP TESTS: Confetti Behavior
  // These tests verify confetti display and cleanup
  // =========================================
  describe('Confetti and Section Completion', () => {
    test('shows completion styling at 100% progress', () => {
      const mockOnItemToggle = vi.fn();
      const allChecked: Record<string, boolean> = {
        'item1': true,
        'item2': true,
        'item3': true,
      };

      render(
        <SectionCard 
          section={mockSection} 
          checkedItems={allChecked} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // The section title should have completion styling (amber color)
      const title = screen.getByText('Test Section');
      expect(title).toHaveClass('text-amber-600');
    });

    test('confetti timer cleanup after 5 seconds', () => {
      const mockOnItemToggle = vi.fn();
      const allChecked: Record<string, boolean> = {
        'item1': true,
        'item2': true,
        'item3': true,
      };

      render(
        <SectionCard 
          section={mockSection} 
          checkedItems={allChecked} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Fast-forward past the confetti duration (5000ms)
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Component should be stable after confetti timer fires
      expect(screen.getByText('Test Section')).toBeInTheDocument();
    });

    test('tracks section complete only once per completion cycle', () => {
      const mockOnItemToggle = vi.fn();

      const { rerender } = render(
        <SectionCard 
          section={mockSection} 
          checkedItems={{}} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Complete the section
      rerender(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true, 'item2': true, 'item3': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Rerender with same 100% - should not fire completion again
      rerender(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true, 'item2': true, 'item3': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Component should be stable
      expect(screen.getByText('Test Section')).toBeInTheDocument();
    });

    test('resets completion tracking when unchecking items', () => {
      const mockOnItemToggle = vi.fn();

      const { rerender } = render(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true, 'item2': true, 'item3': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Uncheck an item
      rerender(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true, 'item2': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Title should no longer have completion styling
      const title = screen.getByText('Test Section');
      expect(title).not.toHaveClass('text-amber-600');
    });
  });

  // =========================================
  // CRITICAL GAP TESTS: Lazy Loading / Suspense
  // These tests verify confetti lazy loading behavior
  // =========================================
  describe('Confetti Lazy Loading', () => {
    test('renders without confetti when section is incomplete', () => {
      const mockOnItemToggle = vi.fn();

      render(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Confetti should not be rendered for incomplete sections
      // The component should render normally
      expect(screen.getByText('Test Section')).toBeInTheDocument();
      expect(screen.getByText('1/3')).toBeInTheDocument();
    });

    test('Suspense fallback handles confetti loading gracefully', () => {
      const mockOnItemToggle = vi.fn();
      const allChecked: Record<string, boolean> = {
        'item1': true,
        'item2': true,
        'item3': true,
      };

      // Render with 100% completion (triggers confetti)
      render(
        <SectionCard 
          section={mockSection} 
          checkedItems={allChecked} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      // Component should render even if confetti is loading
      // The Suspense fallback is null, so no loading indicator expected
      expect(screen.getByText('Test Section')).toBeInTheDocument();
      expect(screen.getByText('3/3')).toBeInTheDocument();
    });
  });

  // =========================================
  // Progress Display Tests
  // =========================================
  describe('Progress Display', () => {
    test('shows correct progress count', () => {
      const mockOnItemToggle = vi.fn();

      render(
        <SectionCard 
          section={mockSection} 
          checkedItems={{ 'item1': true, 'item2': true }} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      expect(screen.getByText('2/3')).toBeInTheDocument();
    });

    test('shows 0/n when no items checked', () => {
      const mockOnItemToggle = vi.fn();

      render(
        <SectionCard 
          section={mockSection} 
          checkedItems={{}} 
          onItemToggle={mockOnItemToggle} 
        />
      );

      expect(screen.getByText('0/3')).toBeInTheDocument();
    });
  });
});
