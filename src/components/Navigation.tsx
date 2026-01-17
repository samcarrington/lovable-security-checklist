import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  to: string;
  label: string;
}

const navLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/resources", label: "Resources" },
  { to: "/owasp-links", label: "OWASP Links" },
  { to: "/agentic-engineering", label: "Agentic Engineering" },
];

/**
 * Responsive navigation component with hamburger menu on mobile.
 * Features:
 * - Desktop (>= 768px): Horizontal nav bar
 * - Mobile (< 768px): Hamburger menu with slide-out panel
 * - Full keyboard navigation with Escape to close
 * - ARIA compliant with proper roles and states
 * - Skip to main content link for accessibility
 */
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check viewport size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Mobile hamburger button */}
      {isMobile && (
        <button
          type="button"
          onClick={toggleMenu}
          className="fixed top-4 left-4 z-50 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md bg-background/80 backdrop-blur-sm border border-border shadow-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      )}

      {/* Navigation */}
      <nav
        id="main-navigation"
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          "transition-all duration-300 ease-out",
          isMobile
            ? cn(
                "fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center",
                isOpen
                  ? "opacity-100 visible"
                  : "opacity-0 invisible pointer-events-none"
              )
            : "mb-8"
        )}
      >
        <ul
          className={cn(
            "flex gap-2",
            isMobile
              ? "flex-col items-center gap-4"
              : "flex-row flex-wrap items-center justify-center"
          )}
        >
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={handleLinkClick}
                className={cn(
                  "inline-flex items-center justify-center px-4 py-2 min-h-[44px] rounded-md text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive(link.to)
                    ? "bg-primary/20 text-primary font-semibold border-l-2 border-primary"
                    : "text-muted-foreground"
                )}
                aria-current={isActive(link.to) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
