import { RelatedProductsService } from "../relatedProductsService";

// Mock fetch globally
global.fetch = jest.fn();

// Mock the products data
const mockProducts = [
  {
    id: "MLA50303499",
    title: "Samsung Galaxy A55 5G",
    category: "Celulares y Teléfonos",
    brand: "Samsung",
    price: { amount: 439000, currency: "ARS" },
    images: ["/1.png"],
    seller: { name: "Test Seller", reputation: 4.5 },
    condition: "new",
    stock: 10,
    shipping: { free: true, estimatedDays: "1-2 días" },
    paymentMethods: ["Tarjeta de crédito"],
    rating: { average: 4.3, totalReviews: 43 },
    specifications: { RAM: "8 GB" },
  },
  {
    id: "MLA50303500",
    title: "Samsung Galaxy M55 5G",
    category: "Celulares y Teléfonos",
    brand: "Samsung",
    price: { amount: 421000, currency: "ARS" },
    images: ["/2.png"],
    seller: { name: "Test Seller 2", reputation: 4.2 },
    condition: "new",
    stock: 8,
    shipping: { free: true, estimatedDays: "1-2 días" },
    paymentMethods: ["Tarjeta de crédito"],
    rating: { average: 4.2, totalReviews: 156 },
    specifications: { RAM: "8 GB" },
  },
  {
    id: "MLA50303501",
    title: "Motorola Edge 50 Fusion",
    category: "Celulares y Teléfonos",
    brand: "Motorola",
    price: { amount: 419000, currency: "ARS" },
    images: ["/3.png"],
    seller: { name: "Test Seller 3", reputation: 4.5 },
    condition: "new",
    stock: 12,
    shipping: { free: true, estimatedDays: "2-3 días" },
    paymentMethods: ["Tarjeta de crédito"],
    rating: { average: 4.1, totalReviews: 89 },
    specifications: { RAM: "8 GB" },
  },
];

describe("RelatedProductsService", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe("getRelatedProducts", () => {
    it("should return related products excluding the current product", async () => {
      // Mock fetch response
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          success: true,
          data: mockProducts,
        }),
      });

      const currentProductId = "MLA50303499";
      const relatedProducts = await RelatedProductsService.getRelatedProducts(currentProductId);

      expect(relatedProducts).toHaveLength(2);
      expect(relatedProducts.every((product) => product.id !== currentProductId)).toBe(true);
    });

    it("should return products from the same category first", async () => {
      // Mock fetch response
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          success: true,
          data: mockProducts,
        }),
      });

      const currentProductId = "MLA50303499";
      const relatedProducts = await RelatedProductsService.getRelatedProducts(currentProductId);

      // All products should be from the same category
      expect(relatedProducts.every((product) => product.category === "Celulares y Teléfonos")).toBe(true);
    });

    it("should limit the number of returned products", async () => {
      // Mock fetch response
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          success: true,
          data: mockProducts,
        }),
      });

      const currentProductId = "MLA50303499";
      const limit = 1;
      const relatedProducts = await RelatedProductsService.getRelatedProducts(currentProductId, limit);

      expect(relatedProducts).toHaveLength(1);
    });

    it("should return empty array when no related products found", async () => {
      // Mock fetch response with single product
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          success: true,
          data: [mockProducts[0]], // Only the current product
        }),
      });

      const relatedProducts = await RelatedProductsService.getRelatedProducts("MLA50303499");

      expect(relatedProducts).toHaveLength(0);
    });

    it("should handle non-existent product ID gracefully", async () => {
      // Mock fetch response
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          success: true,
          data: mockProducts,
        }),
      });

      const relatedProducts = await RelatedProductsService.getRelatedProducts("NONEXISTENT");

      expect(relatedProducts).toHaveLength(0); // Should return empty array when product not found
    });

    it("should handle API error gracefully", async () => {
      // Mock fetch to reject
      (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      const relatedProducts = await RelatedProductsService.getRelatedProducts("MLA50303499");

      expect(relatedProducts).toHaveLength(0);
    });

    it("should handle unsuccessful API response", async () => {
      // Mock fetch response with unsuccessful result
      (global.fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          success: false,
          error: "API error",
        }),
      });

      const relatedProducts = await RelatedProductsService.getRelatedProducts("MLA50303499");

      expect(relatedProducts).toHaveLength(0);
    });
  });
});
