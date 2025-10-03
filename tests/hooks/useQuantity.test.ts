import { renderHook, act } from "@testing-library/react";
import { useQuantity } from "../../src/hooks/useQuantity";

describe("useQuantity", () => {
    it("should initialize with default quantity", () => {
        const { result } = renderHook(() => useQuantity(10));
        
        expect(result.current.quantity).toBe(1);
    });

    it("should initialize with custom initial quantity", () => {
        const { result } = renderHook(() => useQuantity(10, 5));
        
        expect(result.current.quantity).toBe(5);
    });

    it("should increment quantity", () => {
        const { result } = renderHook(() => useQuantity(10, 1));
        
        act(() => {
            result.current.increment();
        });
        
        expect(result.current.quantity).toBe(2);
    });

    it("should decrement quantity", () => {
        const { result } = renderHook(() => useQuantity(10, 5));
        
        act(() => {
            result.current.decrement();
        });
        
        expect(result.current.quantity).toBe(4);
    });

    it("should not decrement below 1", () => {
        const { result } = renderHook(() => useQuantity(10, 1));
        
        act(() => {
            result.current.decrement();
        });
        
        expect(result.current.quantity).toBe(1);
    });

    it("should handle multiple increments", () => {
        const { result } = renderHook(() => useQuantity(10, 1));
        
        act(() => {
            result.current.increment();
            result.current.increment();
            result.current.increment();
        });
        
        expect(result.current.quantity).toBe(4);
    });

    it("should handle multiple decrements", () => {
        const { result } = renderHook(() => useQuantity(10, 5));
        
        act(() => {
            result.current.decrement();
            result.current.decrement();
            result.current.decrement();
        });
        
        expect(result.current.quantity).toBe(2);
    });

    it("should handle mixed increments and decrements", () => {
        const { result } = renderHook(() => useQuantity(10, 3));
        
        act(() => {
            result.current.increment();
            result.current.decrement();
            result.current.increment();
            result.current.increment();
        });
        
        expect(result.current.quantity).toBe(5);
    });

    it("should handle zero initial quantity", () => {
        const { result } = renderHook(() => useQuantity(10, 0));
        
        expect(result.current.quantity).toBe(0);
        
        act(() => {
            result.current.increment();
        });
        
        expect(result.current.quantity).toBe(1);
    });

    it("should handle negative initial quantity", () => {
        const { result } = renderHook(() => useQuantity(10, -5));
        
        expect(result.current.quantity).toBe(-5);
        
        act(() => {
            result.current.increment();
        });
        
        expect(result.current.quantity).toBe(-4);
    });

    it("should handle large initial quantity", () => {
        const { result } = renderHook(() => useQuantity(1000, 1000));
        
        expect(result.current.quantity).toBe(1000);
        
        act(() => {
            result.current.increment();
        });
        
        expect(result.current.quantity).toBe(1000); // Max quantity reached
    });

    it("should handle rapid state changes", () => {
        const { result } = renderHook(() => useQuantity(20, 1));
        
        act(() => {
            // Simulate rapid clicks
            for (let i = 0; i < 10; i++) {
                result.current.increment();
            }
        });
        
        expect(result.current.quantity).toBe(11);
    });

    it("should maintain state across re-renders", () => {
        const { result, rerender } = renderHook(() => useQuantity(10, 5));
        
        act(() => {
            result.current.increment();
        });
        
        expect(result.current.quantity).toBe(6);
        
        rerender();
        
        expect(result.current.quantity).toBe(6);
    });

    it("should not exceed max quantity", () => {
        const { result } = renderHook(() => useQuantity(5, 3));
        
        act(() => {
            result.current.increment();
            result.current.increment();
            result.current.increment();
        });
        
        expect(result.current.quantity).toBe(5); // Max reached
    });
});
