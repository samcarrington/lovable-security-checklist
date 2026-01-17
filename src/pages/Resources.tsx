import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading, SubHeading, Muted, Mono } from "@/components/ui/typography";

/**
 * Resources landing page displaying examples and links to reference pages.
 * Features:
 * - Hero featured agent with prominent display
 * - Security agent and prompt examples with View/Download
 * - Links to OWASP and Agentic Engineering resource pages
 * - Left-aligned brutalist layout
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

  // Split agents into hero (first) and rest
  const heroAgent = manifest.agents.items[0];
  const otherAgents = manifest.agents.items.slice(1);

  return (
    <GradientBackground intensity={50} brightness={89}>
      <div className="container py-8 px-4 mx-auto max-w-5xl">
        <ThemeToggle />
        <Navigation />

        <main id="main-content">
          {/* Page Header - Left aligned */}
          <PageHeader>
            <PageHeader.Title className="mb-4">Security Resources</PageHeader.Title>
            <PageHeader.Description className="max-w-2xl">
              Example agents, prompts, and curated links to help you build
              secure software with AI assistance.
            </PageHeader.Description>
          </PageHeader>

          {/* Agent Examples Section */}
          <section className="mb-16" aria-labelledby="agents-heading">
            <SectionHeading id="agents-heading" size="lg" className="mb-2">
              {manifest.agents.title}
            </SectionHeading>
            <Muted className="mb-8">
              {manifest.agents.description}
            </Muted>

            {/* Hero Featured Agent */}
            {heroAgent && (
              <div className="mb-8 p-6 border-2 border-primary rounded-sm bg-card">
                <Mono className="uppercase tracking-wider text-primary mb-2 block text-xs">
                  Featured
                </Mono>
                <SubHeading className="mb-2">
                  {heroAgent.title}
                </SubHeading>
                <ExampleCard example={heroAgent} hideTitle />
              </div>
            )}

            {/* Other Agents - Compact Grid */}
            {otherAgents.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {otherAgents.map((example) => (
                  <ExampleCard key={example.id} example={example} />
                ))}
              </div>
            )}
          </section>

          {/* Prompt Examples Section */}
          <section className="mb-16" aria-labelledby="prompts-heading">
            <SectionHeading id="prompts-heading" className="mb-2">
              {manifest.prompts.title}
            </SectionHeading>
            <Muted className="mb-8">
              {manifest.prompts.description}
            </Muted>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {manifest.prompts.items.map((example) => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          </section>

          {/* Reference Links Section */}
          <section aria-labelledby="links-heading">
            <SectionHeading id="links-heading" className="mb-8">
              Reference Links
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* OWASP Links Card */}
              <Link
                to="/owasp-links"
                className={cn(
                  "group flex items-center justify-between p-6 rounded-sm border-2 border-border bg-card",
                  "hover:border-primary transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <div>
                  <SubHeading className="text-base group-hover:text-primary transition-colors">
                    OWASP Security Resources
                  </SubHeading>
                  <Muted className="mt-1">
                    Curated links from the OWASP Cheat Sheet Series
                  </Muted>
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
                  "group flex items-center justify-between p-6 rounded-sm border-2 border-border bg-card",
                  "hover:border-primary transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <div>
                  <SubHeading className="text-base group-hover:text-primary transition-colors">
                    Agentic Engineering
                  </SubHeading>
                  <Muted className="mt-1">
                    From vibe coding to systematic AI workflows
                  </Muted>
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
