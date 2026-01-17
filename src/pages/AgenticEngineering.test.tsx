import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AgenticEngineering from './AgenticEngineering';
import * as resourcesService from '@/services/resourcesService';
import type { ResourcePage } from '@/types/resources';

// Mock the resources service
vi.mock('@/services/resourcesService', () => ({
  fetchAgenticEngineeringResources: vi.fn(),
  fetchOWASPResources: vi.fn(),
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

const createWrapper = (initialRoute = '/agentic-engineering') => {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialRoute]}>
        {children}
      </MemoryRouter>
    );
  };
};

const mockAgenticEngineeringResources: ResourcePage = {
  title: 'Agentic Engineering',
  description:
    'Resources for transitioning from vibe coding to systematic AI workflows and best practices.',
  categories: [
    {
      id: 'tools',
      title: 'AI Coding Tools Documentation',
      links: [
        {
          id: 'tool-1',
          title: 'GitHub Copilot Documentation',
          url: 'https://docs.github.com/en/copilot',
          description: 'Documentation for GitHub Copilot',
        },
        {
          id: 'tool-2',
          title: 'Claude API Documentation',
          url: 'https://docs.anthropic.com/',
          description: 'Official Claude API docs',
        },
      ],
    },
    {
      id: 'practices',
      title: 'Engineering Best Practices',
      links: [
        {
          id: 'practice-1',
          title: 'Prompt Engineering Guide',
          url: 'https://platform.openai.com/docs/guides/prompt-engineering',
          description: 'OpenAI prompt engineering best practices',
        },
      ],
    },
  ],
};

describe('AgenticEngineering Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    test('shows loading state initially', () => {
      vi.mocked(resourcesService.fetchAgenticEngineeringResources).mockImplementation(
        () => new Promise(() => {})
      );

      render(<AgenticEngineering />, { wrapper: createWrapper() });

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    test('shows error state when fetch fails', async () => {
      vi.mocked(resourcesService.fetchAgenticEngineeringResources).mockRejectedValue(
        new Error('Network error')
      );

      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
      });
    });
  });

  describe('Page Header and Structure', () => {
    beforeEach(() => {
      vi.mocked(resourcesService.fetchAgenticEngineeringResources).mockResolvedValue(
        mockAgenticEngineeringResources
      );
    });

    test('renders main page heading with title', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent(/agentic engineering/i);
      });
    });

    test('renders page description text', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(
          screen.getByText(
            /resources for transitioning from vibe coding to systematic ai workflows/i
          )
        ).toBeInTheDocument();
      });
    });

    test('has main content landmark', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
      });
    });
  });

  describe('Agentic Engineering Introduction Section', () => {
    beforeEach(() => {
      vi.mocked(resourcesService.fetchAgenticEngineeringResources).mockResolvedValue(
        mockAgenticEngineeringResources
      );
    });

    test('displays "What is Agentic Engineering?" heading', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        const heading = screen.getByRole('heading', {
          name: /what is agentic engineering/i,
        });
        expect(heading).toBeInTheDocument();
      });
    });

    test('displays key principles section', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByText(/key principles include/i)).toBeInTheDocument();
      });
    });
  });

  describe('Resource Categories Display', () => {
    beforeEach(() => {
      vi.mocked(resourcesService.fetchAgenticEngineeringResources).mockResolvedValue(
        mockAgenticEngineeringResources
      );
    });

    test('displays all resource categories', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('category-tools')).toBeInTheDocument();
        expect(screen.getByTestId('category-practices')).toBeInTheDocument();
      });
    });

    test('displays category titles correctly', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('category-title-tools')).toHaveTextContent(
          /ai coding tools documentation/i
        );
        expect(screen.getByTestId('category-title-practices')).toHaveTextContent(
          /engineering best practices/i
        );
      });
    });
  });

  describe('Back Navigation', () => {
    beforeEach(() => {
      vi.mocked(resourcesService.fetchAgenticEngineeringResources).mockResolvedValue(
        mockAgenticEngineeringResources
      );
    });

    test('displays back link to resources page', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        const backLink = screen.getByRole('link', { name: /back to resources/i });
        expect(backLink).toBeInTheDocument();
      });
    });

    test('back link has correct href', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        const backLink = screen.getByRole('link', { name: /back to resources/i });
        expect(backLink).toHaveAttribute('href', '/resources');
      });
    });
  });

  describe('Navigation and Layout', () => {
    beforeEach(() => {
      vi.mocked(resourcesService.fetchAgenticEngineeringResources).mockResolvedValue(
        mockAgenticEngineeringResources
      );
    });

    test('renders navigation component', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('navigation')).toBeInTheDocument();
      });
    });

    test('renders footer component', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('footer')).toBeInTheDocument();
      });
    });

    test('renders theme toggle', async () => {
      render(<AgenticEngineering />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      });
    });
  });
});
