import { RelatedProductsService } from "../../src/services/relatedProductsService";
import { Product } from "../../src/types/product";

// Mock fetch
global.fetch = jest.fn();

describe("RelatedProductsService", () => {
  const mockProducts: Product[] = [
    {
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
    },
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
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    RelatedProductsService.clearCache();
  });

  describe("getRelatedProducts", () => {
    it("should return related products with same brand prioritized", async () => {
      const mockResponse = {
        success: true,
        data: mockProducts,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await RelatedProductsService.getRelatedProducts("1", 3);

      expect(fetch).toHaveBeenCalledWith("/api/products");
      expect(result).toHaveLength(3);
      // Should prioritize same brand (Apple) and same category (Electronics)
      expect(result[0].brand).toBe("Apple");
      expect(result[0].id).toBe("2"); // iPhone 14 (same brand, same category)
      expect(result[1].brand).toBe("Apple");
      expect(result[1].id).toBe("4"); // MacBook Pro (same brand, different subcategory)
    });

    it("should return products with same category when no same brand", async () => {
      const mockResponse = {
        success: true,
        data: mockProducts,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await RelatedProductsService.getRelatedProducts("3", 2);

      expect(result).toHaveLength(2);
      // Should return other Electronics products
      expect(result.every((p) => p.category === "Electronics")).toBe(true);
      expect(result.every((p) => p.id !== "3")).toBe(true);
    });

    it("should respect the limit parameter", async () => {
      const mockResponse = {
        success: true,
        data: mockProducts,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await RelatedProductsService.getRelatedProducts("1", 1);

      expect(result).toHaveLength(1);
    });

    it("should use default limit of 4", async () => {
      const mockResponse = {
        success: true,
        data: mockProducts,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await RelatedProductsService.getRelatedProducts("1");

      expect(result).toHaveLength(4);
    });

    it("should return empty array when current product not found", async () => {
      const mockResponse = {
        success: true,
        data: mockProducts,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await RelatedProductsService.getRelatedProducts("999");

      expect(result).toEqual([]);
    });

    it("should return empty array when API response is not successful", async () => {
      const mockResponse = {
        success: false,
        error: "API Error",
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await RelatedProductsService.getRelatedProducts("1");

      expect(result).toEqual([]);
    });

    it("should handle fetch error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await RelatedProductsService.getRelatedProducts("1");

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith("Error fetching related products:", expect.any(Error));

      consoleSpy.mockRestore();
    });

    it("should filter out current product from results", async () => {
      const mockResponse = {
        success: true,
        data: mockProducts,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await RelatedProductsService.getRelatedProducts("1");

      expect(result.every((p) => p.id !== "1")).toBe(true);
    });

    it("should handle empty products array", async () => {
      const mockResponse = {
        success: true,
        data: [],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await RelatedProductsService.getRelatedProducts("1");

      expect(result).toEqual([]);
    });
  });
});
