import { ProductService } from "../productService";
import { Product } from "@/types/product";

// Mock fetch
global.fetch = jest.fn();

describe("ProductService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProduct", () => {
    it("should return product data when API call succeeds", async () => {
      const mockProduct: Product = {
        id: "1",
        title: "Test Product",
        description: "Test Description",
        price: { amount: 1000, currency: "ARS" },
        images: ["image1.jpg"],
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
        category: "Test Category",
        brand: "Test Brand",
        model: "Test Model",
      };

      const mockResponse = {
        success: true,
        data: mockProduct,
      };

      (fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await ProductService.getProduct("1");

      expect(fetch).toHaveBeenCalledWith("/api/products/1");
      expect(result).toEqual(mockResponse);
    });

    it("should return error when API call fails", async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      const result = await ProductService.getProduct("1");

      expect(result).toEqual({
        success: false,
        error: "Error de conexión al obtener el producto",
      });
    });
  });

  describe("getProducts", () => {
    it("should return products data when API call succeeds", async () => {
      const mockProducts: Product[] = [
        {
          id: "1",
          title: "Test Product 1",
          description: "Test Description 1",
          price: { amount: 1000, currency: "ARS" },
          images: ["image1.jpg"],
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
          category: "Test Category",
          brand: "Test Brand",
          model: "Test Model",
        },
      ];

      const mockResponse = {
        success: true,
        data: mockProducts,
      };

      (fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const result = await ProductService.getProducts();

      expect(fetch).toHaveBeenCalledWith("/api/products");
      expect(result).toEqual(mockResponse);
    });

    it("should include filters in URL when provided", async () => {
      const filters = { category: "electronics", brand: "samsung" };
      const mockResponse = { success: true, data: [] };

      (fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      await ProductService.getProducts(filters);

      expect(fetch).toHaveBeenCalledWith("/api/products?category=electronics&brand=samsung");
    });

    it("should return error when API call fails", async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

      const result = await ProductService.getProducts();

      expect(result).toEqual({
        success: false,
        error: "Error de conexión al obtener los productos",
      });
    });
  });
});
