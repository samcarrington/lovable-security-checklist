import { useState } from "react";
import { Eye, Download, FileText } from "lucide-react";
import type { ExampleItem } from "@/types/examples";
import { fetchExampleContent } from "@/services/examplesService";
import MarkdownViewer from "./MarkdownViewer";
import { cn } from "@/lib/utils";

interface ExampleCardProps {
  example: ExampleItem;
}

/**
 * Card component for displaying an example with View and Download actions.
 * Features:
 * - Clean, accessible card design
 * - View button opens MarkdownViewer modal
 * - Direct download link
 * - Loading state while fetching content
 */
const ExampleCard = ({ example }: ExampleCardProps) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleView = async () => {
    if (content) {
      setIsViewerOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const markdown = await fetchExampleContent(example.path);
      setContent(markdown);
      setIsViewerOpen(true);
    } catch (err) {
      setError("Failed to load content");
      console.error("Failed to fetch example content:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col p-4 rounded-lg border border-border bg-card",
          "hover:border-primary/50 hover:shadow-md transition-all duration-200"
        )}
      >
        {/* Icon and Title */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 p-2 rounded-md bg-primary/10 text-primary">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {example.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {example.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={handleView}
            disabled={isLoading}
            className={cn(
              "inline-flex items-center justify-center px-3 py-2 min-h-[44px] rounded-md text-sm font-medium",
              "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors"
            )}
            aria-label={`View ${example.title}`}
          >
            <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
            {isLoading ? "Loading..." : "View"}
          </button>
          <a
            href={example.path}
            download={example.filename}
            className={cn(
              "inline-flex items-center justify-center px-3 py-2 min-h-[44px] rounded-md text-sm font-medium",
              "border border-border text-foreground hover:bg-accent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "transition-colors"
            )}
            aria-label={`Download ${example.title}`}
          >
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Download
          </a>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-destructive mt-2" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* Markdown Viewer Modal */}
      {content && (
        <MarkdownViewer
          content={content}
          filename={example.filename}
          downloadUrl={example.path}
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </>
  );
};

export default ExampleCard;
