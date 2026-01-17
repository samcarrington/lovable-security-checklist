import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import type { ResourceCategory } from "@/types/resources";
import { cn } from "@/lib/utils";
import { trackExternalLinkClick } from "@/lib/analytics";

interface ResourceCategoryCardProps {
  category: ResourceCategory;
  defaultExpanded?: boolean;
}

/**
 * Card component for displaying a category of resource links.
 * Features:
 * - Expandable/collapsible on mobile for long lists
 * - External link indicators
 * - Accessible link styling
 * - Analytics tracking for external links
 * - Brutalist styling with sharp corners
 */
const ResourceCategoryCard = ({
  category,
  defaultExpanded = true,
}: ResourceCategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleLinkClick = (url: string, title: string) => {
    trackExternalLinkClick(url, title, "resources");
  };

  return (
    <div className="rounded-sm border border-border bg-card overflow-hidden">
      {/* Header - clickable on mobile to expand/collapse */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between p-4 min-h-[44px]",
          "text-left hover:bg-accent/50 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          "md:cursor-default md:hover:bg-transparent"
        )}
        aria-expanded={isExpanded}
        aria-controls={`category-${category.id}`}
      >
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-foreground font-display">{category.title}</h3>
          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-sm bg-muted font-mono">
            {category.links.length}
          </span>
        </div>
        <div className="md:hidden">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Links list */}
      <div
        id={`category-${category.id}`}
        className={cn(
          "transition-all duration-200 ease-out overflow-hidden",
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
        )}
      >
        <ul className="divide-y divide-border">
          {category.links.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link.url, link.title)}
                className={cn(
                  "block p-4 hover:bg-accent/50 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground hover:text-primary transition-colors">
                        {link.title}
                      </span>
                      <ExternalLink
                        className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResourceCategoryCard;
