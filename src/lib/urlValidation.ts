/**
 * URL validation utilities for security
 * 
 * Validates external URLs to prevent XSS attacks via javascript:, data:, or other
 * dangerous URL schemes.
 */

/**
 * Allowed URL protocols for external links
 */
const ALLOWED_PROTOCOLS = ['http:', 'https:'];

/**
 * Validates that a URL uses a safe protocol (http or https)
 * 
 * @param url - The URL to validate
 * @returns true if the URL is valid and uses http/https, false otherwise
 * 
 * @example
 * isValidExternalUrl('https://example.com') // true
 * isValidExternalUrl('http://example.com')  // true
 * isValidExternalUrl('javascript:alert(1)') // false
 * isValidExternalUrl('data:text/html,...')  // false
 */
export function isValidExternalUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const parsed = new URL(url);
    return ALLOWED_PROTOCOLS.includes(parsed.protocol);
  } catch {
    // URL constructor throws for invalid URLs
    return false;
  }
}

/**
 * Sanitizes a URL by returning it only if it's valid, otherwise returns undefined
 * 
 * @param url - The URL to sanitize
 * @returns The URL if valid, undefined otherwise
 */
export function sanitizeUrl(url: string | undefined): string | undefined {
  if (!url) {
    return undefined;
  }
  return isValidExternalUrl(url) ? url : undefined;
}
