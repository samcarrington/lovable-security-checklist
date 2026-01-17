import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot } from "lucide-react";
import type { ResourcePage } from "@/types/resources";
import { fetchAgenticEngineeringResources } from "@/services/resourcesService";
import GradientBackground from "@/components/GradientBackground";
import Navigation from "@/components/Navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ResourceCategoryCard from "@/components/ResourceCategoryCard";
import Footer from "@/components/Footer";

/**
 * Agentic Engineering resources page.
 * Features:
 * - Resources for transitioning from vibe coding to systematic AI workflows
 * - AI coding tools documentation
 * - Security best practices for AI development
 * - Community resources
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

          {/* Page Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Bot className="h-8 w-8" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {resources.title}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {totalLinks} resources across {resources.categories.length} categories
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              {resources.description}
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-12 p-6 rounded-lg border border-border bg-card/50">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              What is Agentic Engineering?
            </h2>
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

          {/* Categories */}
          <div className="space-y-6">
            {resources.categories.map((category) => (
              <ResourceCategoryCard
                key={category.id}
                category={category}
                defaultExpanded={true}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </GradientBackground>
  );
};

export default AgenticEngineering;
