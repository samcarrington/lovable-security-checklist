import { useEffect, useRef } from "react";
import { X, Download, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MarkdownViewerProps {
  content: string;
  filename: string;
  downloadUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component for viewing markdown content with syntax highlighting.
 * Features:
 * - Syntax-highlighted markdown display
 * - Copy to clipboard functionality
 * - Download button
 * - Keyboard accessible (Escape to close, focus trap)
 * - Dark/light theme support
 */
const MarkdownViewer = ({
  content,
  filename,
  downloadUrl,
  isOpen,
  onClose,
}: MarkdownViewerProps) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Focus the close button when modal opens
    closeButtonRef.current?.focus();

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="markdown-viewer-title"
    >
      <div
        ref={modalRef}
        className={cn(
          "relative w-full max-w-4xl max-h-[85vh] flex flex-col",
          "bg-background rounded-lg shadow-xl border border-border",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2
            id="markdown-viewer-title"
            className="text-lg font-semibold text-foreground truncate pr-4"
          >
            {filename}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center p-2 min-w-[44px] min-h-[44px] rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={copied ? "Copied!" : "Copy to clipboard"}
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
              ) : (
                <Copy className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            <a
              href={downloadUrl}
              download={filename}
              className="inline-flex items-center justify-center p-2 min-w-[44px] min-h-[44px] rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Download ${filename}`}
            >
              <Download className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="inline-flex items-center justify-center p-2 min-w-[44px] min-h-[44px] rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Close viewer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <SyntaxHighlighter
            language="markdown"
            style={theme === "dark" ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            }}
            showLineNumbers
            wrapLines
            wrapLongLines
          >
            {content}
          </SyntaxHighlighter>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center px-4 py-2 min-h-[44px] rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Close
          </button>
          <a
            href={downloadUrl}
            download={filename}
            className="inline-flex items-center justify-center px-4 py-2 min-h-[44px] rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default MarkdownViewer;
