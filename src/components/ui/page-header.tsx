import * as React from "react";
import { cn } from "@/lib/utils";
import { PageTitle, Lead, Mono } from "./typography";

/* =============================================================================
   PAGE HEADER COMPONENT
   Compound component for consistent page header layouts
   ============================================================================= */

interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface PageHeaderTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

interface PageHeaderDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

interface PageHeaderMetaProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

/**
 * PageHeader - Container for page header content
 * Use with PageHeader.Title, PageHeader.Description, and PageHeader.Meta
 *
 * @example
 * <PageHeader>
 *   <PageHeader.Title>Security Resources</PageHeader.Title>
 *   <PageHeader.Meta>24 resources across 5 categories</PageHeader.Meta>
 *   <PageHeader.Description>
 *     Example agents, prompts, and curated links.
 *   </PageHeader.Description>
 * </PageHeader>
 */
const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn("mb-16 text-4xl md:text-5xl", className)}
      {...props}
    >
      {children}
    </header>
  ),
);
PageHeader.displayName = "PageHeader";

const PageHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  PageHeaderTitleProps
>(({ className, children, ...props }, ref) => (
  <PageTitle ref={ref} className={cn("mb-2", className)} {...props}>
    {children}
  </PageTitle>
));
PageHeaderTitle.displayName = "PageHeader.Title";

const PageHeaderDescription = React.forwardRef<
  HTMLParagraphElement,
  PageHeaderDescriptionProps
>(({ className, children, ...props }, ref) => (
  <Lead ref={ref} className={className} {...props}>
    {children}
  </Lead>
));
PageHeaderDescription.displayName = "PageHeader.Description";

const PageHeaderMeta = React.forwardRef<
  HTMLParagraphElement,
  PageHeaderMetaProps
>(({ className, children, ...props }, ref) => (
  <Mono as="p" ref={ref} className={cn("mb-4", className)} {...props}>
    {children}
  </Mono>
));
PageHeaderMeta.displayName = "PageHeader.Meta";

// Compound component pattern
const PageHeaderCompound = Object.assign(PageHeader, {
  Title: PageHeaderTitle,
  Description: PageHeaderDescription,
  Meta: PageHeaderMeta,
});

export { PageHeaderCompound as PageHeader };
