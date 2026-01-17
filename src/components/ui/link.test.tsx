import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ExternalLink, TextLink } from "./link";

describe("Link Components", () => {
  describe("ExternalLink", () => {
    it("renders children correctly", () => {
      render(<ExternalLink href="https://example.com">Example Link</ExternalLink>);
      
      expect(screen.getByText("Example Link")).toBeInTheDocument();
    });

    it("renders with correct href", () => {
      render(<ExternalLink href="https://example.com">Link</ExternalLink>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("opens in new tab with security attributes", () => {
      render(<ExternalLink href="https://example.com">Link</ExternalLink>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("shows external link icon by default", () => {
      const { container } = render(<ExternalLink href="https://example.com">Link</ExternalLink>);
      
      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("hides icon when showIcon=false", () => {
      const { container } = render(
        <ExternalLink href="https://example.com" showIcon={false}>Link</ExternalLink>
      );
      
      const icon = container.querySelector("svg");
      expect(icon).not.toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
      const handleClick = vi.fn();
      render(
        <ExternalLink href="https://example.com" onClick={handleClick}>
          Link
        </ExternalLink>
      );
      
      fireEvent.click(screen.getByRole("link"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onTrackClick analytics callback when clicked", () => {
      const handleTrackClick = vi.fn();
      render(
        <ExternalLink href="https://example.com" onTrackClick={handleTrackClick}>
          Link
        </ExternalLink>
      );
      
      fireEvent.click(screen.getByRole("link"));
      expect(handleTrackClick).toHaveBeenCalledTimes(1);
    });

    it("calls both onClick and onTrackClick when both provided", () => {
      const handleClick = vi.fn();
      const handleTrackClick = vi.fn();
      render(
        <ExternalLink 
          href="https://example.com" 
          onClick={handleClick}
          onTrackClick={handleTrackClick}
        >
          Link
        </ExternalLink>
      );
      
      fireEvent.click(screen.getByRole("link"));
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleTrackClick).toHaveBeenCalledTimes(1);
    });

    it("applies custom className", () => {
      render(
        <ExternalLink href="https://example.com" className="custom-class">
          Link
        </ExternalLink>
      );
      
      const link = screen.getByRole("link");
      expect(link).toHaveClass("custom-class");
    });

    it("applies primary color styling", () => {
      render(<ExternalLink href="https://example.com">Link</ExternalLink>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveClass("text-primary");
    });
  });

  describe("TextLink", () => {
    it("renders children correctly", () => {
      render(<TextLink href="/page">Internal Link</TextLink>);
      
      expect(screen.getByText("Internal Link")).toBeInTheDocument();
    });

    it("renders with correct href", () => {
      render(<TextLink href="/about">About</TextLink>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/about");
    });

    it("applies primary color styling", () => {
      render(<TextLink href="/page">Link</TextLink>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveClass("text-primary");
    });

    it("applies underline offset for hover styling", () => {
      render(<TextLink href="/page">Link</TextLink>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveClass("underline-offset-4");
    });

    it("applies custom className", () => {
      render(<TextLink href="/page" className="custom-class">Link</TextLink>);
      
      const link = screen.getByRole("link");
      expect(link).toHaveClass("custom-class");
    });

    it("forwards additional props", () => {
      render(<TextLink href="/page" data-testid="text-link">Link</TextLink>);
      
      expect(screen.getByTestId("text-link")).toBeInTheDocument();
    });
  });
});
