import { renderHook, act } from "@testing-library/react";
import { useVariants } from "../useVariants";
import { Product } from "@/types/product";

const mockProduct: Product = {
  id: "1",
  title: "Test Product",
  description: "Test Description",
  price: { amount: 1000, currency: "ARS" },
  images: ["image1.jpg", "image2.jpg"],
  seller: {
    id: "1",
    name: "Test Seller",
    reputation: 4.5,
    sales: 100,
    location: "Test Location",
  },
  condition: "new",
  stock: 10,
  shipping: { free: true, estimatedDays: "1-2 días" },
  paymentMethods: ["Credit Card"],
  rating: { average: 4.5, totalReviews: 100 },
  specifications: {},
  variants: {
    color: [
      { name: "Red", value: "red", available: true, image: "red.jpg" },
      { name: "Blue", value: "blue", available: true, image: "blue.jpg" },
      { name: "Green", value: "green", available: false },
    ],
    storage: [
      { name: "128GB", value: "128gb", available: true, priceModifier: -100 },
      { name: "256GB", value: "256gb", available: true, priceModifier: 0 },
      { name: "512GB", value: "512gb", available: true, priceModifier: 200 },
    ],
  },
  category: "Test Category",
  brand: "Test Brand",
  model: "Test Model",
};

describe("useVariants", () => {
  it("should initialize with first available variants", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    expect(result.current.selectedVariants.color).toBe("red");
    expect(result.current.selectedVariants.storage).toBe("128gb");
  });

  it("should select color variant", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectColor("blue");
    });

    expect(result.current.selectedVariants.color).toBe("blue");
  });

  it("should select storage variant", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectStorage("256gb");
    });

    expect(result.current.selectedVariants.storage).toBe("256gb");
  });

  it("should get selected color", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectColor("blue");
    });

    const selectedColor = result.current.getSelectedColor();
    expect(selectedColor).toEqual({
      name: "Blue",
      value: "blue",
      available: true,
      image: "blue.jpg",
    });
  });

  it("should get selected storage", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectStorage("512gb");
    });

    const selectedStorage = result.current.getSelectedStorage();
    expect(selectedStorage).toEqual({
      name: "512GB",
      value: "512gb",
      available: true,
      priceModifier: 200,
    });
  });

  it("should calculate current price with storage modifier", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectStorage("512gb");
    });

    const currentPrice = result.current.getCurrentPrice();
    expect(currentPrice).toBe(1200); // 1000 + 200
  });

  it("should get current image from selected color", () => {
    const { result } = renderHook(() => useVariants(mockProduct));

    act(() => {
      result.current.selectColor("blue");
    });

    const currentImage = result.current.getCurrentImage();
    expect(currentImage).toBe("blue.jpg");
  });

  it("should return first image if no color image", () => {
    const productWithoutColorImages = {
      ...mockProduct,
      variants: {
        color: [{ name: "Red", value: "red", available: true }],
      },
    };

    const { result } = renderHook(() => useVariants(productWithoutColorImages));

    const currentImage = result.current.getCurrentImage();
    expect(currentImage).toBe("image1.jpg");
  });

  it("should handle product without variants", () => {
    const productWithoutVariants = {
      ...mockProduct,
      variants: undefined,
    };

    const { result } = renderHook(() => useVariants(productWithoutVariants));

    expect(result.current.selectedVariants.color).toBeUndefined();
    expect(result.current.selectedVariants.storage).toBeUndefined();
    expect(result.current.getSelectedColor()).toBeUndefined();
    expect(result.current.getSelectedStorage()).toBeUndefined();
    expect(result.current.getCurrentPrice()).toBe(1000);
    expect(result.current.getCurrentImage()).toBe("image1.jpg");
  });
});
