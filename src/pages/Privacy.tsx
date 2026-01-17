import { Link } from "react-router-dom";
import GradientBackground from "@/components/GradientBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
          <h1 className="text-3xl font-bold mb-8 text-foreground">
            Privacy Policy
          </h1>

          {/* Last updated */}
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: January 2026
          </p>

          {/* Data Collection Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Data Collection
            </h2>
            <p className="text-muted-foreground mb-4">
              We collect minimal information to provide and improve our service.
              The data we collect includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                Checklist progress stored locally in your browser (localStorage)
              </li>
              <li>Anonymous usage analytics when you provide consent</li>
              <li>
                Technical information such as browser type and device information
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We do not collect any personally identifiable information (PII) such
              as names, email addresses, or contact details.
            </p>
          </section>

          {/* Cookies Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Cookies
            </h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
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
            <p className="text-muted-foreground mt-4">
              You can control cookie preferences through our consent banner.
              Essential cookies cannot be disabled as they are required for basic
              functionality.
            </p>
          </section>

          {/* Analytics Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Analytics
            </h2>
            <p className="text-muted-foreground mb-4">
              When you grant consent, we use Google Analytics to understand how
              users interact with our service. This helps us improve the user
              experience and identify areas for enhancement.
            </p>
            <p className="text-muted-foreground mb-4">
              Analytics data collected includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Page views and navigation patterns</li>
              <li>Time spent on the application</li>
              <li>Progress milestones reached in the checklist</li>
              <li>Device and browser information</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              All analytics data is anonymized and cannot be used to identify
              individual users. We use Google Tag Manager with Consent Mode v2 to
              ensure analytics only runs when you have granted permission.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or how we handle
              your data, please reach out to us:
            </p>
            <p className="text-muted-foreground">
              Email:{" "}
              <a
                href="mailto:privacy@gwawr.co.uk"
                className="text-primary hover:text-primary/80 underline"
              >
                privacy@gwawr.co.uk
              </a>
            </p>
            <p className="text-muted-foreground mt-4">
              We are committed to addressing your concerns and will respond to
              privacy-related inquiries within a reasonable timeframe.
            </p>
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
