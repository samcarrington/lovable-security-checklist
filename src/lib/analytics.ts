/**
 * Analytics utility module for GTM/GA4 integration
 * 
 * Provides consent management and event tracking for the Security Checklist app.
 * Events are pushed to the GTM data layer for processing by GA4.
 * 
 * Events captured before consent is granted are queued and flushed once consent is given.
 */

// Type declarations for GTM globals
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Consent state enum for GTM Consent Mode v2
 */
export enum ConsentState {
  GRANTED = 'granted',
  DENIED = 'denied',
}

/** localStorage key for persisting consent state */
export const CONSENT_STORAGE_KEY = 'consent_state';

/** Queue for events captured before consent is granted */
let eventQueue: Array<Record<string, unknown>> = [];

/** Track whether consent has been granted this session */
let consentGranted = false;

/**
 * Update GTM consent state and persist to localStorage
 * If consent is granted, flushes any queued events to the dataLayer
 * @param state - The consent state to set (granted or denied)
 */
export function updateConsent(state: ConsentState): void {
  // Update GTM consent if gtag is available
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: state,
    });
  }

  // Persist consent choice to localStorage
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, state);
  } catch (error) {
    // Handle localStorage errors gracefully (e.g., quota exceeded, private browsing)
    if (import.meta.env.DEV) {
      console.warn('[Analytics] Failed to persist consent state:', error);
    }
  }

  // If consent was just granted, flush queued events
  if (state === ConsentState.GRANTED && !consentGranted) {
    consentGranted = true;
    flushEventQueue();
  } else if (state === ConsentState.DENIED) {
    consentGranted = false;
  }

  if (import.meta.env.DEV) {
    console.log('[Analytics] Consent updated:', state);
  }
}

/**
 * Flush all queued events to the dataLayer
 * Called when consent is granted to send previously captured events
 */
function flushEventQueue(): void {
  if (eventQueue.length === 0) return;

  window.dataLayer = window.dataLayer || [];

  if (import.meta.env.DEV) {
    console.log(`[Analytics] Flushing ${eventQueue.length} queued events`);
  }

  // Push all queued events to dataLayer
  eventQueue.forEach((eventData) => {
    window.dataLayer.push(eventData);
    if (import.meta.env.DEV) {
      console.log('[Analytics] Flushed event:', eventData);
    }
  });

  // Clear the queue
  eventQueue = [];
}

/**
 * Restore consent state from localStorage on app load
 * Should be called early in the app lifecycle
 */
export function restoreConsent(): void {
  const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentState | null;

  if (savedConsent) {
    updateConsent(savedConsent);

    if (import.meta.env.DEV) {
      console.log('[Analytics] Consent restored from storage:', savedConsent);
    }
  }
}

/**
 * Get current consent state from localStorage
 * @returns The current consent state or null if not set
 */
export function getConsentState(): ConsentState | null {
  return localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentState | null;
}

/**
 * Check if consent has been granted this session
 * @returns true if consent is granted, false otherwise
 */
export function isConsentGranted(): boolean {
  return consentGranted;
}

/**
 * Get the current event queue length (useful for testing)
 * @returns Number of events in the queue
 */
export function getEventQueueLength(): number {
  return eventQueue.length;
}

/**
 * Clear the event queue (useful for testing)
 */
export function clearEventQueue(): void {
  eventQueue = [];
}

/**
 * Reset consent state (useful for testing)
 */
export function resetConsentState(): void {
  consentGranted = false;
  eventQueue = [];
}

/**
 * Push event to GTM data layer
 * If consent has not been granted, events are queued and sent later
 * @param eventName - The event name (e.g., 'checkbox_toggle', 'page_view')
 * @param params - Optional event parameters
 */
export function pushEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  const eventData = {
    event: eventName,
    ...params,
  };

  if (consentGranted) {
    // Consent granted - push directly to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);

    if (import.meta.env.DEV) {
      console.log('[Analytics] Event pushed:', eventData);
    }
  } else {
    // Consent not yet granted - queue the event
    eventQueue.push(eventData);

    if (import.meta.env.DEV) {
      console.log('[Analytics] Event queued (awaiting consent):', eventData);
    }
  }
}

/**
 * Track checkbox toggle events
 * @param itemId - The unique ID of the checklist item
 * @param sectionId - The ID of the section containing the item
 * @param sectionTitle - The display title of the section
 * @param itemTitle - The display title of the item
 * @param checked - Whether the checkbox is now checked
 */
export function trackCheckboxToggle(
  itemId: string,
  sectionId: string,
  sectionTitle: string,
  itemTitle: string,
  checked: boolean
): void {
  pushEvent('checkbox_toggle', {
    item_id: itemId,
    section_id: sectionId,
    section_title: sectionTitle,
    item_title: itemTitle,
    checked,
  });
}

/**
 * Track section completion event
 * @param sectionId - The ID of the completed section
 * @param sectionTitle - The display title of the section
 * @param itemCount - Number of items in the section
 */
export function trackSectionComplete(
  sectionId: string,
  sectionTitle: string,
  itemCount: number
): void {
  pushEvent('section_complete', {
    section_id: sectionId,
    section_title: sectionTitle,
    item_count: itemCount,
  });
}

/**
 * Track progress milestone events
 * @param percentage - The milestone percentage (25, 50, 75, 100)
 */
export function trackProgressMilestone(percentage: number): void {
  pushEvent('progress_milestone', {
    percentage,
  });
}

/**
 * Track theme change events
 * @param theme - The new theme ('light' or 'dark')
 */
export function trackThemeChange(theme: string): void {
  pushEvent('theme_change', {
    theme,
  });
}

/**
 * Track clear all button clicks
 * @param sectionId - The ID of the section being cleared
 * @param sectionTitle - The display title of the section
 */
export function trackClearAll(sectionId: string, sectionTitle: string): void {
  pushEvent('clear_all', {
    section_id: sectionId,
    section_title: sectionTitle,
  });
}

/**
 * Track page view events
 * @param pagePath - The page path (e.g., '/', '/about')
 * @param pageTitle - Optional page title
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  const params: Record<string, string> = {
    page_path: pagePath,
  };

  if (pageTitle) {
    params.page_title = pageTitle;
  }

  pushEvent('page_view', params);
}
