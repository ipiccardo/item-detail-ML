import { renderHook, act } from "@testing-library/react";
import { useQuantity } from "../useQuantity";

describe("useQuantity", () => {
  it("should initialize with default quantity", () => {
    const { result } = renderHook(() => useQuantity(10));

    expect(result.current.quantity).toBe(1);
  });

  it("should initialize with custom quantity", () => {
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

  it("should not exceed max quantity", () => {
    const { result } = renderHook(() => useQuantity(3, 3));

    act(() => {
      result.current.increment();
    });

    expect(result.current.quantity).toBe(3);
  });

  it("should decrement quantity", () => {
    const { result } = renderHook(() => useQuantity(10, 5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.quantity).toBe(4);
  });

  it("should not go below 1", () => {
    const { result } = renderHook(() => useQuantity(10, 1));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.quantity).toBe(1);
  });

  it("should set quantity within valid range", () => {
    const { result } = renderHook(() => useQuantity(10, 1));

    act(() => {
      result.current.setQuantity(5);
    });

    expect(result.current.quantity).toBe(5);
  });

  it("should clamp quantity to max when setting above max", () => {
    const { result } = renderHook(() => useQuantity(5, 1));

    act(() => {
      result.current.setQuantity(10);
    });

    expect(result.current.quantity).toBe(5);
  });

  it("should clamp quantity to 1 when setting below 1", () => {
    const { result } = renderHook(() => useQuantity(10, 5));

    act(() => {
      result.current.setQuantity(0);
    });

    expect(result.current.quantity).toBe(1);
  });
});
