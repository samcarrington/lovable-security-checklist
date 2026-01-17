import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer text", () => {
    render(<Footer />);

    expect(
      screen.getByText(/Made by Sam Carrington using JSON from/i)
    ).toBeInTheDocument();
  });

  it("renders link to fine.dev", () => {
    render(<Footer />);

    const link = screen.getByRole("link", { name: /fine\.dev/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://www.fine.dev");
  });

  it("link opens in new tab", () => {
    render(<Footer />);

    const link = screen.getByRole("link", { name: /fine\.dev/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders external link icon", () => {
    const { container } = render(<Footer />);

    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});
