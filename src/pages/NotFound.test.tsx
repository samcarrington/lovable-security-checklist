import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

// Mock console.error to verify logging behavior
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

// Create wrapper with MemoryRouter (required for useLocation hook)
const createWrapper = (initialRoute = '/nonexistent') => {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialRoute]}>
        {children}
      </MemoryRouter>
    );
  };
};

describe('NotFound Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockConsoleError.mockClear();
  });

  describe('Rendering', () => {
    test('renders 404 heading', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('404');
    });

    test('renders "Oops! Page not found" message', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      expect(screen.getByText('Oops! Page not found')).toBeInTheDocument();
    });

    test('renders "Return to Home" link with correct href', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      const link = screen.getByRole('link', { name: /return to home/i });
      expect(link).toHaveAttribute('href', '/');
    });

    test('renders all UI elements together', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('Oops! Page not found')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /return to home/i })).toBeInTheDocument();
    });
  });

  describe('Console Logging in DEV mode', () => {
    test('logs 404 error with pathname in DEV mode', async () => {
      vi.stubEnv('DEV', true);

      render(<NotFound />, { wrapper: createWrapper('/admin/secret') });

      await waitFor(() => {
        expect(mockConsoleError).toHaveBeenCalledWith(
          '404 Error: User attempted to access non-existent route:',
          '/admin/secret'
        );
      });
    });

    test('logs various pathname formats correctly', async () => {
      vi.stubEnv('DEV', true);
      const testPaths = ['/unknown', '/api/invalid', '/very/deep/nested/path'];

      for (const path of testPaths) {
        mockConsoleError.mockClear();
        render(<NotFound />, { wrapper: createWrapper(path) });

        await waitFor(() => {
          expect(mockConsoleError).toHaveBeenCalledWith(
            '404 Error: User attempted to access non-existent route:',
            path
          );
        });
      }
    });
  });

  describe('Console Logging in Production mode', () => {
    test('does NOT log error in production mode', async () => {
      vi.stubEnv('DEV', false);

      render(<NotFound />, { wrapper: createWrapper('/nonexistent') });

      // Wait a bit to ensure useEffect runs
      await waitFor(() => {
        expect(mockConsoleError).not.toHaveBeenCalled();
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper heading hierarchy with h1', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    test('link is keyboard navigable', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      const link = screen.getByRole('link', { name: /return to home/i });
      expect(link).toHaveAttribute('href', '/');
      // Links are naturally keyboard accessible
      expect(link.tagName).toBe('A');
    });

    test('heading text content is meaningful', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBe('404');
    });
  });

  describe('Edge Cases', () => {
    test('handles root path not found', async () => {
      vi.stubEnv('DEV', true);

      render(<NotFound />, { wrapper: createWrapper('/') });

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404');
    });

    test('handles URL with query parameters', async () => {
      vi.stubEnv('DEV', true);

      render(<NotFound />, { wrapper: createWrapper('/invalid?search=test') });

      await waitFor(() => {
        // useLocation.pathname only includes the path, not query string
        expect(mockConsoleError).toHaveBeenCalledWith(
          '404 Error: User attempted to access non-existent route:',
          '/invalid'
        );
      });
    });

    test('renders correctly on multiple mounts', () => {
      vi.stubEnv('DEV', true);

      const { unmount } = render(<NotFound />, { wrapper: createWrapper('/notfound') });
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

      unmount();

      // Second mount should work correctly
      render(<NotFound />, { wrapper: createWrapper('/another-notfound') });
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('Link Functionality', () => {
    test('link has correct navigation target', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      const link = screen.getByRole('link', { name: /return to home/i });
      expect(link.getAttribute('href')).toBe('/');
    });

    test('link text is user-friendly', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      const link = screen.getByRole('link');
      expect(link.textContent).toBe('Return to Home');
    });

    test('link has visual styling classes', () => {
      render(<NotFound />, { wrapper: createWrapper() });

      const link = screen.getByRole('link');
      expect(link.className).toContain('text-primary');
      expect(link.className).toContain('underline');
    });
  });
});
