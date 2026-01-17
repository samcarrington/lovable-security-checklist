import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ResourceCategoryCard from './ResourceCategoryCard';
import type { ResourceCategory } from '@/types/resources';
import * as analytics from '@/lib/analytics';

// Mock the analytics module
vi.mock('@/lib/analytics', () => ({
  trackExternalLinkClick: vi.fn(),
  updateConsent: vi.fn(),
  ConsentState: {
    GRANTED: 'granted',
    DENIED: 'denied',
  },
  getConsentState: vi.fn(),
  pushEvent: vi.fn(),
  isConsentGranted: vi.fn(),
  trackProgressMilestone: vi.fn(),
  restoreConsent: vi.fn(),
  trackPageView: vi.fn(),
}));

describe('ResourceCategoryCard', () => {
  const mockCategory: ResourceCategory = {
    id: 'category-1',
    title: 'Security Tools',
    links: [
      {
        id: 'link-1',
        title: 'OWASP Top 10',
        url: 'https://owasp.org/www-project-top-ten/',
        description: 'The most critical security risks to web applications',
        checklistSection: 'authentication',
      },
      {
        id: 'link-2',
        title: 'CWE Top 25',
        url: 'https://cwe.mitre.org/top25/',
        description: 'Common Weakness Enumeration vulnerabilities',
        checklistSection: 'data-protection',
      },
      {
        id: 'link-3',
        title: 'CVSS Calculator',
        url: 'https://www.first.org/cvss/calculator/3.1',
        description: 'Calculate vulnerability severity scores',
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Card Rendering', () => {
    it('should render category title', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      expect(screen.getByText(mockCategory.title)).toBeInTheDocument();
    });

    it('should render link count badge', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      expect(screen.getByText(mockCategory.links.length.toString())).toBeInTheDocument();
    });

    it('should render all category links', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      mockCategory.links.forEach((link) => {
        expect(screen.getByText(link.title)).toBeInTheDocument();
      });
    });

    it('should render link descriptions', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      mockCategory.links.forEach((link) => {
        expect(screen.getByText(link.description)).toBeInTheDocument();
      });
    });
  });

  describe('Expand/Collapse Behavior', () => {
    it('should render with expanded state by default', () => {
      render(<ResourceCategoryCard category={mockCategory} defaultExpanded={true} />);

      mockCategory.links.forEach((link) => {
        const linkElement = screen.getByText(link.title);
        expect(linkElement).toBeVisible();
      });
    });

    it('should toggle expanded state when header button is clicked', async () => {
      const user = userEvent.setup();
      render(<ResourceCategoryCard category={mockCategory} defaultExpanded={true} />);

      const headerButton = screen.getByRole('button');

      expect(headerButton).toHaveAttribute('aria-expanded', 'true');

      await user.click(headerButton);

      expect(headerButton).toHaveAttribute('aria-expanded', 'false');

      await user.click(headerButton);

      expect(headerButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have aria-expanded attribute on header button', () => {
      render(<ResourceCategoryCard category={mockCategory} defaultExpanded={true} />);

      const headerButton = screen.getByRole('button');
      expect(headerButton).toHaveAttribute('aria-expanded');
    });

    it('should have aria-controls attribute pointing to links container', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      const headerButton = screen.getByRole('button');
      const controlsId = headerButton.getAttribute('aria-controls');

      expect(controlsId).toBe(`category-${mockCategory.id}`);

      const linksContainer = document.getElementById(controlsId!);
      expect(linksContainer).toBeInTheDocument();
    });
  });

  describe('External Links', () => {
    it('should have target="_blank" on all links', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
      });
    });

    it('should have rel="noopener noreferrer" on all links', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('should have correct href attributes', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      mockCategory.links.forEach((mockLink) => {
        const link = screen.getByRole('link', { name: new RegExp(mockLink.title) });
        expect(link).toHaveAttribute('href', mockLink.url);
      });
    });
  });

  describe('Analytics Tracking', () => {
    it('should call trackExternalLinkClick when link is clicked', async () => {
      const user = userEvent.setup();
      render(<ResourceCategoryCard category={mockCategory} />);

      const firstLink = mockCategory.links[0];
      const linkElement = screen.getByRole('link', { name: new RegExp(firstLink.title) });

      await user.click(linkElement);

      expect(analytics.trackExternalLinkClick).toHaveBeenCalledWith(
        firstLink.url,
        firstLink.title,
        'resources'
      );
    });

    it('should track all links individually', async () => {
      const user = userEvent.setup();
      render(<ResourceCategoryCard category={mockCategory} />);

      for (const link of mockCategory.links) {
        const linkElement = screen.getByRole('link', { name: new RegExp(link.title) });
        await user.click(linkElement);
      }

      expect(analytics.trackExternalLinkClick).toHaveBeenCalledTimes(
        mockCategory.links.length
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      const title = screen.getByText(mockCategory.title);
      expect(title.tagName).toBe('H3');
    });

    it('should have aria-hidden on decorative icons', () => {
      const { container } = render(<ResourceCategoryCard category={mockCategory} />);

      const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenElements.length).toBeGreaterThan(0);
    });

    it('should provide semantic list structure for links', () => {
      const { container } = render(<ResourceCategoryCard category={mockCategory} />);

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();

      const listItems = container.querySelectorAll('li');
      expect(listItems.length).toBe(mockCategory.links.length);
    });
  });

  describe('Visual Hierarchy & Styling', () => {
    it('should display category title prominently', () => {
      render(<ResourceCategoryCard category={mockCategory} />);

      const title = screen.getByText(mockCategory.title);
      expect(title).toHaveClass('font-semibold');
    });
  });
});
