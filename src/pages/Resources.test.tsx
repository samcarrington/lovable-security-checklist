import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Resources from './Resources';
import * as examplesService from '@/services/examplesService';
import type { ExamplesManifest } from '@/types/examples';

// Mock the examples service
vi.mock('@/services/examplesService', () => ({
  fetchExamplesManifest: vi.fn(),
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

// Mock GradientBackground to simplify testing
vi.mock('@/components/GradientBackground', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock ExampleCard component
vi.mock('@/components/ExampleCard', () => ({
  default: ({ example }: { example: any }) => (
    <div data-testid={`example-card-${example.id}`} className="example-card">
      {example.title}
    </div>
  ),
}));

const createWrapper = (initialRoute = '/resources') => {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialRoute]}>
        {children}
      </MemoryRouter>
    );
  };
};

const mockExamplesManifest: ExamplesManifest = {
  agents: {
    title: 'Security Agents',
    description: 'Pre-built AI agents for security tasks',
    items: [
      {
        id: 'agent-1',
        title: 'Security Reviewer',
        description: 'Reviews code for security vulnerabilities',
        filename: 'security-reviewer.md',
        path: '/examples/agents/security-reviewer.md',
      },
      {
        id: 'agent-2',
        title: 'Threat Model Generator',
        description: 'Generates threat models for applications',
        filename: 'threat-model-generator.md',
        path: '/examples/agents/threat-model-generator.md',
      },
    ],
  },
  prompts: {
    title: 'Security Prompts',
    description: 'Pre-written prompts for security analysis',
    items: [
      {
        id: 'prompt-1',
        title: 'Input Validation Prompt',
        description: 'Analyzes input validation in code',
        filename: 'input-validation.md',
        path: '/examples/prompts/input-validation.md',
      },
      {
        id: 'prompt-2',
        title: 'Authentication Prompt',
        description: 'Reviews authentication implementations',
        filename: 'authentication.md',
        path: '/examples/prompts/authentication.md',
      },
    ],
  },
};

describe('Resources Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    test('shows loading state initially', () => {
      vi.mocked(examplesService.fetchExamplesManifest).mockImplementation(
        () => new Promise(() => {})
      );

      render(<Resources />, { wrapper: createWrapper() });

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    test('shows error state when manifest fetch fails', async () => {
      vi.mocked(examplesService.fetchExamplesManifest).mockRejectedValue(
        new Error('Network error')
      );

      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
      });
    });
  });

  describe('Page Header and Structure', () => {
    beforeEach(() => {
      vi.mocked(examplesService.fetchExamplesManifest).mockResolvedValue(
        mockExamplesManifest
      );
    });

    test('renders main page heading with correct text', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent(/security resources/i);
      });
    });

    test('has main content landmark', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        const main = screen.getByRole('main');
        expect(main).toBeInTheDocument();
      });
    });
  });

  describe('Agent Examples Section', () => {
    beforeEach(() => {
      vi.mocked(examplesService.fetchExamplesManifest).mockResolvedValue(
        mockExamplesManifest
      );
    });

    test('displays agent examples section heading', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        const heading = screen.getByRole('heading', {
          name: /security agents/i,
        });
        expect(heading).toBeInTheDocument();
      });
    });

    test('renders all agent example cards', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('example-card-agent-1')).toBeInTheDocument();
        expect(screen.getByTestId('example-card-agent-2')).toBeInTheDocument();
      });
    });
  });

  describe('Prompt Examples Section', () => {
    beforeEach(() => {
      vi.mocked(examplesService.fetchExamplesManifest).mockResolvedValue(
        mockExamplesManifest
      );
    });

    test('displays prompt examples section heading', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        const heading = screen.getByRole('heading', {
          name: /security prompts/i,
        });
        expect(heading).toBeInTheDocument();
      });
    });

    test('renders all prompt example cards', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('example-card-prompt-1')).toBeInTheDocument();
        expect(screen.getByTestId('example-card-prompt-2')).toBeInTheDocument();
      });
    });
  });

  describe('Reference Links Section', () => {
    beforeEach(() => {
      vi.mocked(examplesService.fetchExamplesManifest).mockResolvedValue(
        mockExamplesManifest
      );
    });

    test('displays OWASP links card', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(
          screen.getByText(/OWASP Security Resources/i)
        ).toBeInTheDocument();
      });
    });

    test('OWASP link navigates to /owasp-links', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        const link = screen.getByRole('link', {
          name: /OWASP Security Resources/i,
        });
        expect(link).toHaveAttribute('href', '/owasp-links');
      });
    });

    test('displays Agentic Engineering card', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByText(/agentic engineering/i)).toBeInTheDocument();
      });
    });

    test('Agentic Engineering link navigates to /agentic-engineering', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        const link = screen.getByRole('link', {
          name: /agentic engineering/i,
        });
        expect(link).toHaveAttribute('href', '/agentic-engineering');
      });
    });
  });

  describe('Navigation and Layout', () => {
    beforeEach(() => {
      vi.mocked(examplesService.fetchExamplesManifest).mockResolvedValue(
        mockExamplesManifest
      );
    });

    test('renders navigation component', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('navigation')).toBeInTheDocument();
      });
    });

    test('renders footer component', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('footer')).toBeInTheDocument();
      });
    });

    test('renders theme toggle', async () => {
      render(<Resources />, { wrapper: createWrapper() });

      await waitFor(() => {
        expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
      });
    });
  });
});
