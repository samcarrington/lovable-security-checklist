import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { ResourcePage } from "@/types/resources";
import { fetchOWASPResources } from "@/services/resourcesService";
import GradientBackground from "@/components/GradientBackground";
import Navigation from "@/components/Navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ResourceCategoryCard from "@/components/ResourceCategoryCard";
import Footer from "@/components/Footer";

/**
 * OWASP Links page displaying categorized security resources.
 * Features:
 * - Organized by security topic (Authentication, Input Validation, etc.)
 * - Links to OWASP Cheat Sheet Series and related resources
 * - Cross-references to checklist sections
 * - Left-aligned brutalist layout
 */
const OWASPLinks = () => {
  const [resources, setResources] = useState<ResourcePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await fetchOWASPResources();
        setResources(data);
      } catch (err) {
        console.error("Failed to load OWASP resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadResources();
  }, []);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!resources) return null;

  const totalLinks = resources.categories.reduce(
    (sum, cat) => sum + cat.links.length,
    0
  );

  return (
    <GradientBackground intensity={50} brightness={89}>
      <div className="container py-8 px-4 mx-auto max-w-5xl">
        <ThemeToggle />
        <Navigation />

        <main id="main-content">
          {/* Back link */}
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Resources
          </Link>

          {/* Page Header - Left aligned, no icon-in-bg pattern */}
          <header className="mb-16">
            <h1 className="text-fluid-2xl md:text-fluid-3xl font-bold text-foreground font-display mb-2">
              {resources.title}
            </h1>
            <p className="text-sm text-muted-foreground font-mono mb-4">
              {totalLinks} resources across {resources.categories.length} categories
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {resources.description}
            </p>
          </header>

          {/* Categories with varied spacing */}
          <div className="space-y-8">
            {resources.categories.map((category, index) => (
              <div key={category.id} className={index === 0 ? "" : "pt-4"}>
                <ResourceCategoryCard
                  category={category}
                  defaultExpanded={true}
                />
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </GradientBackground>
  );
};

export default OWASPLinks;
