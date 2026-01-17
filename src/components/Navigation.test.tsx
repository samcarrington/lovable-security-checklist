import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the Navigation component import - will fail until implemented
vi.mock('./Navigation', async () => {
  const actual = await vi.importActual('./Navigation');
  return actual;
});

// We'll import this after the mock
import Navigation from './Navigation';

// Custom render function to include routing context
const renderWithRouter = (component: React.ReactElement, initialPath = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      {component}
    </MemoryRouter>
  );
};

// Helper to mock window size
const setMockWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  window.dispatchEvent(new Event('resize'));
};

describe('Navigation', () => {
  beforeEach(() => {
    setMockWindowWidth(1024); // Default to desktop
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Desktop Navigation (>= 768px)', () => {
    beforeEach(() => {
      setMockWindowWidth(1024);
    });

    it('renders navigation with role="navigation"', () => {
      renderWithRouter(<Navigation />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders all navigation links on desktop', () => {
      renderWithRouter(<Navigation />);
      
      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /resources/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /owasp/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /agentic/i })).toBeInTheDocument();
    });

    it('navigation link to Home has correct href', () => {
      renderWithRouter(<Navigation />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('navigation link to Resources has correct href', () => {
      renderWithRouter(<Navigation />);
      const resourcesLink = screen.getByRole('link', { name: /resources/i });
      expect(resourcesLink).toHaveAttribute('href', '/resources');
    });

    it('navigation link to OWASP Links has correct href', () => {
      renderWithRouter(<Navigation />);
      const owaspLink = screen.getByRole('link', { name: /owasp/i });
      expect(owaspLink).toHaveAttribute('href', '/owasp-links');
    });

    it('navigation link to Agentic Engineering has correct href', () => {
      renderWithRouter(<Navigation />);
      const agentLink = screen.getByRole('link', { name: /agentic/i });
      expect(agentLink).toHaveAttribute('href', '/agentic-engineering');
    });

    it('shows active state for current route', () => {
      renderWithRouter(<Navigation />, '/resources');
      const resourcesLink = screen.getByRole('link', { name: /resources/i });
      expect(resourcesLink).toHaveAttribute('aria-current', 'page');
    });

    it('inactive links do not have aria-current', () => {
      renderWithRouter(<Navigation />, '/');
      const resourcesLink = screen.getByRole('link', { name: /resources/i });
      expect(resourcesLink).not.toHaveAttribute('aria-current');
    });

    it('has aria-label on navigation', () => {
      renderWithRouter(<Navigation />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label');
    });
  });

  describe('Mobile Navigation (< 768px)', () => {
    beforeEach(() => {
      setMockWindowWidth(375);
    });

    it('renders hamburger menu button on mobile', () => {
      renderWithRouter(<Navigation />);
      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      expect(hamburgerButton).toBeInTheDocument();
    });

    it('hamburger button has aria-expanded attribute', () => {
      renderWithRouter(<Navigation />);
      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('opens mobile menu when hamburger button is clicked', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);

      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      await user.click(hamburgerButton);

      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes mobile menu when hamburger button is clicked again', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);

      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      
      await user.click(hamburgerButton);
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

      await user.click(hamburgerButton);
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('displays all navigation links when menu is open', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);

      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      await user.click(hamburgerButton);

      expect(screen.getByRole('link', { name: /home/i })).toBeVisible();
      expect(screen.getByRole('link', { name: /resources/i })).toBeVisible();
    });

    it('closes menu when pressing Escape key', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);

      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      await user.click(hamburgerButton);
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard('{Escape}');
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes menu when clicking a navigation link', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);

      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      await user.click(hamburgerButton);

      const resourcesLink = screen.getByRole('link', { name: /resources/i });
      await user.click(resourcesLink);

      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Accessibility', () => {
    it('renders skip to main content link', () => {
      renderWithRouter(<Navigation />);
      const skipLink = screen.getByText(/skip to main content/i);
      expect(skipLink).toBeInTheDocument();
    });

    it('skip link has correct href', () => {
      renderWithRouter(<Navigation />);
      const skipLink = screen.getByText(/skip to main content/i);
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('navigation links are keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithRouter(<Navigation />);

      await user.tab(); // Skip link
      await user.tab(); // First nav link
      
      expect(screen.getByRole('link', { name: /home/i })).toHaveFocus();
    });
  });

  describe('Styling', () => {
    it('uses proper classes for navigation', () => {
      renderWithRouter(<Navigation />);
      const nav = screen.getByRole('navigation');
      expect(nav.className).toBeTruthy();
    });
  });
});
