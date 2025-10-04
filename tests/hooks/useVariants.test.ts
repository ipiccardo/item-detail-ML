import { renderHook, act } from "@testing-library/react";
import { useVariants } from "../../src/hooks/useVariants";
import { Product } from "../../src/types/product";

const mockProduct: Product = {
  id: "1",
  title: "Test Product",
  description: "Test description",
  condition: "new",
  rating: { average: 4.5, totalReviews: 10 },
  price: { amount: 1000, currency: "ARS" },
  seller: { id: "seller1", name: "Test Seller", reputation: 4.5, sales: 100, location: "Buenos Aires" },
  stock: 10,
  shipping: { free: true, estimatedDays: "1-2 días" },
  paymentMethods: ["credit", "debit"],
  images: ["/image1.jpg", "/image2.jpg"],
  specifications: {},
  variants: {
    color: [
      { name: "Black", value: "black", available: true },
      { name: "White", value: "white", available: true },
    ],
    storage: [
      { name: "128GB", value: "128gb", available: true, priceModifier: -50000 },
      { name: "256GB", value: "256gb", available: true, priceModifier: 0 },
    ],
  },
  keyFeatures: [],
  breadcrumbs: [],
  category: "Electronics",
  brand: "Test Brand",
  model: "Test Model",
};

describe("useVariants", () => {
  it("should initialize with first variant options", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    expect(result.current.selectedVariants).toEqual({
      color: "black",
      storage: "128gb",
    });
  });

  it("should select color variant", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectColor("white");
    });

    expect(result.current.selectedVariants).toEqual({
      color: "white",
      storage: "128gb",
    });
  });

  it("should select storage variant", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectStorage("256gb");
    });

    expect(result.current.selectedVariants).toEqual({
      color: "black",
      storage: "256gb",
    });
  });

  it("should select both variants", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectColor("white");
      result.current.selectStorage("256gb");
    });

    expect(result.current.selectedVariants).toEqual({
      color: "white",
      storage: "256gb",
    });
  });

  it("should get current price", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    const price = result.current.getCurrentPrice();
    // El precio inicial es 1000 + (-50000) = -49000 porque se selecciona 128GB por defecto
    expect(price).toBe(-49000);
  });

  it("should get current price with storage modifier", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectStorage("128gb");
    });

    const price = result.current.getCurrentPrice();
    expect(price).toBe(-49000); // 1000 + (-50000) = -49000
  });

  it("should get base price when selecting storage without modifier", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectStorage("256gb");
    });

    const price = result.current.getCurrentPrice();
    expect(price).toBe(1000); // 1000 + 0 = 1000
  });

  it("should get current image", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    const image = result.current.getCurrentImage();
    expect(image).toBe("/image1.jpg");
  });

  it("should handle product without variants", () => {
    const productWithoutVariants = { ...mockProduct, variants: undefined };
    const { result } = renderHook(() => useVariants(productWithoutVariants));

    expect(result.current.selectedVariants).toEqual({
      color: undefined,
      storage: undefined,
    });
  });

  it("should handle product with only color variant", () => {
    const productWithColorOnly = {
      ...mockProduct,
      variants: { color: mockProduct.variants?.color },
    };
    const { result } = renderHook(() => useVariants(productWithColorOnly));

    expect(result.current.selectedVariants).toEqual({
      color: "black",
      storage: undefined,
    });
  });

  it("should handle product with only storage variant", () => {
    const productWithStorageOnly = {
      ...mockProduct,
      variants: { storage: mockProduct.variants?.storage },
    };
    const { result } = renderHook(() => useVariants(productWithStorageOnly));

    expect(result.current.selectedVariants).toEqual({
      color: undefined,
      storage: "128gb",
    });
  });

  it("should handle invalid color selection", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectColor("invalid-color");
    });

    expect(result.current.selectedVariants).toEqual({
      color: "invalid-color",
      storage: "128gb",
    });
  });

  it("should handle invalid storage selection", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectStorage("invalid-storage");
    });

    expect(result.current.selectedVariants).toEqual({
      color: "black",
      storage: "invalid-storage",
    });
  });

  it("should maintain state across re-renders", () => {
    const { result, rerender } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectColor("white");
    });

    expect(result.current.selectedVariants.color).toBe("white");

    rerender();

    expect(result.current.selectedVariants.color).toBe("white");
  });

  it("should handle product with different variant types", () => {
    const productWithDifferentVariants = {
      ...mockProduct,
      variants: {
        color: [
          { name: "Small", value: "small", available: true },
          { name: "Large", value: "large", available: true },
        ],
      },
    };
    const { result } = renderHook(() => useVariants(productWithDifferentVariants));

    expect(result.current.selectedVariants).toEqual({
      color: "small",
      storage: undefined,
    });
  });

  it("should handle product with no images", () => {
    const productWithoutImages = { ...mockProduct, images: [] };
    const { result } = renderHook(() => useVariants(productWithoutImages));

    const image = result.current.getCurrentImage();
    expect(image).toBe("");
  });

  it("should handle product with single image", () => {
    const productWithSingleImage = { ...mockProduct, images: ["/single-image.jpg"] };
    const { result } = renderHook(() => useVariants(productWithSingleImage));

    const image = result.current.getCurrentImage();
    expect(image).toBe("/single-image.jpg");
  });
});
