import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

describe("useIsMobile", () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it("returns false for desktop width", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true for mobile width", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns true at 767px (just below breakpoint)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 767,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("returns false at 768px (at breakpoint)", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("responds to window resize events", () => {
    let changeListeners: ((e: MediaQueryListEvent) => void)[] = [];

    // Mock matchMedia to capture change listeners
    const mockMatchMedia: typeof window.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (
        _: string,
        listener: (e: MediaQueryListEvent) => void
      ) => {
        changeListeners.push(listener);
      },
      removeEventListener: (
        _: string,
        listener: (e: MediaQueryListEvent) => void
      ) => {
        changeListeners = changeListeners.filter((l) => l !== listener);
      },
      dispatchEvent: () => false,
    });

    const originalMatchMedia = window.matchMedia;
    window.matchMedia = mockMatchMedia;

    try {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(false);

      act(() => {
        Object.defineProperty(window, "innerWidth", {
          writable: true,
          configurable: true,
          value: 500,
        });
        // Trigger all registered change listeners
        changeListeners.forEach((listener) => {
          listener({ matches: true } as MediaQueryListEvent);
        });
      });

      expect(result.current).toBe(true);
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });
});
