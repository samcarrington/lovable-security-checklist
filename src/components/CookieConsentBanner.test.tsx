import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CookieConsentBanner } from './CookieConsentBanner';
import * as analytics from '@/lib/analytics';

// Mock the analytics module
vi.mock('@/lib/analytics', () => ({
  updateConsent: vi.fn(),
  ConsentState: {
    GRANTED: 'granted',
    DENIED: 'denied',
  },
  getConsentState: vi.fn(),
}));

// Mock react-cookie-consent
vi.mock('react-cookie-consent', () => ({
  default: ({ 
    onAccept, 
    onDecline, 
    children,
    buttonText,
    declineButtonText,
  }: {
    onAccept: () => void;
    onDecline: () => void;
    children: React.ReactNode;
    buttonText: string;
    declineButtonText: string;
  }) => (
    <div data-testid="cookie-consent-banner">
      <div data-testid="cookie-consent-content">{children}</div>
      <button onClick={onAccept} data-testid="accept-button">
        {buttonText}
      </button>
      <button onClick={onDecline} data-testid="decline-button">
        {declineButtonText}
      </button>
    </div>
  ),
}));

describe('CookieConsentBanner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default: no consent state set yet
    vi.mocked(analytics.getConsentState).mockReturnValue(null);
  });

  test('renders the cookie consent banner', () => {
    render(<CookieConsentBanner />);
    
    expect(screen.getByTestId('cookie-consent-banner')).toBeInTheDocument();
  });

  test('displays consent message text', () => {
    render(<CookieConsentBanner />);
    
    expect(screen.getByTestId('cookie-consent-content')).toHaveTextContent(
      /cookies/i
    );
  });

  test('displays Accept and Decline buttons', () => {
    render(<CookieConsentBanner />);
    
    expect(screen.getByTestId('accept-button')).toBeInTheDocument();
    expect(screen.getByTestId('decline-button')).toBeInTheDocument();
  });

  test('calls updateConsent with GRANTED when Accept is clicked', async () => {
    render(<CookieConsentBanner />);
    
    fireEvent.click(screen.getByTestId('accept-button'));
    
    await waitFor(() => {
      expect(analytics.updateConsent).toHaveBeenCalledWith(
        analytics.ConsentState.GRANTED
      );
    });
  });

  test('calls updateConsent with DENIED when Decline is clicked', async () => {
    render(<CookieConsentBanner />);
    
    fireEvent.click(screen.getByTestId('decline-button'));
    
    await waitFor(() => {
      expect(analytics.updateConsent).toHaveBeenCalledWith(
        analytics.ConsentState.DENIED
      );
    });
  });

  test('does not render when consent has already been granted', () => {
    vi.mocked(analytics.getConsentState).mockReturnValue(analytics.ConsentState.GRANTED);
    
    render(<CookieConsentBanner />);
    
    expect(screen.queryByTestId('cookie-consent-banner')).not.toBeInTheDocument();
  });

  test('does not render when consent has already been denied', () => {
    vi.mocked(analytics.getConsentState).mockReturnValue(analytics.ConsentState.DENIED);
    
    render(<CookieConsentBanner />);
    
    expect(screen.queryByTestId('cookie-consent-banner')).not.toBeInTheDocument();
  });

  test('Accept button has correct text', () => {
    render(<CookieConsentBanner />);
    
    expect(screen.getByTestId('accept-button')).toHaveTextContent('Accept');
  });

  test('Decline button has correct text', () => {
    render(<CookieConsentBanner />);
    
    expect(screen.getByTestId('decline-button')).toHaveTextContent('Decline');
  });
});
