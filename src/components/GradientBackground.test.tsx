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

  it("applies default intensity and brightness", () => {
    const { container } = render(
      <GradientBackground>
        <div>Test</div>
      </GradientBackground>
    );

    const gradientLayers = container.querySelectorAll(".fixed.inset-0");
    expect(gradientLayers).toHaveLength(2);
  });

  it("applies custom intensity", () => {
    const { container } = render(
      <GradientBackground intensity={75}>
        <div>Test</div>
      </GradientBackground>
    );

    const firstLayer = container.querySelector(".fixed.inset-0");
    expect(firstLayer).toHaveStyle({ opacity: "0.75" });
  });

  it("applies custom brightness", () => {
    const { container } = render(
      <GradientBackground brightness={80}>
        <div>Test</div>
      </GradientBackground>
    );

    const firstLayer = container.querySelector(".fixed.inset-0");
    expect(firstLayer).toHaveStyle({ filter: "brightness(0.8)" });
  });

  it("clamps intensity to 0-100 range", () => {
    const { container } = render(
      <GradientBackground intensity={150}>
        <div>Test</div>
      </GradientBackground>
    );

    const firstLayer = container.querySelector(".fixed.inset-0");
    expect(firstLayer).toHaveStyle({ opacity: "1" });
  });

  it("clamps brightness to 0-100 range", () => {
    const { container } = render(
      <GradientBackground brightness={-10}>
        <div>Test</div>
      </GradientBackground>
    );

    const firstLayer = container.querySelector(".fixed.inset-0");
    expect(firstLayer).toHaveStyle({ filter: "brightness(0)" });
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
