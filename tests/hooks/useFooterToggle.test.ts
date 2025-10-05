import { renderHook, act } from "@testing-library/react";
import { useFooterToggle } from "../../src/hooks/useFooterToggle";

describe("useFooterToggle", () => {
  it("should initialize with false by default", () => {
    const { result } = renderHook(() => useFooterToggle());

    expect(result.current.isOpen).toBe(false);
    expect(typeof result.current.toggle).toBe("function");
    expect(result.current.footerRef).toBeDefined();
    expect(result.current.footerRef.current).toBeNull();
  });

  it("should initialize with custom initial state", () => {
    const { result } = renderHook(() => useFooterToggle(true));

    expect(result.current.isOpen).toBe(true);
  });

  it("should toggle from false to true", () => {
    const { result } = renderHook(() => useFooterToggle(false));

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should toggle from true to false", () => {
    const { result } = renderHook(() => useFooterToggle(true));

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle multiple times", () => {
    const { result } = renderHook(() => useFooterToggle(false));

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should return the same toggle function reference", () => {
    const { result, rerender } = renderHook(() => useFooterToggle());

    const firstToggle = result.current.toggle;

    rerender();

    expect(result.current.toggle).toBe(firstToggle);
  });
});
