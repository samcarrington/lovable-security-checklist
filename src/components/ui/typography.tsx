import * as React from "react";
import { cn } from "@/lib/utils";

/* =============================================================================
   ATOMIC TYPOGRAPHY COMPONENTS
   Consistent typography primitives following the design system
   ============================================================================= */

/**
 * PageTitle - Primary page heading (h1)
 * Used for main page titles with teal accent color
 */
interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const PageTitle = React.forwardRef<HTMLHeadingElement, PageTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "text-fluid-3xl font-bold text-primary font-display leading-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
);
PageTitle.displayName = "PageTitle";

/**
 * SectionHeading - Section heading (h2)
 * Used for major section divisions within a page
 */
interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  size?: "default" | "lg";
}

export const SectionHeading = React.forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  ({ className, children, size = "default", ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "font-semibold text-foreground font-display",
        size === "lg" ? "text-fluid-xl" : "text-fluid-lg",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
);
SectionHeading.displayName = "SectionHeading";

/**
 * SubHeading - Subsection heading (h3)
 * Used for card titles and subsections
 */
interface SubHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const SubHeading = React.forwardRef<HTMLHeadingElement, SubHeadingProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold text-foreground font-display",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);
SubHeading.displayName = "SubHeading";

/**
 * Lead - Lead paragraph for introductory text
 * Larger text used below page titles
 */
interface LeadProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-lg text-muted-foreground max-w-3xl",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);
Lead.displayName = "Lead";

/**
 * Muted - Secondary/supporting text
 * Used for descriptions, captions, and helper text
 */
interface MutedProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  size?: "xs" | "sm" | "base";
}

export const Muted = React.forwardRef<HTMLParagraphElement, MutedProps>(
  ({ className, children, size = "sm", ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-muted-foreground",
        size === "xs" && "text-xs",
        size === "sm" && "text-sm",
        size === "base" && "text-base",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);
Muted.displayName = "Muted";

/**
 * Mono - Monospace text for technical content
 * Used for counts, codes, and technical labels
 */
interface MonoProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  as?: "span" | "p";
}

export const Mono = React.forwardRef<HTMLElement, MonoProps>(
  ({ className, children, as: Component = "span", ...props }, ref) => (
    <Component
      ref={ref as React.Ref<HTMLSpanElement & HTMLParagraphElement>}
      className={cn(
        "text-sm text-muted-foreground font-mono",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);
Mono.displayName = "Mono";
