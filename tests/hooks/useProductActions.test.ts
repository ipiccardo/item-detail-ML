import { renderHook, act } from "@testing-library/react";
import { useProductActions } from "../../src/hooks/useProductActions";

// Mock navigator
const mockNavigator = {
  share: jest.fn(),
  clipboard: {
    writeText: jest.fn(),
  },
};

Object.defineProperty(window, "navigator", {
  value: mockNavigator,
  writable: true,
});

describe("useProductActions", () => {
  const mockData = {
    productId: "test-product-1",
    quantity: 2,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return action handlers", () => {
    const { result } = renderHook(() => useProductActions(mockData));

    expect(result.current.handleBuyNow).toBeInstanceOf(Function);
    expect(result.current.handleAddToCart).toBeInstanceOf(Function);
  });

  it("should call handleBuyNow with correct data", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const { result } = renderHook(() => useProductActions(mockData));

    act(() => {
      result.current.handleBuyNow();
    });

    expect(consoleSpy).toHaveBeenCalledWith("Comprar ahora:", {
      productId: mockData.productId,
      quantity: mockData.quantity,
    });
    consoleSpy.mockRestore();
  });

  it("should call handleAddToCart with correct data", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const { result } = renderHook(() => useProductActions(mockData));

    act(() => {
      result.current.handleAddToCart();
    });

    expect(consoleSpy).toHaveBeenCalledWith("Agregar al carrito:", {
      productId: mockData.productId,
      quantity: mockData.quantity,
    });
    consoleSpy.mockRestore();
  });

  it("should update handlers when data changes", () => {
    const { result, rerender } = renderHook(({ data }) => useProductActions(data), {
      initialProps: { data: mockData },
    });

    const initialHandlers = result.current;

    const newData = { ...mockData, quantity: 5 };
    rerender({ data: newData });

    // Handlers should be new instances due to useCallback dependencies
    expect(result.current.handleBuyNow).not.toBe(initialHandlers.handleBuyNow);
    expect(result.current.handleAddToCart).not.toBe(initialHandlers.handleAddToCart);
  });
});
