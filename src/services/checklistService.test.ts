import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  fetchChecklist, 
  saveChecklistState, 
  loadChecklistState,
  flushChecklistState,
  Checklist
} from './checklistService';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('checklistService', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('fetchChecklist', () => {
    test('successfully fetches checklist data', async () => {
      const mockChecklist: Checklist = {
        title: 'Test Checklist',
        sections: [
          {
            id: 'section-1',
            title: 'Section 1',
            description: 'Description 1',
            items: [
              { id: 'item-1', title: 'Item 1', description: 'Desc 1' }
            ]
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockChecklist)
      });

      const result = await fetchChecklist();

      expect(fetch).toHaveBeenCalledWith('/checklist-data.json');
      expect(result).toEqual(mockChecklist);
    });

    test('throws error when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404
      });

      await expect(fetchChecklist()).rejects.toThrow('Failed to load checklist data');
    });

    test('throws error on network failure', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(fetchChecklist()).rejects.toThrow('Network error');
    });

    test('throws error on invalid JSON schema - missing title', async () => {
      const invalidChecklist = {
        sections: [
          {
            id: 'section-1',
            title: 'Section 1',
            description: 'Description 1',
            items: [
              { id: 'item-1', title: 'Item 1', description: 'Desc 1' }
            ]
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(invalidChecklist)
      });

      await expect(fetchChecklist()).rejects.toThrow();
    });

    test('throws error on invalid JSON schema - empty sections', async () => {
      const invalidChecklist = {
        title: 'Test',
        sections: []
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(invalidChecklist)
      });

      await expect(fetchChecklist()).rejects.toThrow();
    });

    test('throws error on invalid JSON schema - section with no items', async () => {
      const invalidChecklist = {
        title: 'Test',
        sections: [
          {
            id: 'section-1',
            title: 'Section 1',
            description: 'Description 1',
            items: []
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(invalidChecklist)
      });

      await expect(fetchChecklist()).rejects.toThrow();
    });

    test('validates optional URL fields', async () => {
      const mockChecklist: Checklist = {
        title: 'Test Checklist',
        sections: [
          {
            id: 'section-1',
            title: 'Section 1',
            description: 'Description 1',
            items: [
              { 
                id: 'item-1', 
                title: 'Item 1', 
                description: 'Desc 1',
                link: 'https://example.com',
                externalLink: 'https://external.com'
              }
            ]
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockChecklist)
      });

      const result = await fetchChecklist();
      expect(result.sections[0].items[0].link).toBe('https://example.com');
    });
  });

  describe('saveChecklistState', () => {
    test('saves checked items to localStorage after debounce', () => {
      const checkedItems = { 'item-1': true, 'item-2': false, 'item-3': true };

      saveChecklistState(checkedItems);

      // Should not be called immediately due to debounce
      expect(localStorageMock.setItem).not.toHaveBeenCalled();

      // Fast forward past debounce delay
      vi.advanceTimersByTime(500);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'vibe-checklist-state',
        JSON.stringify(checkedItems)
      );
    });

    test('saves empty state after debounce', () => {
      saveChecklistState({});

      vi.advanceTimersByTime(500);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'vibe-checklist-state',
        '{}'
      );
    });

    test('debounces multiple rapid calls', () => {
      saveChecklistState({ 'item-1': true });
      saveChecklistState({ 'item-1': true, 'item-2': true });
      saveChecklistState({ 'item-1': true, 'item-2': true, 'item-3': true });

      // Advance only partially
      vi.advanceTimersByTime(250);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();

      // Advance past debounce
      vi.advanceTimersByTime(500);

      // Should only be called once with the last value
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'vibe-checklist-state',
        JSON.stringify({ 'item-1': true, 'item-2': true, 'item-3': true })
      );
    });
  });

  describe('flushChecklistState', () => {
    test('immediately writes pending state', () => {
      const checkedItems = { 'item-1': true };

      saveChecklistState(checkedItems);
      expect(localStorageMock.setItem).not.toHaveBeenCalled();

      flushChecklistState();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'vibe-checklist-state',
        JSON.stringify(checkedItems)
      );
    });
  });

  describe('loadChecklistState', () => {
    test('loads saved state from localStorage', () => {
      const savedState = { 'item-1': true, 'item-2': true };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedState));

      const result = loadChecklistState();

      expect(localStorageMock.getItem).toHaveBeenCalledWith('vibe-checklist-state');
      expect(result).toEqual(savedState);
    });

    test('returns empty object when no saved state exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadChecklistState();

      expect(result).toEqual({});
    });

    test('returns empty object on JSON parse error', () => {
      localStorageMock.getItem.mockReturnValue('invalid json{');

      const result = loadChecklistState();

      expect(result).toEqual({});
    });
  });
});
