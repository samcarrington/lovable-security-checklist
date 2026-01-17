import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "./page-header";

describe("PageHeader Component", () => {
  describe("PageHeader container", () => {
    it("renders children", () => {
      render(
        <PageHeader>
          <span>Header content</span>
        </PageHeader>
      );
      
      expect(screen.getByText("Header content")).toBeInTheDocument();
    });

    it("renders as header element", () => {
      const { container } = render(
        <PageHeader>
          <span>Content</span>
        </PageHeader>
      );
      
      const header = container.querySelector("header");
      expect(header).toBeInTheDocument();
    });

    it("applies default margin-bottom", () => {
      const { container } = render(
        <PageHeader>
          <span>Content</span>
        </PageHeader>
      );
      
      const header = container.querySelector("header");
      expect(header).toHaveClass("mb-16");
    });

    it("applies custom className", () => {
      const { container } = render(
        <PageHeader className="custom-class">
          <span>Content</span>
        </PageHeader>
      );
      
      const header = container.querySelector("header");
      expect(header).toHaveClass("custom-class");
    });
  });

  describe("PageHeader.Title", () => {
    it("renders as h1", () => {
      render(
        <PageHeader>
          <PageHeader.Title>Page Title</PageHeader.Title>
        </PageHeader>
      );
      
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("Page Title");
    });

    it("applies default margin-bottom", () => {
      render(
        <PageHeader>
          <PageHeader.Title>Title</PageHeader.Title>
        </PageHeader>
      );
      
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("mb-2");
    });

    it("applies primary color for teal accent", () => {
      render(
        <PageHeader>
          <PageHeader.Title>Title</PageHeader.Title>
        </PageHeader>
      );
      
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveClass("text-primary");
    });
  });

  describe("PageHeader.Description", () => {
    it("renders description text", () => {
      render(
        <PageHeader>
          <PageHeader.Description>Description text here</PageHeader.Description>
        </PageHeader>
      );
      
      expect(screen.getByText("Description text here")).toBeInTheDocument();
    });

    it("applies muted foreground styling", () => {
      render(
        <PageHeader>
          <PageHeader.Description>Description</PageHeader.Description>
        </PageHeader>
      );
      
      const description = screen.getByText("Description");
      expect(description).toHaveClass("text-muted-foreground");
    });

    it("applies large text styling", () => {
      render(
        <PageHeader>
          <PageHeader.Description>Description</PageHeader.Description>
        </PageHeader>
      );
      
      const description = screen.getByText("Description");
      expect(description).toHaveClass("text-lg");
    });
  });

  describe("PageHeader.Meta", () => {
    it("renders meta text", () => {
      render(
        <PageHeader>
          <PageHeader.Meta>24 resources</PageHeader.Meta>
        </PageHeader>
      );
      
      expect(screen.getByText("24 resources")).toBeInTheDocument();
    });

    it("applies monospace font styling", () => {
      render(
        <PageHeader>
          <PageHeader.Meta>Meta info</PageHeader.Meta>
        </PageHeader>
      );
      
      const meta = screen.getByText("Meta info");
      expect(meta).toHaveClass("font-mono");
    });

    it("applies default margin-bottom", () => {
      render(
        <PageHeader>
          <PageHeader.Meta>Meta info</PageHeader.Meta>
        </PageHeader>
      );
      
      const meta = screen.getByText("Meta info");
      expect(meta).toHaveClass("mb-4");
    });
  });

  describe("Compound component integration", () => {
    it("renders all subcomponents together", () => {
      render(
        <PageHeader>
          <PageHeader.Title>Security Resources</PageHeader.Title>
          <PageHeader.Meta>24 resources across 5 categories</PageHeader.Meta>
          <PageHeader.Description>
            Example agents, prompts, and curated links.
          </PageHeader.Description>
        </PageHeader>
      );
      
      expect(screen.getByRole("heading", { level: 1, name: "Security Resources" })).toBeInTheDocument();
      expect(screen.getByText("24 resources across 5 categories")).toBeInTheDocument();
      expect(screen.getByText("Example agents, prompts, and curated links.")).toBeInTheDocument();
    });

    it("maintains accessibility structure", () => {
      const { container } = render(
        <PageHeader>
          <PageHeader.Title>Page Title</PageHeader.Title>
          <PageHeader.Description>Page description</PageHeader.Description>
        </PageHeader>
      );
      
      // Header element should contain h1
      const header = container.querySelector("header");
      const h1 = header?.querySelector("h1");
      expect(h1).toBeInTheDocument();
    });
  });
});
