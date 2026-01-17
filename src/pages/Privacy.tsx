import { Link } from "react-router-dom";
import GradientBackground from "@/components/GradientBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTitle, SectionHeading, Muted } from "@/components/ui/typography";
import { TextLink } from "@/components/ui/link";

/**
 * Privacy Policy page component.
 * Displays the privacy policy with sections for data collection, cookies, analytics, and contact info.
 * Supports dark mode and follows the same styling patterns as other pages.
 */
const Privacy = () => {
  return (
    <GradientBackground intensity={50} brightness={89}>
      <div className="container py-8 px-4 mx-auto max-w-3xl">
        <ThemeToggle />
        <Navigation />

        <main id="main-content">
          {/* Main heading */}
          <PageTitle className="text-3xl mb-8">Privacy Policy</PageTitle>

          {/* Last updated */}
          <Muted className="mb-8">Last updated: January 2026</Muted>

          {/* Data Collection Section */}
          <section className="mb-8">
            <SectionHeading className="text-xl mb-4">
              Data Collection
            </SectionHeading>
            <Muted size="base" className="mb-4">
              We collect minimal information to provide and improve our service.
              The data we collect includes:
            </Muted>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                Checklist progress stored locally in your browser (localStorage)
              </li>
              <li>Anonymous usage analytics when you provide consent</li>
              <li>
                Technical information such as browser type and device information
              </li>
            </ul>
            <Muted size="base" className="mt-4">
              We do not collect any personally identifiable information (PII) such
              as names, email addresses, or contact details.
            </Muted>
          </section>

          {/* Cookies Section */}
          <section className="mb-8">
            <SectionHeading className="text-xl mb-4">Cookies</SectionHeading>
            <Muted size="base" className="mb-4">
              We use cookies and similar technologies to enhance your experience:
            </Muted>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                <strong className="text-foreground">Essential cookies:</strong> Required for the site to
                function properly, including storing your checklist progress
              </li>
              <li>
                <strong className="text-foreground">Analytics cookies:</strong> Used only with your consent to
                track anonymous usage patterns
              </li>
              <li>
                <strong className="text-foreground">Preference cookies:</strong> Remember your settings like
                theme preference (light/dark mode)
              </li>
            </ul>
            <Muted size="base" className="mt-4">
              You can control cookie preferences through our consent banner.
              Essential cookies cannot be disabled as they are required for basic
              functionality.
            </Muted>
          </section>

          {/* Analytics Section */}
          <section className="mb-8">
            <SectionHeading className="text-xl mb-4">Analytics</SectionHeading>
            <Muted size="base" className="mb-4">
              When you grant consent, we use Google Analytics to understand how
              users interact with our service. This helps us improve the user
              experience and identify areas for enhancement.
            </Muted>
            <Muted size="base" className="mb-4">
              Analytics data collected includes:
            </Muted>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Page views and navigation patterns</li>
              <li>Time spent on the application</li>
              <li>Progress milestones reached in the checklist</li>
              <li>Device and browser information</li>
            </ul>
            <Muted size="base" className="mt-4">
              All analytics data is anonymized and cannot be used to identify
              individual users. We use Google Tag Manager with Consent Mode v2 to
              ensure analytics only runs when you have granted permission.
            </Muted>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <SectionHeading className="text-xl mb-4">Contact Us</SectionHeading>
            <Muted size="base" className="mb-4">
              If you have any questions about this Privacy Policy or how we handle
              your data, please reach out to us:
            </Muted>
            <Muted size="base">
              Email:{" "}
              <TextLink href="mailto:privacy@gwawr.co.uk" className="underline">
                privacy@gwawr.co.uk
              </TextLink>
            </Muted>
            <Muted size="base" className="mt-4">
              We are committed to addressing your concerns and will respond to
              privacy-related inquiries within a reasonable timeframe.
            </Muted>
          </section>

          {/* Footer with back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              to="/"
              className="text-primary hover:text-primary/80 underline"
            >
              ← Return to Home
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </GradientBackground>
  );
};

export default Privacy;
