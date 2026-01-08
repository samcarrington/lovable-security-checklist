import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
  it("renders error message", () => {
    render(<ErrorState error="Test error message" />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("renders error heading", () => {
    render(<ErrorState error="Test error" />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders retry button", () => {
    render(<ErrorState error="Test error" />);

    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("reloads page when retry button clicked", async () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadMock },
      writable: true,
    });

    const user = userEvent.setup();
    render(<ErrorState error="Test error" />);

    const retryButton = screen.getByRole("button", { name: /retry/i });
    await user.click(retryButton);

    expect(reloadMock).toHaveBeenCalledOnce();
  });

  it("displays error with red styling", () => {
    const { container } = render(<ErrorState error="Test error" />);

    const errorContainer = container.querySelector(".bg-red-50");
    expect(errorContainer).toBeInTheDocument();
  });
});
