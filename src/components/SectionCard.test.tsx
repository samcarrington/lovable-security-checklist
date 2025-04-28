
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SectionCard from './SectionCard';
import { ChecklistSection } from '@/services/checklistService';

describe('SectionCard', () => {
  // Mock data
  const mockSection: ChecklistSection = {
    id: 'test-section',
    title: 'Test Section',
    items: [
      { id: 'item1', text: 'Item 1' },
      { id: 'item2', text: 'Item 2' },
      { id: 'item3', text: 'Item 3' },
    ]
  };

  // Test that the component renders correctly
  test('renders section title and items', () => {
    const mockCheckedItems = {};
    const mockOnItemToggle = jest.fn();

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
    const mockCheckedItems = {};
    const mockOnItemToggle = jest.fn();

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
    const mockCheckedItems = {
      'item1': true,
      'item3': true,
    };
    const mockOnItemToggle = jest.fn();

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
    expect(mockOnItemToggle).toHaveBeenCalledWith('item1', false);
    expect(mockOnItemToggle).toHaveBeenCalledWith('item3', false);
    expect(mockOnItemToggle).toHaveBeenCalledTimes(2);
  });
});
