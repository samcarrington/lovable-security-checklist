import { describe, test, expect } from 'vitest';
import { isValidExternalUrl, sanitizeUrl } from './urlValidation';

describe('urlValidation', () => {
  describe('isValidExternalUrl', () => {
    test('returns true for https URLs', () => {
      expect(isValidExternalUrl('https://example.com')).toBe(true);
      expect(isValidExternalUrl('https://subdomain.example.com/path')).toBe(true);
      expect(isValidExternalUrl('https://example.com:8080')).toBe(true);
      expect(isValidExternalUrl('https://example.com/path?query=1')).toBe(true);
      expect(isValidExternalUrl('https://example.com#hash')).toBe(true);
    });

    test('returns true for http URLs', () => {
      expect(isValidExternalUrl('http://example.com')).toBe(true);
      expect(isValidExternalUrl('http://localhost:3000')).toBe(true);
    });

    test('returns false for javascript: URLs', () => {
      expect(isValidExternalUrl('javascript:alert(1)')).toBe(false);
      expect(isValidExternalUrl('javascript:void(0)')).toBe(false);
      expect(isValidExternalUrl('javascript:document.location="http://evil.com"')).toBe(false);
    });

    test('returns false for data: URLs', () => {
      expect(isValidExternalUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
      expect(isValidExternalUrl('data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==')).toBe(false);
    });

    test('returns false for file: URLs', () => {
      expect(isValidExternalUrl('file:///etc/passwd')).toBe(false);
      expect(isValidExternalUrl('file://localhost/path')).toBe(false);
    });

    test('returns false for ftp: URLs', () => {
      expect(isValidExternalUrl('ftp://files.example.com')).toBe(false);
    });

    test('returns false for mailto: URLs', () => {
      expect(isValidExternalUrl('mailto:user@example.com')).toBe(false);
    });

    test('returns false for vbscript: URLs', () => {
      expect(isValidExternalUrl('vbscript:msgbox("XSS")')).toBe(false);
    });

    test('returns false for empty or invalid inputs', () => {
      expect(isValidExternalUrl('')).toBe(false);
      expect(isValidExternalUrl('not-a-url')).toBe(false);
      expect(isValidExternalUrl('example.com')).toBe(false); // Missing protocol
      expect(isValidExternalUrl(null as unknown as string)).toBe(false);
      expect(isValidExternalUrl(undefined as unknown as string)).toBe(false);
    });

    test('returns false for relative URLs', () => {
      expect(isValidExternalUrl('/path/to/page')).toBe(false);
      expect(isValidExternalUrl('./relative')).toBe(false);
      expect(isValidExternalUrl('../parent')).toBe(false);
    });

    test('handles URL encoding properly', () => {
      expect(isValidExternalUrl('https://example.com/path%20with%20spaces')).toBe(true);
      expect(isValidExternalUrl('https://example.com/?q=%3Cscript%3E')).toBe(true);
    });

    test('handles international domain names', () => {
      expect(isValidExternalUrl('https://例え.jp')).toBe(true);
      expect(isValidExternalUrl('https://münchen.de')).toBe(true);
    });
  });

  describe('sanitizeUrl', () => {
    test('returns valid URLs unchanged', () => {
      expect(sanitizeUrl('https://example.com')).toBe('https://example.com');
      expect(sanitizeUrl('http://example.com')).toBe('http://example.com');
    });

    test('returns undefined for invalid URLs', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBeUndefined();
      expect(sanitizeUrl('data:text/html,test')).toBeUndefined();
      expect(sanitizeUrl('not-a-url')).toBeUndefined();
    });

    test('returns undefined for empty or undefined input', () => {
      expect(sanitizeUrl('')).toBeUndefined();
      expect(sanitizeUrl(undefined)).toBeUndefined();
    });
  });
});
