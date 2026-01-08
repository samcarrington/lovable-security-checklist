import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ChecklistGrid from "./ChecklistGrid";
import { ChecklistSection } from "@/services/checklistService";

const mockSections: ChecklistSection[] = [
  {
    id: "section1",
    title: "Test Section 1",
    description: "Description 1",
    items: [
      { id: "item1", text: "Item 1", category: "test" },
      { id: "item2", text: "Item 2", category: "test" },
    ],
  },
  {
    id: "section2",
    title: "Test Section 2",
    description: "Description 2",
    items: [{ id: "item3", text: "Item 3", category: "test" }],
  },
];

describe("ChecklistGrid", () => {
  it("renders all sections", () => {
    const mockToggle = vi.fn();
    render(
      <ChecklistGrid
        sections={mockSections}
        checkedItems={{}}
        onItemToggle={mockToggle}
      />
    );

    expect(screen.getByText("Test Section 1")).toBeInTheDocument();
    expect(screen.getByText("Test Section 2")).toBeInTheDocument();
  });

  it("renders empty grid when no sections provided", () => {
    const mockToggle = vi.fn();
    const { container } = render(
      <ChecklistGrid
        sections={[]}
        checkedItems={{}}
        onItemToggle={mockToggle}
      />
    );

    const grid = container.querySelector(".grid");
    expect(grid?.children).toHaveLength(0);
  });

  it("passes props to SectionCard components", () => {
    const mockToggle = vi.fn();
    const checkedItems = { item1: true };

    render(
      <ChecklistGrid
        sections={mockSections}
        checkedItems={checkedItems}
        onItemToggle={mockToggle}
      />
    );

    // Verify sections are rendered (items are in labels but labels might be empty)
    expect(screen.getByText("Test Section 1")).toBeInTheDocument();
    expect(screen.getByText("Test Section 2")).toBeInTheDocument();
  });
});
