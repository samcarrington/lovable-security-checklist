import { z } from 'zod';
import debounce from 'lodash.debounce';
import { isValidExternalUrl } from '@/lib/urlValidation';

/**
 * Custom Zod refinement for secure URL validation
 * Uses isValidExternalUrl to ensure only http/https protocols are allowed
 * This prevents XSS attacks via javascript:, data:, or other dangerous schemes
 */
const safeUrlSchema = z.string().refine(
  (url) => isValidExternalUrl(url),
  { message: 'URL must use http or https protocol' }
);

/**
 * Zod schema for checklist item validation
 * Note: URLs are validated with safeUrlSchema to enforce http/https only
 */
const ChecklistItemSchema = z.object({
  id: z.string().min(1, 'Item ID is required'),
  title: z.string().min(1, 'Item title is required'),
  description: z.string(),
  summary: z.string().optional(),
  externalLink: safeUrlSchema.optional(),
  link: safeUrlSchema.optional(),
});

/**
 * Zod schema for checklist section validation
 */
const ChecklistSectionSchema = z.object({
  id: z.string().min(1, 'Section ID is required'),
  title: z.string().min(1, 'Section title is required'),
  description: z.string(),
  items: z.array(ChecklistItemSchema).min(1, 'Section must have at least one item'),
});

/**
 * Zod schema for the complete checklist validation
 */
const ChecklistSchema = z.object({
  title: z.string().min(1, 'Checklist title is required'),
  sections: z.array(ChecklistSectionSchema).min(1, 'Checklist must have at least one section'),
});

// Infer TypeScript types from Zod schemas
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;
export type ChecklistSection = z.infer<typeof ChecklistSectionSchema>;
export type Checklist = z.infer<typeof ChecklistSchema>;

const STORAGE_KEY = "vibe-checklist-state";

/**
 * Internal debounced write function for localStorage
 * Debounced to 500ms to prevent excessive writes during rapid checkbox toggling
 */
const debouncedLocalStorageWrite = debounce((state: Record<string, boolean>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Log errors in development only
    if (import.meta.env.DEV) {
      console.error('Error saving checklist state:', error);
    }
  }
}, 500);

// Flush pending writes on page unload to prevent data loss
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    debouncedLocalStorageWrite.flush();
  });
}

/**
 * Fetch and validate checklist data from the server
 * @throws Error if fetch fails or data validation fails
 */
export async function fetchChecklist(): Promise<Checklist> {
  try {
    const response = await fetch('/checklist-data.json');
    if (!response.ok) {
      throw new Error('Failed to load checklist data');
    }
    
    const data = await response.json();
    
    // Validate and parse the data - throws ZodError if invalid
    const validatedData = ChecklistSchema.parse(data);
    
    return validatedData;
  } catch (error) {
    // Log errors in development only
    if (import.meta.env.DEV) {
      console.error('Error loading checklist:', error);
    }
    throw error;
  }
}

/**
 * Save checklist state to localStorage (debounced)
 * @param checkedItems - Record of item IDs to their checked state
 */
export function saveChecklistState(checkedItems: Record<string, boolean>): void {
  debouncedLocalStorageWrite(checkedItems);
}

/**
 * Force flush any pending localStorage writes
 * Useful for testing or explicit save operations
 */
export function flushChecklistState(): void {
  debouncedLocalStorageWrite.flush();
}

/**
 * Load checklist state from localStorage
 * @returns Record of item IDs to their checked state, or empty object on error
 */
export function loadChecklistState(): Record<string, boolean> {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : {};
  } catch (error) {
    // Log errors in development only
    if (import.meta.env.DEV) {
      console.error("Error loading checklist state:", error);
    }
    return {};
  }
}
