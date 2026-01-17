import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ExampleCard from './ExampleCard';
import type { ExampleItem } from '@/types/examples';
import * as examplesService from '@/services/examplesService';

// Mock the examplesService
vi.mock('@/services/examplesService', () => ({
  fetchExampleContent: vi.fn(),
  fetchExamplesManifest: vi.fn(),
  getDownloadUrl: vi.fn(),
}));

// Mock MarkdownViewer to avoid complex modal testing
vi.mock('./MarkdownViewer', () => ({
  default: ({
    content,
    filename,
    isOpen,
    onClose,
  }: {
    content: string;
    filename: string;
    isOpen: boolean;
    onClose: () => void;
  }) =>
    isOpen && (
      <div
        data-testid="markdown-viewer-modal"
        data-filename={filename}
        data-content={content}
      >
        <button onClick={onClose} data-testid="modal-close">
          Close Modal
        </button>
      </div>
    ),
}));

describe('ExampleCard', () => {
  const mockExample: ExampleItem = {
    id: 'example-1',
    title: 'Security Best Practices',
    description: 'A comprehensive guide to implementing security best practices',
    filename: 'security-best-practices.md',
    path: '/examples/security-best-practices.md',
  };

  const mockMarkdownContent = '# Security Best Practices\n\nContent here...';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Card Rendering', () => {
    it('should render the card with title and description', () => {
      render(<ExampleCard example={mockExample} />);

      expect(screen.getByText(mockExample.title)).toBeInTheDocument();
      expect(screen.getByText(mockExample.description)).toBeInTheDocument();
    });

    it('should render the title with semantic heading', () => {
      render(<ExampleCard example={mockExample} />);

      const title = screen.getByText(mockExample.title);
      expect(title.tagName).toBe('H3');
    });

    it('should hide title when hideTitle prop is true', () => {
      render(<ExampleCard example={mockExample} hideTitle />);

      // Title should not be rendered as h3
      expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
      // But description should still be visible
      expect(screen.getByText(mockExample.description)).toBeInTheDocument();
    });

    it('should still show View and Download buttons when hideTitle is true', () => {
      render(<ExampleCard example={mockExample} hideTitle />);

      expect(screen.getByRole('button', { name: /View/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Download/i })).toBeInTheDocument();
    });
  });

  describe('View Button', () => {
    it('should render View button with correct aria-label', () => {
      render(<ExampleCard example={mockExample} />);

      const viewButton = screen.getByRole('button', {
        name: new RegExp(`View.*${mockExample.title}`, 'i'),
      });
      expect(viewButton).toBeInTheDocument();
    });

    it('should fetch content and open modal when View button is clicked', async () => {
      const user = userEvent.setup();
      vi.mocked(examplesService.fetchExampleContent).mockResolvedValue(
        mockMarkdownContent
      );

      render(<ExampleCard example={mockExample} />);

      const viewButton = screen.getByRole('button', {
        name: new RegExp(`View.*${mockExample.title}`, 'i'),
      });

      await user.click(viewButton);

      await waitFor(() => {
        expect(examplesService.fetchExampleContent).toHaveBeenCalledWith(
          mockExample.path
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('markdown-viewer-modal')).toBeInTheDocument();
      });
    });

    it('should show "Loading..." text while fetching', async () => {
      const user = userEvent.setup();
      vi.mocked(examplesService.fetchExampleContent).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockMarkdownContent), 100)
          )
      );

      render(<ExampleCard example={mockExample} />);

      const viewButton = screen.getByRole('button', {
        name: new RegExp(`View.*${mockExample.title}`, 'i'),
      });

      await user.click(viewButton);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should disable View button while loading', async () => {
      const user = userEvent.setup();
      vi.mocked(examplesService.fetchExampleContent).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve(mockMarkdownContent), 100)
          )
      );

      render(<ExampleCard example={mockExample} />);

      const viewButton = screen.getByRole('button', {
        name: new RegExp(`View.*${mockExample.title}`, 'i'),
      });

      await user.click(viewButton);

      expect(viewButton).toBeDisabled();
    });
  });

  describe('Error State', () => {
    it('should display error message when fetch fails', async () => {
      const user = userEvent.setup();
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      vi.mocked(examplesService.fetchExampleContent).mockRejectedValue(
        new Error('Failed to fetch')
      );

      render(<ExampleCard example={mockExample} />);

      const viewButton = screen.getByRole('button', {
        name: new RegExp(`View.*${mockExample.title}`, 'i'),
      });

      await user.click(viewButton);

      await waitFor(() => {
        expect(screen.getByText('Failed to load content')).toBeInTheDocument();
      });

      consoleErrorSpy.mockRestore();
    });

    it('should display error with role="alert" for accessibility', async () => {
      const user = userEvent.setup();
      vi.mocked(examplesService.fetchExampleContent).mockRejectedValue(
        new Error('Failed to fetch')
      );

      render(<ExampleCard example={mockExample} />);

      const viewButton = screen.getByRole('button', {
        name: new RegExp(`View.*${mockExample.title}`, 'i'),
      });

      await user.click(viewButton);

      await waitFor(() => {
        const errorMessage = screen.getByText('Failed to load content');
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });
  });

  describe('Download Button', () => {
    it('should render Download button', () => {
      render(<ExampleCard example={mockExample} />);

      const downloadButton = screen.getByRole('link', {
        name: new RegExp(`Download.*${mockExample.title}`, 'i'),
      });
      expect(downloadButton).toBeInTheDocument();
    });

    it('should have correct href attribute', () => {
      render(<ExampleCard example={mockExample} />);

      const downloadLink = screen.getByRole('link', {
        name: new RegExp(`Download.*${mockExample.title}`, 'i'),
      });

      expect(downloadLink).toHaveAttribute('href', mockExample.path);
    });

    it('should have download attribute with filename', () => {
      render(<ExampleCard example={mockExample} />);

      const downloadLink = screen.getByRole('link', {
        name: new RegExp(`Download.*${mockExample.title}`, 'i'),
      });

      expect(downloadLink).toHaveAttribute('download', mockExample.filename);
    });
  });

  describe('Modal Integration', () => {
    it('should pass correct content to MarkdownViewer', async () => {
      const user = userEvent.setup();
      vi.mocked(examplesService.fetchExampleContent).mockResolvedValue(
        mockMarkdownContent
      );

      render(<ExampleCard example={mockExample} />);

      const viewButton = screen.getByRole('button', {
        name: new RegExp(`View.*${mockExample.title}`, 'i'),
      });

      await user.click(viewButton);

      await waitFor(() => {
        const modal = screen.getByTestId('markdown-viewer-modal');
        expect(modal).toHaveAttribute('data-content', mockMarkdownContent);
        expect(modal).toHaveAttribute('data-filename', mockExample.filename);
      });
    });

    it('should close modal when close button is clicked', async () => {
      const user = userEvent.setup();
      vi.mocked(examplesService.fetchExampleContent).mockResolvedValue(
        mockMarkdownContent
      );

      render(<ExampleCard example={mockExample} />);

      const viewButton = screen.getByRole('button', {
        name: new RegExp(`View.*${mockExample.title}`, 'i'),
      });

      await user.click(viewButton);

      await waitFor(() => {
        expect(screen.getByTestId('markdown-viewer-modal')).toBeInTheDocument();
      });

      const closeButton = screen.getByTestId('modal-close');
      await user.click(closeButton);

      expect(screen.queryByTestId('markdown-viewer-modal')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have keyboard accessible buttons', () => {
      render(<ExampleCard example={mockExample} />);

      const viewButton = screen.getByRole('button', {
        name: new RegExp(`View.*${mockExample.title}`, 'i'),
      });

      expect(viewButton).toBeInTheDocument();
    });

    it('should have aria-hidden on decorative icons', () => {
      const { container } = render(<ExampleCard example={mockExample} />);

      const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenIcons.length).toBeGreaterThan(0);
    });
  });
});
