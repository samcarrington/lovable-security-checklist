import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import OWASPLinks from './OWASPLinks';
import * as resourcesService from '@/services/resourcesService';
import type { ResourcePage } from '@/types/resources';

// Mock the resources service
vi.mock('@/services/resourcesService', () => ({
  fetchOWASPResources: vi.fn(),
  fetchAgenticEngineeringResources: vi.fn(),
  fetchResourcesData: vi.fn(),
}));

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

// Mock GradientBackground
vi.mock('@/components/GradientBackground', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock ResourceCategoryCard component
vi.mock('@/components/ResourceCategoryCard', () => ({
  default: ({ category }: { category: any }) => (
    <div data-testid={`category-${category.id}`} className="resource-category">
      <h3 data-testid={`category-title-${category.id}`}>{category.title}</h3>
      <ul>
        {category.links.map((link: any) => (
          <li key={link.id}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  ),
}));

const createWrapper = (initialRoute = '/owasp-links') => {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialRoute]}>
        {children}
      </MemoryRouter>
    );
  };
};

const mockOWASPResources: ResourcePage = {
  title: 'OWASP Security Resources',
  description:
    'Curated security resources from the OWASP Cheat Sheet Series and related documentation.',
  categories: [
    {
      id: 'auth',
      title: 'Authentication and Authorization',
      links: [
        {
          id: 'auth-1',
          title: 'Authentication Cheat Sheet',
          url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html',
          description: 'Comprehensive guide to secure authentication',
          checklistSection: 'authentication',
        },
        {
          id: 'auth-2',
          title: 'Authorization Cheat Sheet',
          url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html',
          description: 'Best practices for authorization',
        },
      ],
    },
    {
      id: 'input',
      title: 'Input Validation Security',
      links: [
        {
          id: 'input-1',
          title: 'Input Validation Cheat Sheet',
          url: 'https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html',
          description: 'Techniques for secure input validation',
          checklistSection: 'input-validation',
        },
      ],
    },
  ],
};

describe('OWASPLinks Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    test('shows loading state initially', () => {
      vi.mocked(resourcesService.fetchOWASPResources).mockImplementation(
        () => new Promise(() => {})
      );

      render(<OWASPLinks />, { wrapper: createWrapper() });

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    test('shows error state when fetch fails', async () => {
      vi.mocked(resourcesService.fetchOWASPResources).mockRejectedValue(
        new Error('Network error')
      );

      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
      });
    });
  });

  describe('Page Header and Structure', () => {
    beforeEach(() => {
      vi.mocked(resourcesService.fetchOWASPResources).mockResolvedValue(
        mockOWASPResources
      );
    });

    test('renders main page heading with title', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent(/OWASP Security Resources/i);
      });
    });

    test('renders page description text', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(
          screen.getByText(
            /curated security resources from the owasp cheat sheet series/i
          )
        ).toBeInTheDocument();
      });
    });

    test('has main content landmark', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
      });
    });
  });

  describe('Resource Categories Display', () => {
    beforeEach(() => {
      vi.mocked(resourcesService.fetchOWASPResources).mockResolvedValue(
        mockOWASPResources
      );
    });

    test('displays all resource categories', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('category-auth')).toBeInTheDocument();
        expect(screen.getByTestId('category-input')).toBeInTheDocument();
      });
    });

    test('displays category titles correctly', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('category-title-auth')).toHaveTextContent(
          /authentication and authorization/i
        );
        expect(screen.getByTestId('category-title-input')).toHaveTextContent(
          /input validation security/i
        );
      });
    });
  });

  describe('Back Navigation', () => {
    beforeEach(() => {
      vi.mocked(resourcesService.fetchOWASPResources).mockResolvedValue(
        mockOWASPResources
      );
    });

    test('displays back link to resources page', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        const backLink = screen.getByRole('link', { name: /back to resources/i });
        expect(backLink).toBeInTheDocument();
      });
    });

    test('back link has correct href', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        const backLink = screen.getByRole('link', { name: /back to resources/i });
        expect(backLink).toHaveAttribute('href', '/resources');
      });
    });
  });

  describe('Navigation and Layout', () => {
    beforeEach(() => {
      vi.mocked(resourcesService.fetchOWASPResources).mockResolvedValue(
        mockOWASPResources
      );
    });

    test('renders navigation component', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('navigation')).toBeInTheDocument();
      });
    });

    test('renders footer component', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('footer')).toBeInTheDocument();
      });
    });

    test('renders theme toggle', async () => {
      render(<OWASPLinks />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      });
    });
  });
});
