import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter } from 'react-router-dom';
import Index from './Index';
import * as checklistService from '@/services/checklistService';

// Mock the checklist service
vi.mock('@/services/checklistService', () => ({
  fetchChecklist: vi.fn(),
  loadChecklistState: vi.fn(),
  saveChecklistState: vi.fn(),
}));

// Create wrapper with all providers
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );
  };
};

const mockChecklist = {
  title: 'Test Security Checklist',
  sections: [
    {
      id: 'section-1',
      title: 'Authentication',
      description: 'Authentication security checks',
      items: [
        { id: 'item-1', title: 'Use strong passwords', description: 'Desc 1' },
        { id: 'item-2', title: 'Enable MFA', description: 'Desc 2' },
      ],
    },
    {
      id: 'section-2',
      title: 'Data Protection',
      description: 'Data security checks',
      items: [
        { id: 'item-3', title: 'Encrypt sensitive data', description: 'Desc 3' },
      ],
    },
  ],
};

describe('Index Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows loading state initially', () => {
    vi.mocked(checklistService.fetchChecklist).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );
    vi.mocked(checklistService.loadChecklistState).mockReturnValue({});

    render(<Index />, { wrapper: createWrapper() });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders checklist after successful load', async () => {
    vi.mocked(checklistService.fetchChecklist).mockResolvedValue(mockChecklist);
    vi.mocked(checklistService.loadChecklistState).mockReturnValue({});

    render(<Index />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Test Security Checklist')).toBeInTheDocument();
    });

    expect(screen.getByText('Authentication')).toBeInTheDocument();
    expect(screen.getByText('Data Protection')).toBeInTheDocument();
    expect(screen.getByText('Use strong passwords')).toBeInTheDocument();
    expect(screen.getByText('Enable MFA')).toBeInTheDocument();
  });

  test('shows error state when fetch fails', async () => {
    vi.mocked(checklistService.fetchChecklist).mockRejectedValue(
      new Error('Network error')
    );
    vi.mocked(checklistService.loadChecklistState).mockReturnValue({});

    render(<Index />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/failed to load checklist/i)).toBeInTheDocument();
    });
  });

  test('loads saved checked state from localStorage', async () => {
    vi.mocked(checklistService.fetchChecklist).mockResolvedValue(mockChecklist);
    vi.mocked(checklistService.loadChecklistState).mockReturnValue({
      'item-1': true,
      'item-3': true,
    });

    render(<Index />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Test Security Checklist')).toBeInTheDocument();
    });

    // Check that the checkboxes reflect the saved state
    const checkbox1 = screen.getByLabelText('Use strong passwords');
    const checkbox3 = screen.getByLabelText('Encrypt sensitive data');

    expect(checkbox1).toBeChecked();
    expect(checkbox3).toBeChecked();
  });

  test('saves state when item is toggled', async () => {
    const user = userEvent.setup();
    vi.mocked(checklistService.fetchChecklist).mockResolvedValue(mockChecklist);
    vi.mocked(checklistService.loadChecklistState).mockReturnValue({});

    render(<Index />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Use strong passwords')).toBeInTheDocument();
    });

    const checkbox = screen.getByLabelText('Use strong passwords');
    await user.click(checkbox);

    expect(checklistService.saveChecklistState).toHaveBeenCalledWith({
      'item-1': true,
    });
  });

  test('calculates progress correctly', async () => {
    vi.mocked(checklistService.fetchChecklist).mockResolvedValue(mockChecklist);
    vi.mocked(checklistService.loadChecklistState).mockReturnValue({
      'item-1': true, // 1 of 3 items checked = 33%
    });

    render(<Index />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Test Security Checklist')).toBeInTheDocument();
    });

    // Should show approximately 33% progress (1/3 items)
    expect(screen.getByText('33%')).toBeInTheDocument();
  });
});
