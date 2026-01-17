import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Privacy from './Privacy';

// Mock Navigation and Footer components
vi.mock('@/components/Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>,
}));

vi.mock('@/components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

// Mock ThemeToggle component
vi.mock('@/components/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

// Mock GradientBackground to simplify testing
vi.mock('@/components/GradientBackground', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="gradient-background" className="min-h-screen">
      {children}
    </div>
  ),
}));

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

    test('renders page with gradient background', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      expect(screen.getByTestId('gradient-background')).toBeInTheDocument();
    });

    test('has main content landmark', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
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

  describe('Navigation and Layout', () => {
    test('renders navigation component', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      expect(screen.getByTestId('navigation')).toBeInTheDocument();
    });

    test('renders footer component', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders theme toggle', () => {
      render(<Privacy />, { wrapper: createWrapper() });

      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });

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
