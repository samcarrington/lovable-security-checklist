import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { ResourcePage } from "@/types/resources";
import { fetchAgenticEngineeringResources } from "@/services/resourcesService";
import GradientBackground from "@/components/GradientBackground";
import Navigation from "@/components/Navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ResourceCategoryCard from "@/components/ResourceCategoryCard";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/typography";

/**
 * Agentic Engineering resources page.
 * Features:
 * - Resources for transitioning from vibe coding to systematic AI workflows
 * - AI coding tools documentation
 * - Security best practices for AI development
 * - Community resources
 * - Left-aligned brutalist layout
 */
const AgenticEngineering = () => {
  const [resources, setResources] = useState<ResourcePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await fetchAgenticEngineeringResources();
        setResources(data);
      } catch (err) {
        console.error("Failed to load agentic engineering resources:", err);
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
          <PageHeader>
            <PageHeader.Title>{resources.title}</PageHeader.Title>
            <PageHeader.Meta>
              {totalLinks} resources across {resources.categories.length} categories
            </PageHeader.Meta>
            <PageHeader.Description className="max-w-3xl">
              {resources.description}
            </PageHeader.Description>
          </PageHeader>

          {/* Introduction - brutalist card styling */}
          <section className="mb-16 p-8 rounded-sm border-2 border-border bg-card">
            <SectionHeading className="text-xl mb-6">
              What is Agentic Engineering?
            </SectionHeading>
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
              <p className="mb-4">
                <strong className="text-foreground">Agentic Engineering</strong> is the practice of 
                building software with AI assistants as collaborative partners rather than simple 
                autocomplete tools. It&apos;s about moving from ad-hoc "vibe coding" to systematic, 
                repeatable workflows.
              </p>
              <p className="mb-4">
                Key principles include:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Defining clear agent personas with specific capabilities</li>
                <li>Creating reusable prompts and templates for common tasks</li>
                <li>Building verification loops into AI-assisted workflows</li>
                <li>Maintaining human oversight on security-critical decisions</li>
                <li>Documenting AI interactions for auditability</li>
              </ul>
              <p>
                The resources below will help you transition from exploratory AI coding to 
                production-grade agentic engineering practices.
              </p>
            </div>
          </section>

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

export default AgenticEngineering;
