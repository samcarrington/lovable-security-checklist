import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingState from "./LoadingState";

describe("LoadingState", () => {
  it("renders loading message", () => {
    render(<LoadingState />);

    expect(screen.getByText("Loading checklist...")).toBeInTheDocument();
  });

  it("renders spinner", () => {
    const { container } = render(<LoadingState />);

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("centers content on screen", () => {
    const { container } = render(<LoadingState />);

    const wrapper = container.querySelector(
      ".flex.min-h-screen.items-center.justify-center"
    );
    expect(wrapper).toBeInTheDocument();
  });
});
