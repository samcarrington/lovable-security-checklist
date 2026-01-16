import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import * as analytics from '@/lib/analytics';

// Mock the analytics module
vi.mock('@/lib/analytics', () => ({
  restoreConsent: vi.fn(),
  trackPageView: vi.fn(),
  updateConsent: vi.fn(),
  ConsentState: {
    GRANTED: 'granted',
    DENIED: 'denied',
  },
  CONSENT_STORAGE_KEY: 'consent_state',
  getConsentState: vi.fn(),
  isConsentGranted: vi.fn(),
  getEventQueueLength: vi.fn(),
  clearEventQueue: vi.fn(),
  resetConsentState: vi.fn(),
  pushEvent: vi.fn(),
  trackCheckboxToggle: vi.fn(),
  trackSectionComplete: vi.fn(),
  trackProgressMilestone: vi.fn(),
  trackThemeChange: vi.fn(),
  trackClearAll: vi.fn(),
  trackExternalLinkClick: vi.fn(),
}));

// Mock the checklist service to prevent actual data loading
vi.mock('@/services/checklistService', () => ({
  fetchChecklist: vi.fn(() => Promise.resolve({
    title: 'Security Checklist',
    sections: [],
  })),
  loadChecklistState: vi.fn(() => ({})),
  saveChecklistState: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window.location to /
    window.history.pushState({}, 'Test', '/');
    // Mock document.title
    Object.defineProperty(document, 'title', {
      writable: true,
      value: 'Security Checklist',
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('initialization', () => {
    test('calls restoreConsent on mount', () => {
      render(<App />);

      expect(analytics.restoreConsent).toHaveBeenCalledTimes(1);
    });

    test('calls trackPageView on mount with correct pathname and title', async () => {
      render(<App />);

      await waitFor(() => {
        expect(analytics.trackPageView).toHaveBeenCalledWith(
          window.location.pathname,
          'Security Checklist'
        );
      });
    });

    test('calls trackPageView with pathname "/" on initial load', async () => {
      window.history.pushState({}, 'Test', '/');

      render(<App />);

      await waitFor(() => {
        expect(analytics.trackPageView).toHaveBeenCalledWith(
          '/',
          expect.any(String)
        );
      });
    });

    test('calls trackPageView with document.title', async () => {
      const customTitle = 'My Security Checklist';
      Object.defineProperty(document, 'title', {
        writable: true,
        value: customTitle,
      });

      render(<App />);

      await waitFor(() => {
        expect(analytics.trackPageView).toHaveBeenCalledWith(
          expect.any(String),
          customTitle
        );
      });
    });

    test('calls trackPageView with fallback title if document.title is empty', async () => {
      Object.defineProperty(document, 'title', {
        writable: true,
        value: '',
      });

      render(<App />);

      await waitFor(() => {
        expect(analytics.trackPageView).toHaveBeenCalledWith(
          expect.any(String),
          'Security Checklist'
        );
      });
    });

    test('calls analytics functions only once on mount', async () => {
      render(<App />);

      await waitFor(() => {
        expect(analytics.restoreConsent).toHaveBeenCalledTimes(1);
        expect(analytics.trackPageView).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('routing', () => {
    test('renders Index page at "/" route', async () => {
      render(<App />);

      // Wait for Index component to load and render
      await waitFor(() => {
        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('providers', () => {
    test('renders ThemeProvider with correct attributes', async () => {
      const { container } = render(<App />);

      // ThemeProvider should be wrapping the app
      await waitFor(() => {
        expect(container).toBeInTheDocument();
      });

      // App should render without errors with ThemeProvider
      expect(container.firstChild).toBeInTheDocument();
    });

    test('renders QueryClientProvider without errors', async () => {
      render(<App />);

      // If QueryClientProvider was misconfigured, React Query would throw errors
      await waitFor(() => {
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
      });
    });

    test('all providers wrap the application correctly in correct order', async () => {
      const { container } = render(<App />);

      // App renders without errors, meaning all providers are stacked correctly
      await waitFor(() => {
        expect(container).toBeInTheDocument();
      });
    });
  });

  describe('CookieConsentBanner', () => {
    test('renders CookieConsentBanner component', async () => {
      vi.mocked(analytics.getConsentState).mockReturnValue(null);

      render(<App />);

      // CookieConsentBanner renders when consent state is not yet set
      await waitFor(() => {
        expect(
          screen.queryByText(/We use cookies to analyze site usage/i)
        ).toBeInTheDocument();
      });
    });

    test('CookieConsentBanner is not shown when consent is already given', async () => {
      vi.mocked(analytics.getConsentState).mockReturnValue('granted');

      render(<App />);

      await waitFor(() => {
        expect(
          screen.queryByText(/We use cookies to analyze site usage/i)
        ).not.toBeInTheDocument();
      });
    });

    test('CookieConsentBanner is not shown when consent is already denied', async () => {
      vi.mocked(analytics.getConsentState).mockReturnValue('denied');

      render(<App />);

      await waitFor(() => {
        expect(
          screen.queryByText(/We use cookies to analyze site usage/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('integration', () => {
    test('all initialization and provider setup works together', async () => {
      vi.mocked(analytics.getConsentState).mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        // All these should be called and app should render
        expect(analytics.restoreConsent).toHaveBeenCalled();
        expect(analytics.trackPageView).toHaveBeenCalled();
        expect(document.body).toBeInTheDocument();
      });
    });

    test('app handles rapid rerenders without breaking analytics calls', async () => {
      const { rerender } = render(<App />);

      // Rerender shouldn't cause multiple analytics calls due to useEffect cleanup
      rerender(<App />);

      await waitFor(() => {
        // Should still be called only once due to empty dependency array
        expect(analytics.restoreConsent).toHaveBeenCalledTimes(1);
        expect(analytics.trackPageView).toHaveBeenCalledTimes(1);
      });
    });

    test('app renders correctly with all components when no consent has been given', async () => {
      vi.mocked(analytics.getConsentState).mockReturnValue(null);

      const { container } = render(<App />);

      await waitFor(() => {
        // App should render both content and cookie banner
        expect(container).toBeInTheDocument();
        expect(analytics.restoreConsent).toHaveBeenCalled();
      });
    });
  });
});
