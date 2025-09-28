import { renderHook, act } from "@testing-library/react";
import { useCompare } from "../useCompare";
import { Product } from "@/types/product";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockProduct: Product = {
  id: "1",
  title: "Test Product",
  description: "Test Description",
  price: { amount: 1000, currency: "ARS" },
  images: ["/test.jpg"],
  seller: {
    id: "seller1",
    name: "Test Seller",
    reputation: 4.5,
    sales: 100,
    location: "Test Location",
  },
  condition: "new",
  stock: 10,
  shipping: { free: true, estimatedDays: "1-2 días" },
  paymentMethods: ["Credit Card"],
  rating: { average: 4.0, totalReviews: 10 },
  specifications: {},
  variants: { color: [], storage: [] },
  keyFeatures: [],
  breadcrumbs: [],
  category: "Test",
  subcategory: "Test",
  brand: "Test",
  model: "Test",
};

describe("useCompare", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockClear();
  });

  it("should initialize with empty compare list", () => {
    const { result } = renderHook(() => useCompare());

    expect(result.current.products).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.canAddMore).toBe(true);
  });

  it("should add product to compare", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addToCompare(mockProduct);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].id).toBe("1");
    expect(result.current.isInCompare("1")).toBe(true);
  });

  it("should not add duplicate products", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addToCompare(mockProduct);
      result.current.addToCompare(mockProduct);
    });

    expect(result.current.products).toHaveLength(1);
  });

  it("should remove product from compare", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addToCompare(mockProduct);
      result.current.removeFromCompare("1");
    });

    expect(result.current.products).toHaveLength(0);
    expect(result.current.isInCompare("1")).toBe(false);
  });

  it("should clear all products", () => {
    const { result } = renderHook(() => useCompare());

    act(() => {
      result.current.addToCompare(mockProduct);
      result.current.clearCompare();
    });

    expect(result.current.products).toHaveLength(0);
  });

  it("should respect maximum compare limit", () => {
    const { result } = renderHook(() => useCompare());

    // Add 3 products (max limit)
    act(() => {
      result.current.addToCompare({ ...mockProduct, id: "1" });
      result.current.addToCompare({ ...mockProduct, id: "2" });
      result.current.addToCompare({ ...mockProduct, id: "3" });
    });

    expect(result.current.products).toHaveLength(3);
    expect(result.current.canAddMore).toBe(false);

    // Try to add a 4th product
    act(() => {
      result.current.addToCompare({ ...mockProduct, id: "4" });
    });

    expect(result.current.products).toHaveLength(3);
    expect(result.current.error).toBe("Solo puedes comparar hasta 3 productos");
  });
});
