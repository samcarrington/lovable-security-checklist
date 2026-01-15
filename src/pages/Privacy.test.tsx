import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Privacy from './Privacy';

// Create wrapper with MemoryRouter (required for Link components)
const createWrapper = (initialRoute = '/privacy') => {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialRoute]}>
        {children}
      </MemoryRouter>
    );
  };
};

describe('Privacy Policy Page', () => {
  beforeEach(() => {
    // Clear any component state before each test
  });

  describe('Page Heading and Structure', () => {
    test('renders main Privacy Policy heading', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent(/privacy policy/i);
    });

    test('renders proper heading hierarchy', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      expect(h1.tagName).toBe('H1');
    });

    test('renders page with min-height for full viewport', () => {
      const { container } = render(<Privacy />, { wrapper: createWrapper() });

      const mainContent = container.firstChild;
      expect(mainContent).toHaveClass('min-h-screen');
    });
  });

  describe('Key Privacy Sections', () => {
    test('renders Data Collection section heading', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const heading = screen.getByRole('heading', { name: /data collection/i });
      expect(heading).toBeInTheDocument();
    });

    test('renders Cookies section heading', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const heading = screen.getByRole('heading', { name: /cookies/i });
      expect(heading).toBeInTheDocument();
    });

    test('renders Analytics section heading', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const heading = screen.getByRole('heading', { name: /analytics/i });
      expect(heading).toBeInTheDocument();
    });

    test('renders Contact Information section heading', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const heading = screen.getByRole('heading', { name: /contact/i });
      expect(heading).toBeInTheDocument();
    });

    test('all key sections are present together', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      expect(screen.getByRole('heading', { name: /data collection/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /cookies/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /analytics/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    test('renders links back to home', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const homeLinks = screen.getAllByRole('link', { name: /home|back|return/i });
      expect(homeLinks.length).toBeGreaterThanOrEqual(1);
      homeLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/');
      });
    });

    test('home links are keyboard navigable', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const homeLinks = screen.getAllByRole('link', { name: /home|back|return/i });
      homeLinks.forEach(link => {
        expect(link.tagName).toBe('A');
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Dark Mode Support', () => {
    test('main container has dark mode classes', () => {
      const { container } = render(<Privacy />, { wrapper: createWrapper() });

      const mainElement = container.querySelector('[class*="dark:"]');
      expect(mainElement).toBeInTheDocument();
    });

    test('heading color supports dark mode', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading.className).toContain('dark:');
    });
  });

  describe('Accessibility', () => {
    test('page has proper heading hierarchy starting with h1', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();

      // Get all section headings
      const allHeadings = screen.getAllByRole('heading');
      expect(allHeadings.length).toBeGreaterThan(1);
      expect(allHeadings[0].tagName).toBe('H1');
    });

    test('section headings are accessible via heading role', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(5); // Main + 4 sections minimum
    });
  });

  describe('Content Display', () => {
    test('renders sufficient text content for privacy policy', () => {
      const { container } = render(<Privacy />, { wrapper: createWrapper() });

      const textContent = container.textContent || '';
      expect(textContent.length).toBeGreaterThan(200); // Ensure substantive content
    });

    test('page renders without errors', () => {
      const { container } = render(<Privacy />, { wrapper: createWrapper() });

      expect(container).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    test('main container has padding for content spacing', () => {
      const { container } = render(<Privacy />, { wrapper: createWrapper() });

      const mainContent = container.firstChild as HTMLElement;
      expect(mainContent.className).toContain('px-');
    });

    test('content has vertical padding for spacing', () => {
      const { container } = render(<Privacy />, { wrapper: createWrapper() });

      const mainContent = container.firstChild as HTMLElement;
      expect(mainContent.className).toMatch(/py-|pt-|pb-/);
    });
  });

  describe('Edge Cases', () => {
    test('renders correctly when mounted', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    test('renders correctly when remounted', () => {
      const { unmount } = render(<Privacy />, { wrapper: createWrapper() });

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

      unmount();

      render(<Privacy />, { wrapper: createWrapper() });

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    test('home links work from privacy page route', () => {
      render(<Privacy />, { wrapper: createWrapper('/privacy') });

      const homeLinks = screen.getAllByRole('link', { name: /home|back|return/i });
      homeLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/');
      });
    });
  });
});
