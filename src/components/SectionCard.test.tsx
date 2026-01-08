import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
});
