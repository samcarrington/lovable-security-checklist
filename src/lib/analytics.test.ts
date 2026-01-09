import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ConsentState,
  updateConsent,
  restoreConsent,
  getConsentState,
  pushEvent,
  trackCheckboxToggle,
  trackSectionComplete,
  trackProgressMilestone,
  trackThemeChange,
  trackClearAll,
  CONSENT_STORAGE_KEY,
} from './analytics';

// Type for dataLayer items
interface DataLayerItem {
  event?: string;
  [key: string]: unknown;
}

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('analytics', () => {
  let mockGtag: ReturnType<typeof vi.fn>;
  let mockDataLayer: DataLayerItem[];

  beforeEach(() => {
    // Clear all mocks and storage before each test
    vi.clearAllMocks();
    localStorageMock.clear();
    
    // Setup fresh mocks for each test
    mockGtag = vi.fn();
    mockDataLayer = [];
    
    Object.defineProperty(window, 'gtag', {
      writable: true,
      configurable: true,
      value: mockGtag,
    });

    Object.defineProperty(window, 'dataLayer', {
      writable: true,
      configurable: true,
      value: mockDataLayer,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  describe('ConsentState enum', () => {
    test('ConsentState.GRANTED equals "granted"', () => {
      expect(ConsentState.GRANTED).toBe('granted');
    });

    test('ConsentState.DENIED equals "denied"', () => {
      expect(ConsentState.DENIED).toBe('denied');
    });
  });

  describe('updateConsent', () => {
    test('updates GTM consent state via window.gtag when gtag is available', () => {
      updateConsent(ConsentState.GRANTED);

      expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: ConsentState.GRANTED,
      });
    });

    test('persists consent state to localStorage', () => {
      updateConsent(ConsentState.GRANTED);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        CONSENT_STORAGE_KEY,
        ConsentState.GRANTED
      );
    });

    test('handles DENIED consent state', () => {
      updateConsent(ConsentState.DENIED);

      expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: ConsentState.DENIED,
      });
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        CONSENT_STORAGE_KEY,
        ConsentState.DENIED
      );
    });

    test('gracefully handles when window.gtag is undefined', () => {
      Object.defineProperty(window, 'gtag', {
        writable: true,
        configurable: true,
        value: undefined,
      });

      // Should not throw
      expect(() => updateConsent(ConsentState.GRANTED)).not.toThrow();

      // Should still persist to localStorage
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        CONSENT_STORAGE_KEY,
        ConsentState.GRANTED
      );
    });

    test('updates consent state multiple times', () => {
      updateConsent(ConsentState.GRANTED);
      updateConsent(ConsentState.DENIED);
      updateConsent(ConsentState.GRANTED);

      expect(mockGtag).toHaveBeenCalledTimes(3);
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(3);
    });
  });

  describe('restoreConsent', () => {
    test('restores consent from localStorage when consent exists', () => {
      localStorageMock.getItem.mockReturnValue(ConsentState.GRANTED);

      restoreConsent();

      expect(localStorageMock.getItem).toHaveBeenCalledWith(CONSENT_STORAGE_KEY);
      expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: ConsentState.GRANTED,
      });
    });

    test('restores DENIED consent state from localStorage', () => {
      localStorageMock.getItem.mockReturnValue(ConsentState.DENIED);

      restoreConsent();

      expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: ConsentState.DENIED,
      });
    });

    test('does nothing when no consent is stored in localStorage', () => {
      localStorageMock.getItem.mockReturnValue(null);

      restoreConsent();

      expect(mockGtag).not.toHaveBeenCalled();
    });
  });

  describe('getConsentState', () => {
    test('returns current consent state from localStorage', () => {
      localStorageMock.getItem.mockReturnValue(ConsentState.GRANTED);

      const state = getConsentState();

      expect(state).toBe(ConsentState.GRANTED);
      expect(localStorageMock.getItem).toHaveBeenCalledWith(CONSENT_STORAGE_KEY);
    });

    test('returns DENIED when that is the stored state', () => {
      localStorageMock.getItem.mockReturnValue(ConsentState.DENIED);

      const state = getConsentState();

      expect(state).toBe(ConsentState.DENIED);
    });

    test('returns null when no consent state is set', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const state = getConsentState();

      expect(state).toBeNull();
    });
  });

  describe('pushEvent', () => {
    test('pushes event to window.dataLayer with correct structure', () => {
      pushEvent('page_view');

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'page_view',
        })
      );
    });

    test('pushes event with parameters', () => {
      const params = {
        page_title: 'Security Checklist',
        page_location: 'https://example.com',
      };

      pushEvent('page_view', params);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'page_view',
          ...params,
        })
      );
    });

    test('pushes event with mixed parameter types', () => {
      const params = {
        item_count: 10,
        is_complete: true,
        section_name: 'Security',
      };

      pushEvent('section_complete', params);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'section_complete',
          item_count: 10,
          is_complete: true,
          section_name: 'Security',
        })
      );
    });

    test('initializes dataLayer if undefined', () => {
      Object.defineProperty(window, 'dataLayer', {
        writable: true,
        configurable: true,
        value: undefined,
      });

      pushEvent('test_event');

      expect(window.dataLayer).toBeDefined();
      expect(Array.isArray(window.dataLayer)).toBe(true);
    });

    test('can push multiple events in sequence', () => {
      pushEvent('event_1');
      pushEvent('event_2', { param: 'value' });
      pushEvent('event_3');

      expect(mockDataLayer.length).toBeGreaterThanOrEqual(3);
      const events = mockDataLayer
        .filter((item: DataLayerItem) => item.event)
        .map((item: DataLayerItem) => item.event);
      expect(events).toContain('event_1');
      expect(events).toContain('event_2');
      expect(events).toContain('event_3');
    });
  });

  describe('trackCheckboxToggle', () => {
    test('tracks checkbox toggle with all parameters', () => {
      trackCheckboxToggle('item-1', 'section-1', 'Security', 'Enable 2FA', true);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'checkbox_toggle',
          item_id: 'item-1',
          section_id: 'section-1',
          section_title: 'Security',
          item_title: 'Enable 2FA',
          checked: true,
        })
      );
    });

    test('tracks checkbox unchecked state', () => {
      trackCheckboxToggle('item-2', 'section-2', 'Access Control', 'Disable root login', false);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'checkbox_toggle',
          item_id: 'item-2',
          section_id: 'section-2',
          section_title: 'Access Control',
          item_title: 'Disable root login',
          checked: false,
        })
      );
    });

    test('tracks multiple checkbox toggles', () => {
      trackCheckboxToggle('item-1', 'section-1', 'Security', 'Enable 2FA', true);
      trackCheckboxToggle('item-2', 'section-1', 'Security', 'Update password', true);
      trackCheckboxToggle('item-1', 'section-1', 'Security', 'Enable 2FA', false);

      const toggleEvents = mockDataLayer.filter((item: DataLayerItem) => item.event === 'checkbox_toggle');
      expect(toggleEvents.length).toBe(3);
    });
  });

  describe('trackSectionComplete', () => {
    test('tracks section completion with all parameters', () => {
      trackSectionComplete('section-1', 'Security', 5);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'section_complete',
          section_id: 'section-1',
          section_title: 'Security',
          item_count: 5,
        })
      );
    });

    test('tracks section with zero items', () => {
      trackSectionComplete('section-empty', 'Empty Section', 0);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'section_complete',
          item_count: 0,
        })
      );
    });
  });

  describe('trackProgressMilestone', () => {
    test('tracks 25% progress milestone', () => {
      trackProgressMilestone(25);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'progress_milestone',
          percentage: 25,
        })
      );
    });

    test('tracks 50% progress milestone', () => {
      trackProgressMilestone(50);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'progress_milestone',
          percentage: 50,
        })
      );
    });

    test('tracks 75% progress milestone', () => {
      trackProgressMilestone(75);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'progress_milestone',
          percentage: 75,
        })
      );
    });

    test('tracks 100% progress milestone', () => {
      trackProgressMilestone(100);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'progress_milestone',
          percentage: 100,
        })
      );
    });
  });

  describe('trackThemeChange', () => {
    test('tracks light theme change', () => {
      trackThemeChange('light');

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'theme_change',
          theme: 'light',
        })
      );
    });

    test('tracks dark theme change', () => {
      trackThemeChange('dark');

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'theme_change',
          theme: 'dark',
        })
      );
    });
  });

  describe('trackClearAll', () => {
    test('tracks clear all button click with section info', () => {
      trackClearAll('section-1', 'Security');

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'clear_all',
          section_id: 'section-1',
          section_title: 'Security',
        })
      );
    });

    test('tracks multiple clear all clicks in different sections', () => {
      trackClearAll('section-1', 'Security');
      trackClearAll('section-2', 'Compliance');

      const clearAllEvents = mockDataLayer.filter((item: DataLayerItem) => item.event === 'clear_all');
      expect(clearAllEvents.length).toBe(2);
    });
  });

  describe('Integration scenarios', () => {
    test('flow: user grants consent then tracks events', () => {
      updateConsent(ConsentState.GRANTED);
      pushEvent('app_start');
      trackCheckboxToggle('item-1', 'section-1', 'Security', 'Enable 2FA', true);

      expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
        analytics_storage: ConsentState.GRANTED,
      });
      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'app_start',
        })
      );
      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'checkbox_toggle',
        })
      );
    });

    test('flow: complete user journey tracking', () => {
      // User arrives
      pushEvent('page_view', { page_title: 'Checklist' });
      
      // User completes items
      trackCheckboxToggle('item-1', 'security', 'Security', 'Enable 2FA', true);
      trackCheckboxToggle('item-2', 'security', 'Security', 'Update password', true);
      
      // User completes section
      trackSectionComplete('security', 'Security', 2);
      
      // Track progress
      trackProgressMilestone(25);
      
      // User changes theme
      trackThemeChange('dark');
      
      // Verify events were tracked
      const events = mockDataLayer
        .filter((item: DataLayerItem) => item.event)
        .map((item: DataLayerItem) => item.event);
      expect(events).toContain('page_view');
      expect(events).toContain('checkbox_toggle');
      expect(events).toContain('section_complete');
      expect(events).toContain('progress_milestone');
      expect(events).toContain('theme_change');
    });
  });

  describe('Edge cases and error handling', () => {
    test('handles localStorage setItem errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      // Should handle gracefully without throwing
      expect(() => updateConsent(ConsentState.GRANTED)).not.toThrow();
    });

    test('handles empty string parameters', () => {
      trackCheckboxToggle('', '', '', '', true);

      expect(mockDataLayer).toContainEqual(
        expect.objectContaining({
          event: 'checkbox_toggle',
        })
      );
    });
  });
});
