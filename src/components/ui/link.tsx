import * as React from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* =============================================================================
   LINK COMPONENTS
   Consistent link primitives following the design system
   ============================================================================= */

/**
 * ExternalLink - Link to external resources
 * Includes external link icon and proper security attributes
 */
interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  /** Show the external link icon (default: true) */
  showIcon?: boolean;
  /** Track click with analytics callback */
  onTrackClick?: () => void;
}

export const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ className, children, href, showIcon = true, onTrackClick, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onTrackClick) {
        onTrackClick();
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-primary hover:underline inline-flex items-center gap-1",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        {showIcon && <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />}
      </a>
    );
  }
);
ExternalLink.displayName = "ExternalLink";

/**
 * TextLink - Internal or general purpose text link
 * For in-content links with primary color and underline on hover
 */
interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "text-primary hover:underline underline-offset-4 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);
TextLink.displayName = "TextLink";
