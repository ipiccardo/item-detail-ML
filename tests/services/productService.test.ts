import { ProductService } from "../../src/services/productService";
import { Product } from "../../src/types/product";

// Mock fetch
global.fetch = jest.fn();

describe("ProductService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProduct", () => {
    it("should fetch a product successfully", async () => {
      const mockProduct: Product = {
        id: "1",
        title: "Test Product",
        description: "Test product description",
        price: { amount: 100, currency: "ARS" },
        images: ["image1.jpg"],
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

      const mockResponse = {
        success: true,
        data: mockProduct,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await ProductService.getProduct("1");

      expect(fetch).toHaveBeenCalledWith("/api/products/1");
      expect(result).toEqual(mockResponse);
    });

    it("should handle fetch error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const result = await ProductService.getProduct("1");

      expect(result).toEqual({
        success: false,
        error: "Error de conexión al obtener el producto",
      });
    });

    it("should handle API error response", async () => {
      const mockErrorResponse = {
        success: false,
        error: "Product not found",
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      });

      const result = await ProductService.getProduct("999");

      expect(result).toEqual(mockErrorResponse);
    });
  });

  describe("getProducts", () => {
    it("should fetch products without filters", async () => {
      const mockProducts: Product[] = [
        {
          id: "1",
          title: "Product 1",
          description: "Test product 1 description",
          price: { amount: 100, currency: "ARS" },
          images: ["image1.jpg"],
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
          model: "Test Model 1",
          specifications: {},
        },
      ];

      const mockResponse = {
        success: true,
        data: mockProducts,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await ProductService.getProducts();

      expect(fetch).toHaveBeenCalledWith("/api/products");
      expect(result).toEqual(mockResponse);
    });

    it("should fetch products with filters", async () => {
      const filters = {
        category: "Electronics",
        brand: "Samsung",
        minPrice: "100",
        maxPrice: "1000",
      };

      const mockResponse = {
        success: true,
        data: [],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await ProductService.getProducts(filters);

      expect(fetch).toHaveBeenCalledWith("/api/products?category=Electronics&brand=Samsung&minPrice=100&maxPrice=1000");
      expect(result).toEqual(mockResponse);
    });

    it("should handle fetch error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      const result = await ProductService.getProducts();

      expect(result).toEqual({
        success: false,
        error: "Error de conexión al obtener los productos",
      });
    });

    it("should handle empty filters", async () => {
      const mockResponse = {
        success: true,
        data: [],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await ProductService.getProducts({});

      expect(fetch).toHaveBeenCalledWith("/api/products");
      expect(result).toEqual(mockResponse);
    });
  });
});
