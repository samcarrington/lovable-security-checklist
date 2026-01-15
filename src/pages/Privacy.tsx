import { Link } from "react-router-dom";

/**
 * Privacy Policy page component.
 * Displays the privacy policy with sections for data collection, cookies, analytics, and contact info.
 * Supports dark mode and follows the same styling patterns as other pages.
 */
const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors px-4 py-8 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header with back link */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline inline-flex items-center gap-1"
          >
            ← Return to Home
          </Link>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Privacy Policy
        </h1>

        {/* Last updated */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Last updated: January 2026
        </p>

        {/* Data Collection Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Data Collection
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We collect minimal information to provide and improve our service. The data we collect includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
            <li>Checklist progress stored locally in your browser (localStorage)</li>
            <li>Anonymous usage analytics when you provide consent</li>
            <li>Technical information such as browser type and device information</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            We do not collect any personally identifiable information (PII) such as names, email addresses, or contact details.
          </p>
        </section>

        {/* Cookies Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Cookies
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We use cookies and similar technologies to enhance your experience:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
            <li><strong>Essential cookies:</strong> Required for the site to function properly, including storing your checklist progress</li>
            <li><strong>Analytics cookies:</strong> Used only with your consent to track anonymous usage patterns</li>
            <li><strong>Preference cookies:</strong> Remember your settings like theme preference (light/dark mode)</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            You can control cookie preferences through our consent banner. Essential cookies cannot be disabled as they are required for basic functionality.
          </p>
        </section>

        {/* Analytics Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When you grant consent, we use Google Analytics to understand how users interact with our service. This helps us improve the user experience and identify areas for enhancement.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Analytics data collected includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
            <li>Page views and navigation patterns</li>
            <li>Time spent on the application</li>
            <li>Progress milestones reached in the checklist</li>
            <li>Device and browser information</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            All analytics data is anonymized and cannot be used to identify individual users. We use Google Tag Manager with Consent Mode v2 to ensure analytics only runs when you have granted permission.
          </p>
        </section>

        {/* Contact Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about this Privacy Policy or how we handle your data, please reach out to us:
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Email: <a href="mailto:privacy@example.com" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">privacy@example.com</a>
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            We are committed to addressing your concerns and will respond to privacy-related inquiries within a reasonable timeframe.
          </p>
        </section>

        {/* Footer with back link */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link 
            to="/" 
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
