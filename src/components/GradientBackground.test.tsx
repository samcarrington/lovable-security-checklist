import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import GradientBackground from "./GradientBackground";

describe("GradientBackground", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <GradientBackground>
        <div>Test Content</div>
      </GradientBackground>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies solid background with semantic tokens", () => {
    const { container } = render(
      <GradientBackground>
        <div>Test</div>
      </GradientBackground>
    );

    // New brutalist styling uses solid bg-background instead of gradients
    expect(container.firstChild).toHaveClass("bg-background");
  });

  it("renders subtle texture layer", () => {
    const { container } = render(
      <GradientBackground intensity={75}>
        <div>Test</div>
      </GradientBackground>
    );

    // Subtle texture layer is now pointer-events-none for minimal interference
    const textureLayer = container.querySelector(".fixed.inset-0.pointer-events-none");
    expect(textureLayer).toBeInTheDocument();
  });

  it("maintains API compatibility with intensity prop", () => {
    // Props are maintained for API compatibility but have minimal visual effect
    const { container } = render(
      <GradientBackground intensity={75}>
        <div>Test</div>
      </GradientBackground>
    );

    // Component should still render successfully
    expect(container.firstChild).toBeInTheDocument();
  });

  it("maintains API compatibility with brightness prop", () => {
    // Props are maintained for API compatibility but have minimal visual effect
    const { container } = render(
      <GradientBackground brightness={80}>
        <div>Test</div>
      </GradientBackground>
    );

    // Component should still render successfully
    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles extreme prop values gracefully", () => {
    const { container } = render(
      <GradientBackground intensity={150} brightness={-10}>
        <div>Test</div>
      </GradientBackground>
    );

    // Should render without errors despite extreme values
    expect(container.firstChild).toBeInTheDocument();
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <GradientBackground className="custom-class">
        <div>Test</div>
      </GradientBackground>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("renders with min-h-screen class", () => {
    const { container } = render(
      <GradientBackground>
        <div>Test</div>
      </GradientBackground>
    );

    expect(container.firstChild).toHaveClass("min-h-screen");
  });

  it("content layer has higher z-index", () => {
    const { container } = render(
      <GradientBackground>
        <div>Test</div>
      </GradientBackground>
    );

    const contentLayer = container.querySelector(".relative.z-10");
    expect(contentLayer).toBeInTheDocument();
  });
});
