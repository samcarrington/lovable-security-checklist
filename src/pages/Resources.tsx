import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Bot } from "lucide-react";
import type { ExamplesManifest } from "@/types/examples";
import { fetchExamplesManifest } from "@/services/examplesService";
import GradientBackground from "@/components/GradientBackground";
import Navigation from "@/components/Navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ExampleCard from "@/components/ExampleCard";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

/**
 * Resources landing page displaying examples and links to reference pages.
 * Features:
 * - Security agent examples with View/Download
 * - Security prompt examples with View/Download
 * - Links to OWASP and Agentic Engineering resource pages
 */
const Resources = () => {
  const [manifest, setManifest] = useState<ExamplesManifest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadManifest() {
      try {
        const data = await fetchExamplesManifest();
        setManifest(data);
      } catch (err) {
        console.error("Failed to load examples manifest:", err);
        setError("Failed to load examples. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadManifest();
  }, []);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!manifest) return null;

  return (
    <GradientBackground intensity={50} brightness={89}>
      <div className="container py-8 px-4 mx-auto max-w-5xl">
        <ThemeToggle />
        <Navigation />

        <main id="main-content">
          {/* Page Header */}
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Security Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Example agents, prompts, and curated links to help you build secure software with AI assistance.
            </p>
          </header>

          {/* Agent Examples Section */}
          <section className="mb-12" aria-labelledby="agents-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Bot className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 id="agents-heading" className="text-xl font-semibold text-foreground">
                  {manifest.agents.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {manifest.agents.description}
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {manifest.agents.items.map((example) => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          </section>

          {/* Prompt Examples Section */}
          <section className="mb-12" aria-labelledby="prompts-heading">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Shield className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 id="prompts-heading" className="text-xl font-semibold text-foreground">
                  {manifest.prompts.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {manifest.prompts.description}
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {manifest.prompts.items.map((example) => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          </section>

          {/* Reference Links Section */}
          <section aria-labelledby="links-heading">
            <h2 id="links-heading" className="text-xl font-semibold text-foreground mb-6">
              Reference Links
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* OWASP Links Card */}
              <Link
                to="/owasp-links"
                className={cn(
                  "group flex items-center justify-between p-6 rounded-lg border border-border bg-card",
                  "hover:border-primary/50 hover:shadow-md transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    OWASP Security Resources
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Curated links from the OWASP Cheat Sheet Series
                  </p>
                </div>
                <ArrowRight
                  className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  aria-hidden="true"
                />
              </Link>

              {/* Agentic Engineering Card */}
              <Link
                to="/agentic-engineering"
                className={cn(
                  "group flex items-center justify-between p-6 rounded-lg border border-border bg-card",
                  "hover:border-primary/50 hover:shadow-md transition-all",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    Agentic Engineering
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    From vibe coding to systematic AI workflows
                  </p>
                </div>
                <ArrowRight
                  className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </GradientBackground>
  );
};

export default Resources;
