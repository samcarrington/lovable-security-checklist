import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ChecklistHeader from "./ChecklistHeader";

describe("ChecklistHeader", () => {
  it("renders title correctly", () => {
    render(<ChecklistHeader title="Security Checklist" totalProgress={50} />);

    expect(screen.getByText("Security Checklist")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<ChecklistHeader title="Test" totalProgress={0} />);

    expect(
      screen.getByText(/Use this list\* to set areas of priority/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/The list is not exhaustive/i)).toBeInTheDocument();
  });

  it("passes progress to ProgressDial component", () => {
    const { container } = render(
      <ChecklistHeader title="Test" totalProgress={75} />
    );

    const progressDial = container.querySelector('[role="progressbar"]');
    expect(progressDial).toBeInTheDocument();
  });

  it("renders with 0% progress", () => {
    render(<ChecklistHeader title="Test" totalProgress={0} />);

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders with 100% progress", () => {
    render(<ChecklistHeader title="Test" totalProgress={100} />);

    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
