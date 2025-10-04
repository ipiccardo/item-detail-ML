import { act, renderHook } from "@testing-library/react";
import { useSpecificationsExpansionStore } from "../../src/stores/specificationsExpansionStore";

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Element.prototype.scrollIntoView = mockScrollIntoView;

// Mock getElementById
const mockGetElementById = jest.fn();
document.getElementById = mockGetElementById;

describe("specificationsExpansionStore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockScrollIntoView.mockClear();
    mockGetElementById.mockClear();
    jest.useFakeTimers();

    // Reset store state
    useSpecificationsExpansionStore.setState({ isExpanded: false });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should initialize with isExpanded false", () => {
    const { result } = renderHook(() => useSpecificationsExpansionStore());

    expect(result.current.isExpanded).toBe(false);
    expect(typeof result.current.toggleExpansion).toBe("function");
    expect(typeof result.current.expandAndScroll).toBe("function");
  });

  it("should toggle expansion state", () => {
    const { result } = renderHook(() => useSpecificationsExpansionStore());

    expect(result.current.isExpanded).toBe(false);

    act(() => {
      result.current.toggleExpansion();
    });

    expect(result.current.isExpanded).toBe(true);

    act(() => {
      result.current.toggleExpansion();
    });

    expect(result.current.isExpanded).toBe(false);
  });

  it("should expand and scroll when expandAndScroll is called", () => {
    const mockElement = {
      scrollIntoView: mockScrollIntoView,
    };
    mockGetElementById.mockReturnValue(mockElement);

    const { result } = renderHook(() => useSpecificationsExpansionStore());

    act(() => {
      result.current.expandAndScroll();
    });

    expect(result.current.isExpanded).toBe(true);

    // Fast-forward timers to trigger scroll
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(mockGetElementById).toHaveBeenCalledWith("detailed-specifications");
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("should handle case when element is not found", () => {
    mockGetElementById.mockReturnValue(null);

    const { result } = renderHook(() => useSpecificationsExpansionStore());

    act(() => {
      result.current.expandAndScroll();
    });

    expect(result.current.isExpanded).toBe(true);

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(mockGetElementById).toHaveBeenCalledWith("detailed-specifications");
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it("should maintain state across re-renders", () => {
    const { result, rerender } = renderHook(() => useSpecificationsExpansionStore());

    act(() => {
      result.current.toggleExpansion();
    });

    expect(result.current.isExpanded).toBe(true);

    // Re-render
    rerender();

    expect(result.current.isExpanded).toBe(true);
  });

  it("should share state between multiple hook instances", () => {
    const { result: result1 } = renderHook(() => useSpecificationsExpansionStore());
    const { result: result2 } = renderHook(() => useSpecificationsExpansionStore());

    expect(result1.current.isExpanded).toBe(false);
    expect(result2.current.isExpanded).toBe(false);

    act(() => {
      result1.current.toggleExpansion();
    });

    expect(result1.current.isExpanded).toBe(true);
    expect(result2.current.isExpanded).toBe(true);
  });

  it("should allow selective state access", () => {
    const { result } = renderHook(() => useSpecificationsExpansionStore((state) => state.isExpanded));

    expect(result.current).toBe(false);

    act(() => {
      useSpecificationsExpansionStore.getState().toggleExpansion();
    });

    expect(result.current).toBe(true);
  });
});
