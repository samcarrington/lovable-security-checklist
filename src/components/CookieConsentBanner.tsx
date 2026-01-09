import CookieConsent from 'react-cookie-consent';
import { updateConsent, ConsentState, getConsentState } from '@/lib/analytics';

/**
 * Cookie consent banner component for GDPR compliance.
 * Uses react-cookie-consent library with GTM Consent Mode v2 integration.
 */
export function CookieConsentBanner() {
  // Don't show banner if user has already made a choice
  const existingConsent = getConsentState();
  if (existingConsent !== null) {
    return null;
  }

  const handleAccept = () => {
    updateConsent(ConsentState.GRANTED);
  };

  const handleDecline = () => {
    updateConsent(ConsentState.DENIED);
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      onAccept={handleAccept}
      onDecline={handleDecline}
      cookieName="analytics_consent"
      disableStyles={false}
      containerClasses="fixed bottom-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between gap-4 bg-background border-t border-border px-4 py-4 shadow-lg md:px-6"
      contentClasses="flex-1 text-sm text-foreground"
      buttonClasses="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
      declineButtonClasses="bg-transparent border border-border text-foreground hover:bg-accent rounded-md px-4 py-2 text-sm font-medium transition-colors"
      style={{
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        borderTop: '1px solid hsl(var(--border))',
      }}
      buttonStyle={{
        background: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
        borderRadius: '6px',
        padding: '8px 16px',
        margin: '0 4px',
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid hsl(var(--border))',
        color: 'hsl(var(--foreground))',
        borderRadius: '6px',
        padding: '8px 16px',
        margin: '0 4px',
      }}
    >
      We use cookies to analyze site usage and improve your experience.{' '}
      <a 
        href="/privacy" 
        className="underline hover:text-primary"
        onClick={(e) => e.stopPropagation()}
      >
        Learn more
      </a>
    </CookieConsent>
  );
}

export default CookieConsentBanner;
