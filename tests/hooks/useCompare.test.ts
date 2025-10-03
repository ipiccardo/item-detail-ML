import { renderHook, act } from "@testing-library/react";
import { useCompare } from "../../src/hooks/useCompare";
import { Product } from "../../src/types/product";
import { MAX_COMPARE_PRODUCTS } from "../../src/types/compare";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useCompare", () => {
  const mockProduct1: Product = {
    id: "1",
    title: "Product 1",
    price: { amount: 100, currency: "ARS" },
    images: ["image1.jpg"],
    rating: 4.5,
    stock: 10,
    seller: {
      id: "seller1",
      name: "Test Seller",
      sales: 100,
      reputation: "high",
    },
    shipping: {
      free: true,
      estimatedDays: 3,
    },
    brand: "Test Brand",
    category: "Electronics",
    subcategory: "Phones",
  };

  const mockProduct2: Product = {
    id: "2",
    title: "Product 2",
    price: { amount: 200, currency: "ARS" },
    images: ["image2.jpg"],
    rating: 4.0,
    stock: 5,
    seller: {
      id: "seller2",
      name: "Test Seller 2",
      sales: 50,
      reputation: "medium",
    },
    shipping: {
      free: false,
      estimatedDays: 5,
    },
    brand: "Test Brand 2",
    category: "Electronics",
    subcategory: "Laptops",
  };

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it("should initialize with empty products and loading state", async () => {
    const { result } = renderHook(() => useCompare());

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.canAddMore).toBe(true);

    // Wait for useEffect to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should load products from localStorage on mount", () => {
    const storedProducts = [mockProduct1, mockProduct2];
    localStorageMock.setItem("meli_compare", JSON.stringify(storedProducts));

    const { result } = renderHook(() => useCompare());

    expect(result.current.products).toEqual(storedProducts);
    expect(result.current.isLoading).toBe(false);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("meli_compare");
  });

  it("should handle localStorage parsing error", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    localStorageMock.setItem("meli_compare", "invalid json");

    const { result } = renderHook(() => useCompare());

    expect(result.current.error).toBe("Error al cargar productos para comparar");
    expect(result.current.products).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should add product to compare", async () => {
    const { result } = renderHook(() => useCompare());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToCompare(mockProduct1);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0]).toEqual(mockProduct1);
    expect(result.current.canAddMore).toBe(true);
  });

  it("should not add duplicate product", async () => {
    const { result } = renderHook(() => useCompare());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToCompare(mockProduct1);
      result.current.addToCompare(mockProduct1);
    });

    expect(result.current.products).toHaveLength(1);
  });

  it("should not add product when max limit reached", async () => {
    const { result } = renderHook(() => useCompare());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Add products up to the limit
    const products = Array.from({ length: MAX_COMPARE_PRODUCTS }, (_, i) => ({
      ...mockProduct1,
      id: `product-${i}`,
    }));

    act(() => {
      products.forEach((product) => {
        result.current.addToCompare(product);
      });
    });

    expect(result.current.products).toHaveLength(MAX_COMPARE_PRODUCTS);
    expect(result.current.canAddMore).toBe(false);

    // Try to add one more
    act(() => {
      result.current.addToCompare(mockProduct2);
    });

    expect(result.current.products).toHaveLength(MAX_COMPARE_PRODUCTS);
    expect(result.current.error).toBe(`Solo puedes comparar hasta ${MAX_COMPARE_PRODUCTS} productos`);
  });

  it("should remove product from compare", async () => {
    const { result } = renderHook(() => useCompare());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToCompare(mockProduct1);
      result.current.addToCompare(mockProduct2);
    });

    expect(result.current.products).toHaveLength(2);

    act(() => {
      result.current.removeFromCompare("1");
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].id).toBe("2");
  });

  it("should clear error when removing product", async () => {
    const { result } = renderHook(() => useCompare());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Fill up to max and set error
    const products = Array.from({ length: MAX_COMPARE_PRODUCTS }, (_, i) => ({
      ...mockProduct1,
      id: `product-${i}`,
    }));

    act(() => {
      products.forEach((product) => {
        result.current.addToCompare(product);
      });
    });

    // Now try to add one more to trigger the error
    act(() => {
      result.current.addToCompare(mockProduct2);
    });

    expect(result.current.error).toBe(`Solo puedes comparar hasta ${MAX_COMPARE_PRODUCTS} productos`);

    act(() => {
      result.current.removeFromCompare("product-0");
    });

    expect(result.current.error).toBeNull();
  });

  it("should clear all products", async () => {
    const { result } = renderHook(() => useCompare());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToCompare(mockProduct1);
      result.current.addToCompare(mockProduct2);
    });

    expect(result.current.products).toHaveLength(2);

    act(() => {
      result.current.clearCompare();
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("should check if product is in compare", async () => {
    const { result } = renderHook(() => useCompare());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToCompare(mockProduct1);
    });

    expect(result.current.isInCompare("1")).toBe(true);
    expect(result.current.isInCompare("2")).toBe(false);
  });

  it("should save to localStorage when products change", async () => {
    const { result } = renderHook(() => useCompare());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToCompare(mockProduct1);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith("meli_compare", JSON.stringify([mockProduct1]));
  });

  it("should handle localStorage save error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error("Storage quota exceeded");
    });

    const { result } = renderHook(() => useCompare());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToCompare(mockProduct1);
    });

    expect(result.current.error).toBe("Error al guardar productos para comparar");
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
