import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MarkdownViewer from './MarkdownViewer';

// Mock next-themes useTheme hook
vi.mock('next-themes', async () => {
  const actual = await vi.importActual('next-themes');
  return {
    ...actual,
    useTheme: vi.fn(() => ({
      theme: 'light',
      setTheme: vi.fn(),
      themes: ['light', 'dark'],
      systemTheme: 'light',
      resolvedTheme: 'light',
    })),
  };
});

// Mock react-syntax-highlighter to simplify testing
vi.mock('react-syntax-highlighter', () => ({
  Prism: ({
    children,
    language,
    showLineNumbers,
  }: {
    children: string;
    language: string;
    showLineNumbers: boolean;
  }) => (
    <pre
      data-testid="syntax-highlighter"
      data-language={language}
      data-show-line-numbers={showLineNumbers}
    >
      {children}
    </pre>
  ),
}));

vi.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  oneDark: {},
  oneLight: {},
}));

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe('MarkdownViewer', () => {
  const mockContent = '# Test Markdown\n\nThis is a test.';
  const mockFilename = 'test.md';
  const mockDownloadUrl = '/examples/test.md';
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  describe('Modal Visibility', () => {
    it('should not render when isOpen is false', () => {
      const { container } = render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={false}
          onClose={mockOnClose}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it('should render when isOpen is true', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should display modal with backdrop', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });
  });

  describe('Content Display', () => {
    it('should display the filename as the title', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByText(mockFilename)).toBeInTheDocument();
    });

    it('should display the markdown content with syntax highlighting', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const highlighter = screen.getByTestId('syntax-highlighter');
      expect(highlighter).toBeInTheDocument();
      // Check content is present (textContent normalizes whitespace)
      expect(highlighter).toHaveTextContent('# Test Markdown');
      expect(highlighter).toHaveTextContent('This is a test.');
    });
  });

  describe('Copy to Clipboard', () => {
    it('should render copy button with correct aria-label', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const copyButton = screen.getByLabelText('Copy to clipboard');
      expect(copyButton).toBeInTheDocument();
    });

    it('should copy content to clipboard when copy button is clicked', async () => {
      const user = userEvent.setup();
      const clipboardWriteText = vi.spyOn(navigator.clipboard, 'writeText');

      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const copyButton = screen.getByLabelText('Copy to clipboard');
      await user.click(copyButton);

      await waitFor(() => {
        expect(clipboardWriteText).toHaveBeenCalledWith(mockContent);
      });
    });
  });

  describe('Download Button', () => {
    it('should render download button with correct aria-label', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const downloadButtons = screen.getAllByLabelText(`Download ${mockFilename}`);
      expect(downloadButtons.length).toBeGreaterThan(0);
    });

    it('should have correct href on download link', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const downloadLinks = screen.getAllByRole('link');
      const headerDownloadLink = downloadLinks.find(
        (link) => link.getAttribute('aria-label') === `Download ${mockFilename}`
      );

      expect(headerDownloadLink).toHaveAttribute('href', mockDownloadUrl);
      expect(headerDownloadLink).toHaveAttribute('download', mockFilename);
    });
  });

  describe('Close Button', () => {
    it('should render close button with correct aria-label', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByLabelText('Close viewer')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const closeButton = screen.getByLabelText('Close viewer');
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should close modal when Escape key is pressed', async () => {
      const user = userEvent.setup();

      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      await user.keyboard('{Escape}');

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Backdrop Interaction', () => {
    it('should close modal when clicking on backdrop', async () => {
      const user = userEvent.setup();

      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      await user.click(dialog);

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Accessibility (ARIA)', () => {
    it('should have role="dialog"', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have aria-modal="true"', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should have aria-labelledby pointing to title', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'markdown-viewer-title');
    });
  });

  describe('Body Overflow', () => {
    it('should hide body overflow when modal is open', () => {
      render(
        <MarkdownViewer
          content={mockContent}
          filename={mockFilename}
          downloadUrl={mockDownloadUrl}
          isOpen={true}
          onClose={mockOnClose}
        />
      );

      expect(document.body.style.overflow).toBe('hidden');
    });
  });
});
