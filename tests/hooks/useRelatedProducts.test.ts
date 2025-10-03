/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { renderHook } from "@testing-library/react";
import { useRelatedProducts } from "../../src/hooks/useRelatedProducts";
import { Product } from "../../src/types/product";

describe("useRelatedProducts", () => {
  const mockCurrentProduct: Product = {
    id: "1",
    title: "iPhone 15",
    description: "Latest iPhone model",
    price: { amount: 1000, currency: "ARS" },
    images: ["iphone15.jpg"],
    rating: { average: 4.8, totalReviews: 150 },
    stock: 5,
    seller: {
      id: "seller1",
      name: "Apple Store",
      sales: 1000,
      reputation: 4.9,
      location: "Buenos Aires",
    },
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: "2",
    },
    paymentMethods: ["credit", "debit"],
    brand: "Apple",
    category: "Electronics",
    subcategory: "Phones",
    model: "iPhone 15",
    specifications: {},
  };

  const mockAllProducts: Product[] = [
    mockCurrentProduct,
    {
      id: "2",
      title: "iPhone 14",
      description: "Previous iPhone model",
      price: { amount: 800, currency: "ARS" },
      images: ["iphone14.jpg"],
      rating: { average: 4.6, totalReviews: 120 },
      stock: 10,
      seller: {
        id: "seller1",
        name: "Apple Store",
        sales: 1000,
        reputation: 4.9,
        location: "Buenos Aires",
      },
      condition: "new",
      shipping: {
        free: true,
        estimatedDays: "2",
      },
      paymentMethods: ["credit", "debit"],
      brand: "Apple",
      category: "Electronics",
      subcategory: "Phones",
      model: "iPhone 14",
      specifications: {},
    },
    {
      id: "3",
      title: "Samsung Galaxy S24",
      description: "Latest Samsung Galaxy model",
      price: { amount: 900, currency: "ARS" },
      images: ["galaxy.jpg"],
      rating: { average: 4.7, totalReviews: 100 },
      stock: 8,
      seller: {
        id: "seller2",
        name: "Samsung Store",
        sales: 800,
        reputation: 4.8,
        location: "Buenos Aires",
      },
      condition: "new",
      shipping: {
        free: true,
        estimatedDays: "3",
      },
      paymentMethods: ["credit", "debit"],
      brand: "Samsung",
      category: "Electronics",
      subcategory: "Phones",
      model: "Galaxy S24",
      specifications: {},
    },
    {
      id: "4",
      title: "MacBook Pro",
      description: "Latest MacBook Pro model",
      price: { amount: 2000, currency: "ARS" },
      images: ["macbook.jpg"],
      rating: { average: 4.9, totalReviews: 80 },
      stock: 3,
      seller: {
        id: "seller1",
        name: "Apple Store",
        sales: 1000,
        reputation: 4.9,
        location: "Buenos Aires",
      },
      condition: "new",
      shipping: {
        free: true,
        estimatedDays: "2",
      },
      paymentMethods: ["credit", "debit"],
      brand: "Apple",
      category: "Electronics",
      subcategory: "Laptops",
      model: "MacBook Pro",
      specifications: {},
    },
    {
      id: "5",
      title: "AirPods Pro",
      description: "Latest AirPods Pro model",
      price: { amount: 300, currency: "ARS" },
      images: ["airpods.jpg"],
      rating: { average: 4.5, totalReviews: 200 },
      stock: 15,
      seller: {
        id: "seller1",
        name: "Apple Store",
        sales: 1000,
        reputation: 4.9,
        location: "Buenos Aires",
      },
      condition: "new",
      shipping: {
        free: true,
        estimatedDays: "2",
      },
      paymentMethods: ["credit", "debit"],
      brand: "Apple",
      category: "Electronics",
      subcategory: "Audio",
      model: "AirPods Pro",
      specifications: {},
    },
    {
      id: "6",
      title: "Nike Shoes",
      description: "Latest Nike shoes model",
      price: { amount: 150, currency: "ARS" },
      images: ["shoes.jpg"],
      rating: { average: 4.2, totalReviews: 50 },
      stock: 20,
      seller: {
        id: "seller3",
        name: "Nike Store",
        sales: 500,
        reputation: 4.3,
        location: "Buenos Aires",
      },
      condition: "new",
      shipping: {
        free: false,
        estimatedDays: "5",
      },
      paymentMethods: ["credit", "debit"],
      brand: "Nike",
      category: "Sports",
      subcategory: "Footwear",
      model: "Nike Shoes",
      specifications: {},
    },
  ];

  it("should filter out current product", () => {
    const { result } = renderHook(() =>
      useRelatedProducts({
        currentProduct: mockCurrentProduct,
        allProducts: mockAllProducts,
        limit: 10,
      }),
    );

    expect(result.current).toHaveLength(4);
    expect(result.current.every((product) => product.id !== "1")).toBe(true);
  });

  it("should prioritize products with same brand", () => {
    const { result } = renderHook(() =>
      useRelatedProducts({
        currentProduct: mockCurrentProduct,
        allProducts: mockAllProducts,
        limit: 3,
      }),
    );

    expect(result.current).toHaveLength(3);
    // First products should be Apple brand (same as current product)
    expect(result.current[0].brand).toBe("Apple");
    expect(result.current[1].brand).toBe("Apple");
    expect(result.current[2].brand).toBe("Apple");
  });

  it("should include products with same category when no same brand", () => {
    const samsungProduct = mockAllProducts.find((p) => p.id === "3")!;

    const { result } = renderHook(() =>
      useRelatedProducts({
        currentProduct: samsungProduct,
        allProducts: mockAllProducts,
        limit: 5,
      }),
    );

    // Should include other Electronics products
    expect(result.current.every((product) => product.category === "Electronics")).toBe(true);
    expect(result.current.some((product) => product.brand === "Apple")).toBe(true);
  });

  it("should respect the limit parameter", () => {
    const { result } = renderHook(() =>
      useRelatedProducts({
        currentProduct: mockCurrentProduct,
        allProducts: mockAllProducts,
        limit: 2,
      }),
    );

    expect(result.current).toHaveLength(2);
  });

  it("should use default limit of 4", () => {
    const { result } = renderHook(() =>
      useRelatedProducts({
        currentProduct: mockCurrentProduct,
        allProducts: mockAllProducts,
      }),
    );

    expect(result.current).toHaveLength(4);
  });

  it("should sort by brand priority, then category priority", () => {
    const { result } = renderHook(() =>
      useRelatedProducts({
        currentProduct: mockCurrentProduct,
        allProducts: mockAllProducts,
        limit: 4,
      }),
    );

    // First should be same brand, same category (iPhone 14)
    expect(result.current[0].id).toBe("2");
    expect(result.current[0].brand).toBe("Apple");
    expect(result.current[0].subcategory).toBe("Phones");

    // Second should be same brand, different category (MacBook Pro)
    expect(result.current[1].id).toBe("4");
    expect(result.current[1].brand).toBe("Apple");
    expect(result.current[1].subcategory).toBe("Laptops");

    // Third should be same brand, different category (AirPods)
    expect(result.current[2].id).toBe("5");
    expect(result.current[2].brand).toBe("Apple");
    expect(result.current[2].subcategory).toBe("Audio");

    // Fourth should be different brand, same category (Samsung Galaxy)
    expect(result.current[3].id).toBe("3");
    expect(result.current[3].brand).toBe("Samsung");
    expect(result.current[3].subcategory).toBe("Phones");
  });

  it("should return empty array when no related products", () => {
    const { result } = renderHook(() =>
      useRelatedProducts({
        currentProduct: mockCurrentProduct,
        allProducts: [mockCurrentProduct], // Only current product
        limit: 4,
      }),
    );

    expect(result.current).toEqual([]);
  });

  it("should handle empty allProducts array", () => {
    const { result } = renderHook(() =>
      useRelatedProducts({
        currentProduct: mockCurrentProduct,
        allProducts: [],
        limit: 4,
      }),
    );

    expect(result.current).toEqual([]);
  });

  it("should handle limit larger than available products", () => {
    const { result } = renderHook(() =>
      useRelatedProducts({
        currentProduct: mockCurrentProduct,
        allProducts: mockAllProducts,
        limit: 100,
      }),
    );

    expect(result.current).toHaveLength(4); // All available related products
  });

  it("should memoize results correctly", () => {
    const { result, rerender } = renderHook(
      ({ currentProduct, allProducts, limit }) => useRelatedProducts({ currentProduct, allProducts, limit }),
      {
        initialProps: {
          currentProduct: mockCurrentProduct,
          allProducts: mockAllProducts,
          limit: 4,
        },
      },
    );

    const firstResult = result.current;

    // Rerender with same props
    rerender({
      currentProduct: mockCurrentProduct,
      allProducts: mockAllProducts,
      limit: 4,
    });

    // Should return same reference (memoized)
    expect(result.current).toBe(firstResult);

    // Rerender with different limit
    rerender({
      currentProduct: mockCurrentProduct,
      allProducts: mockAllProducts,
      limit: 2,
    });

    // Should return different reference
    expect(result.current).not.toBe(firstResult);
    expect(result.current).toHaveLength(2);
  });
});
