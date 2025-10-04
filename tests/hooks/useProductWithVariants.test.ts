import { renderHook } from "@testing-library/react";
import { useProductWithVariants } from "../../src/hooks/useProductWithVariants";
import { Product } from "../../src/types/product";
import { UseVariantsReturn } from "../../src/hooks/useVariants";

describe("useProductWithVariants", () => {
  const mockProduct: Product = {
    id: "1",
    title: "Test Product",
    description: "Test product description",
    price: { amount: 1000, currency: "ARS" },
    images: ["image1.jpg", "image2.jpg"],
    rating: { average: 4.5, totalReviews: 50 },
    stock: 10,
    seller: {
      id: "seller1",
      name: "Test Seller",
      sales: 100,
      reputation: 4.8,
      location: "Buenos Aires",
    },
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: "3",
    },
    paymentMethods: ["credit", "debit"],
    brand: "Test Brand",
    category: "Electronics",
    subcategory: "Phones",
    model: "Test Model",
    specifications: {},
  };

  const createMockVariants = (overrides: Partial<UseVariantsReturn> = {}): UseVariantsReturn => ({
    selectedVariants: { color: "red", storage: "256gb" },
    selectColor: jest.fn(),
    selectStorage: jest.fn(),
    getSelectedColor: jest.fn(),
    getSelectedStorage: jest.fn(),
    getCurrentPrice: jest.fn().mockReturnValue(1200),
    getCurrentImage: jest.fn().mockReturnValue("variant-image.jpg"),
    ...overrides,
  });

  it("should return updated product with current price and images", () => {
    const mockGetCurrentPrice = jest.fn().mockReturnValue(1200);
    const mockGetCurrentImage = jest.fn().mockReturnValue("variant-image.jpg");

    const mockVariants = createMockVariants({
      getCurrentPrice: mockGetCurrentPrice,
      getCurrentImage: mockGetCurrentImage,
    });

    const { result } = renderHook(() => useProductWithVariants({ product: mockProduct, variants: mockVariants }));

    expect(result.current.updatedProduct).toEqual({
      ...mockProduct,
      price: { ...mockProduct.price, amount: 1200 },
      images: ["variant-image.jpg", "image1.jpg", "image2.jpg"],
    });

    expect(mockGetCurrentPrice).toHaveBeenCalled();
    expect(mockGetCurrentImage).toHaveBeenCalled();
  });

  it("should return original product when no variant image is selected", () => {
    const mockGetCurrentPrice = jest.fn().mockReturnValue(1000);
    const mockGetCurrentImage = jest.fn().mockReturnValue(null);

    const mockVariants = createMockVariants({
      getCurrentPrice: mockGetCurrentPrice,
      getCurrentImage: mockGetCurrentImage,
    });

    const { result } = renderHook(() => useProductWithVariants({ product: mockProduct, variants: mockVariants }));

    expect(result.current.updatedProduct).toEqual({
      ...mockProduct,
      price: { ...mockProduct.price, amount: 1000 },
      images: ["image1.jpg", "image2.jpg"],
    });
  });

  it("should handle variant image that already exists in product images", () => {
    const mockGetCurrentPrice = jest.fn().mockReturnValue(1000);
    const mockGetCurrentImage = jest.fn().mockReturnValue("image1.jpg");

    const mockVariants = createMockVariants({
      getCurrentPrice: mockGetCurrentPrice,
      getCurrentImage: mockGetCurrentImage,
    });

    const { result } = renderHook(() => useProductWithVariants({ product: mockProduct, variants: mockVariants }));

    expect(result.current.updatedProduct.images).toEqual(["image1.jpg", "image2.jpg"]);
  });

  it("should memoize the result when dependencies don't change", () => {
    const mockGetCurrentPrice = jest.fn().mockReturnValue(1000);
    const mockGetCurrentImage = jest.fn().mockReturnValue(null);

    const mockVariants = createMockVariants({
      getCurrentPrice: mockGetCurrentPrice,
      getCurrentImage: mockGetCurrentImage,
    });

    const { result, rerender } = renderHook(() =>
      useProductWithVariants({ product: mockProduct, variants: mockVariants })
    );

    const firstResult = result.current.updatedProduct;

    // Rerender with same product and variants
    rerender();

    expect(result.current.updatedProduct).toBe(firstResult);
  });

  it("should update when product changes", () => {
    const mockGetCurrentPrice = jest.fn().mockReturnValue(1000);
    const mockGetCurrentImage = jest.fn().mockReturnValue(null);

    const mockVariants = createMockVariants({
      getCurrentPrice: mockGetCurrentPrice,
      getCurrentImage: mockGetCurrentImage,
    });

    const { result, rerender } = renderHook(
      ({ product }) => useProductWithVariants({ product, variants: mockVariants }),
      {
        initialProps: { product: mockProduct },
      }
    );

    const firstResult = result.current.updatedProduct;

    const newProduct = { ...mockProduct, id: "2", title: "New Product" };
    rerender({ product: newProduct });

    expect(result.current.updatedProduct).not.toBe(firstResult);
    expect(result.current.updatedProduct.id).toBe("2");
    expect(result.current.updatedProduct.title).toBe("New Product");
  });
});
