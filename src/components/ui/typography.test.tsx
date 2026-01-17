import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageTitle, SectionHeading, SubHeading, Lead, Muted, Mono } from "./typography";

describe("Typography Components", () => {
  describe("PageTitle", () => {
    it("renders children as h1", () => {
      render(<PageTitle>Test Title</PageTitle>);
      
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Test Title");
    });

    it("applies custom className", () => {
      render(<PageTitle className="custom-class">Title</PageTitle>);
      
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("custom-class");
    });

    it("forwards additional props", () => {
      render(<PageTitle data-testid="page-title">Title</PageTitle>);
      
      expect(screen.getByTestId("page-title")).toBeInTheDocument();
    });
  });

  describe("SectionHeading", () => {
    it("renders children as h2", () => {
      render(<SectionHeading>Section Title</SectionHeading>);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Section Title");
    });

    it("applies default size styling", () => {
      render(<SectionHeading>Section</SectionHeading>);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-fluid-lg");
    });

    it("applies large size styling when size=lg", () => {
      render(<SectionHeading size="lg">Section</SectionHeading>);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("text-fluid-xl");
    });

    it("applies custom className", () => {
      render(<SectionHeading className="custom-class">Section</SectionHeading>);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass("custom-class");
    });
  });

  describe("SubHeading", () => {
    it("renders children as h3", () => {
      render(<SubHeading>Subsection Title</SubHeading>);
      
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("Subsection Title");
    });

    it("applies custom className", () => {
      render(<SubHeading className="custom-class">Subsection</SubHeading>);
      
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveClass("custom-class");
    });
  });

  describe("Lead", () => {
    it("renders children as paragraph", () => {
      render(<Lead>Lead paragraph text</Lead>);
      
      expect(screen.getByText("Lead paragraph text")).toBeInTheDocument();
    });

    it("applies muted foreground styling", () => {
      render(<Lead>Lead text</Lead>);
      
      const element = screen.getByText("Lead text");
      expect(element).toHaveClass("text-muted-foreground");
      expect(element).toHaveClass("text-lg");
    });

    it("applies custom className", () => {
      render(<Lead className="custom-class">Lead</Lead>);
      
      const element = screen.getByText("Lead");
      expect(element).toHaveClass("custom-class");
    });
  });

  describe("Muted", () => {
    it("renders children as paragraph", () => {
      render(<Muted>Muted text</Muted>);
      
      expect(screen.getByText("Muted text")).toBeInTheDocument();
    });

    it("applies default sm size", () => {
      render(<Muted>Default size</Muted>);
      
      const element = screen.getByText("Default size");
      expect(element).toHaveClass("text-sm");
    });

    it("applies xs size when specified", () => {
      render(<Muted size="xs">Extra small</Muted>);
      
      const element = screen.getByText("Extra small");
      expect(element).toHaveClass("text-xs");
    });

    it("applies base size when specified", () => {
      render(<Muted size="base">Base size</Muted>);
      
      const element = screen.getByText("Base size");
      expect(element).toHaveClass("text-base");
    });

    it("applies muted foreground color", () => {
      render(<Muted>Muted</Muted>);
      
      const element = screen.getByText("Muted");
      expect(element).toHaveClass("text-muted-foreground");
    });
  });

  describe("Mono", () => {
    it("renders as span by default", () => {
      const { container } = render(<Mono>Code text</Mono>);
      
      const element = container.querySelector("span");
      expect(element).toHaveTextContent("Code text");
    });

    it("renders as paragraph when as=p", () => {
      render(<Mono as="p">Paragraph code</Mono>);
      
      const element = screen.getByText("Paragraph code");
      expect(element.tagName.toLowerCase()).toBe("p");
    });

    it("applies monospace font", () => {
      render(<Mono>Mono text</Mono>);
      
      const element = screen.getByText("Mono text");
      expect(element).toHaveClass("font-mono");
    });

    it("applies custom className", () => {
      render(<Mono className="custom-class">Mono</Mono>);
      
      const element = screen.getByText("Mono");
      expect(element).toHaveClass("custom-class");
    });
  });
});
