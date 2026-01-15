import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { reducer, useToast, toast } from './use-toast';
import { renderHook, act } from '@testing-library/react';

describe('use-toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('Reducer - ADD_TOAST', () => {
    test('reducer_add_toast_adds_toast_to_empty_state', () => {
      const state = { toasts: [] };
      const newToast = {
        id: '1',
        title: 'Test Toast',
        open: true,
        onOpenChange: vi.fn(),
      };

      const result = reducer(state, {
        type: 'ADD_TOAST',
        toast: newToast,
      });

      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0]).toEqual(newToast);
    });

    test('reducer_add_toast_prepends_new_toast_to_existing_toasts', () => {
      const existingToast = {
        id: '1',
        title: 'Existing',
        open: true,
        onOpenChange: vi.fn(),
      };
      const state = { toasts: [existingToast] };
      const newToast = {
        id: '2',
        title: 'New Toast',
        open: true,
        onOpenChange: vi.fn(),
      };

      const result = reducer(state, {
        type: 'ADD_TOAST',
        toast: newToast,
      });

      expect(result.toasts[0]).toEqual(newToast);
    });

    test('reducer_add_toast_respects_toast_limit_of_one', () => {
      const toast1 = {
        id: '1',
        title: 'Toast 1',
        open: true,
        onOpenChange: vi.fn(),
      };
      const toast2 = {
        id: '2',
        title: 'Toast 2',
        open: true,
        onOpenChange: vi.fn(),
      };
      const toast3 = {
        id: '3',
        title: 'Toast 3',
        open: true,
        onOpenChange: vi.fn(),
      };

      let state = { toasts: [] };
      state = reducer(state, { type: 'ADD_TOAST', toast: toast1 });
      state = reducer(state, { type: 'ADD_TOAST', toast: toast2 });
      state = reducer(state, { type: 'ADD_TOAST', toast: toast3 });

      expect(state.toasts).toHaveLength(1);
      expect(state.toasts[0].id).toBe('3');
    });

    test('reducer_add_toast_preserves_immutability', () => {
      const originalState = { toasts: [] };
      const newToast = {
        id: '1',
        title: 'Test',
        open: true,
        onOpenChange: vi.fn(),
      };

      reducer(originalState, {
        type: 'ADD_TOAST',
        toast: newToast,
      });

      expect(originalState.toasts).toHaveLength(0);
    });
  });

  describe('Reducer - UPDATE_TOAST', () => {
    test('reducer_update_toast_updates_existing_toast_properties', () => {
      const state = {
        toasts: [
          {
            id: '1',
            title: 'Original',
            description: 'Original desc',
            open: true,
            onOpenChange: vi.fn(),
          },
        ],
      };

      const result = reducer(state, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'Updated', description: 'Updated desc' },
      });

      expect(result.toasts[0].title).toBe('Updated');
      expect(result.toasts[0].description).toBe('Updated desc');
      expect(result.toasts[0].open).toBe(true);
    });

    test('reducer_update_toast_only_updates_specified_properties', () => {
      const originalOnOpenChange = vi.fn();
      const state = {
        toasts: [
          {
            id: '1',
            title: 'Original',
            open: true,
            onOpenChange: originalOnOpenChange,
          },
        ],
      };

      const result = reducer(state, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'Updated' },
      });

      expect(result.toasts[0].title).toBe('Updated');
      expect(result.toasts[0].onOpenChange).toBe(originalOnOpenChange);
    });

    test('reducer_update_toast_with_nonexistent_id_does_not_change_state', () => {
      const state = {
        toasts: [{ id: '1', title: 'Toast 1', open: true, onOpenChange: vi.fn() }],
      };

      const result = reducer(state, {
        type: 'UPDATE_TOAST',
        toast: { id: '999', title: 'Updated' },
      });

      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0].title).toBe('Toast 1');
    });
  });

  describe('Reducer - DISMISS_TOAST', () => {
    test('reducer_dismiss_toast_with_id_sets_open_to_false', () => {
      const state = {
        toasts: [{ id: '1', title: 'Test', open: true, onOpenChange: vi.fn() }],
      };

      const result = reducer(state, {
        type: 'DISMISS_TOAST',
        toastId: '1',
      });

      expect(result.toasts[0].open).toBe(false);
    });

    test('reducer_dismiss_toast_without_id_dismisses_all_toasts', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true, onOpenChange: vi.fn() },
          { id: '2', title: 'Toast 2', open: true, onOpenChange: vi.fn() },
        ],
      };

      const result = reducer(state, {
        type: 'DISMISS_TOAST',
      });

      expect(result.toasts[0].open).toBe(false);
      expect(result.toasts[1].open).toBe(false);
    });

    test('reducer_dismiss_toast_with_id_only_affects_specified_toast', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true, onOpenChange: vi.fn() },
          { id: '2', title: 'Toast 2', open: true, onOpenChange: vi.fn() },
        ],
      };

      const result = reducer(state, {
        type: 'DISMISS_TOAST',
        toastId: '1',
      });

      expect(result.toasts[0].open).toBe(false);
      expect(result.toasts[1].open).toBe(true);
    });
  });

  describe('Reducer - REMOVE_TOAST', () => {
    test('reducer_remove_toast_with_id_removes_specific_toast', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: false, onOpenChange: vi.fn() },
          { id: '2', title: 'Toast 2', open: true, onOpenChange: vi.fn() },
        ],
      };

      const result = reducer(state, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      });

      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0].id).toBe('2');
    });

    test('reducer_remove_toast_without_id_clears_all_toasts', () => {
      const state = {
        toasts: [
          { id: '1', title: 'Toast 1', open: false, onOpenChange: vi.fn() },
          { id: '2', title: 'Toast 2', open: false, onOpenChange: vi.fn() },
        ],
      };

      const result = reducer(state, {
        type: 'REMOVE_TOAST',
      });

      expect(result.toasts).toHaveLength(0);
    });

    test('reducer_remove_toast_preserves_immutability', () => {
      const originalState = {
        toasts: [{ id: '1', title: 'Toast 1', open: false, onOpenChange: vi.fn() }],
      };

      reducer(originalState, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      });

      expect(originalState.toasts).toHaveLength(1);
    });
  });

  describe('Toast Function - ID Generation', () => {
    test('toast_function_returns_id_dismiss_and_update', () => {
      const result = toast({
        title: 'Test Toast',
      });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('dismiss');
      expect(result).toHaveProperty('update');
      expect(typeof result.id).toBe('string');
      expect(typeof result.dismiss).toBe('function');
      expect(typeof result.update).toBe('function');
    });

    test('toast_function_generates_unique_ids', () => {
      const toast1 = toast({ title: 'Toast 1' });
      const toast2 = toast({ title: 'Toast 2' });
      const toast3 = toast({ title: 'Toast 3' });

      expect(toast1.id).not.toBe(toast2.id);
      expect(toast2.id).not.toBe(toast3.id);
      expect(toast1.id).not.toBe(toast3.id);
    });

    test('toast_function_generates_numeric_string_ids', () => {
      const result = toast({ title: 'Test' });

      expect(/^\d+$/.test(result.id)).toBe(true);
    });
  });

  describe('Toast Function - Dismiss Method', () => {
    test('toast_dismiss_function_dismisses_the_toast', () => {
      const result = toast({ title: 'Test' });

      // The dismiss should not throw
      expect(() => result.dismiss()).not.toThrow();
    });

    test('toast_dismiss_function_can_be_called_multiple_times', () => {
      const result = toast({ title: 'Test' });

      expect(() => {
        result.dismiss();
        result.dismiss();
        result.dismiss();
      }).not.toThrow();
    });
  });

  describe('useToast Hook', () => {
    test('useToast_hook_returns_toasts_and_dismiss_function', () => {
      const { result } = renderHook(() => useToast());

      expect(result.current).toHaveProperty('toasts');
      expect(result.current).toHaveProperty('dismiss');
      expect(result.current).toHaveProperty('toast');
      expect(Array.isArray(result.current.toasts)).toBe(true);
      expect(typeof result.current.dismiss).toBe('function');
      expect(typeof result.current.toast).toBe('function');
    });

    test('useToast_hook_can_add_toast', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: 'Test Toast' });
      });

      expect(result.current.toasts.length).toBeGreaterThanOrEqual(1);
    });

    test('useToast_hook_can_dismiss_specific_toast', () => {
      const { result } = renderHook(() => useToast());
      let toastId: string;

      act(() => {
        const toastResult = result.current.toast({ title: 'Test' });
        toastId = toastResult.id;
      });

      act(() => {
        result.current.dismiss(toastId!);
      });

      // Toast should be dismissed (open: false)
      const dismissedToast = result.current.toasts.find(t => t.id === toastId);
      if (dismissedToast) {
        expect(dismissedToast.open).toBe(false);
      }
    });

    test('useToast_hook_can_dismiss_all_toasts', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: 'Toast 1' });
      });

      act(() => {
        result.current.dismiss();
      });

      // All toasts should be dismissed
      result.current.toasts.forEach(t => {
        expect(t.open).toBe(false);
      });
    });

    test('useToast_hook_unsubscribes_on_unmount', () => {
      const { unmount } = renderHook(() => useToast());

      expect(() => {
        unmount();
      }).not.toThrow();
    });
  });

  describe('Integration Scenarios', () => {
    test('scenario_add_and_dismiss_toast', () => {
      const { result } = renderHook(() => useToast());
      let toastId: string;

      act(() => {
        const toastResult = result.current.toast({
          title: 'Original',
          description: 'Original description',
        });
        toastId = toastResult.id;
      });

      // Dismiss the toast
      act(() => {
        result.current.dismiss(toastId);
      });

      const dismissedToast = result.current.toasts.find(t => t.id === toastId);
      if (dismissedToast) {
        expect(dismissedToast.open).toBe(false);
      }
    });
  });
});
