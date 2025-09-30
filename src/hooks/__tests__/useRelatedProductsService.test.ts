import { renderHook, waitFor, act } from "@testing-library/react";
import { useRelatedProductsService } from "../useRelatedProductsService";
import { RelatedProductsService } from "@/services/relatedProductsService";

// Mock RelatedProductsService
jest.mock("../../services/relatedProductsService", () => ({
  RelatedProductsService: {
    getRelatedProducts: jest.fn(),
  },
}));

const mockRelatedProductsService = RelatedProductsService as jest.Mocked<typeof RelatedProductsService>;

describe("useRelatedProductsService", () => {
  const mockProducts = [
    {
      id: "1",
      title: "Product 1",
      description: "Description 1",
      price: { amount: 1000, currency: "ARS" },
      images: ["image1.jpg"],
      seller: {
        id: "1",
        name: "Seller 1",
        reputation: 4.5,
        sales: 100,
        location: "Location 1",
      },
      condition: "new" as const,
      stock: 10,
      shipping: { free: true, estimatedDays: "1-2 días" },
      paymentMethods: ["Credit Card"],
      rating: { average: 4.5, totalReviews: 100 },
      specifications: {},
      category: "Category 1",
      brand: "Brand 1",
      model: "Model 1",
    },
    {
      id: "2",
      title: "Product 2",
      description: "Description 2",
      price: { amount: 2000, currency: "ARS" },
      images: ["image2.jpg"],
      seller: {
        id: "2",
        name: "Seller 2",
        reputation: 4.3,
        sales: 200,
        location: "Location 2",
      },
      condition: "new" as const,
      stock: 5,
      shipping: { free: true, estimatedDays: "2-3 días" },
      paymentMethods: ["Credit Card"],
      rating: { average: 4.3, totalReviews: 50 },
      specifications: {},
      category: "Category 1",
      brand: "Brand 1",
      model: "Model 2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return loading state initially", () => {
    mockRelatedProductsService.getRelatedProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useRelatedProductsService("1"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.relatedProducts).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it("should return related products when API call succeeds", async () => {
    mockRelatedProductsService.getRelatedProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useRelatedProductsService("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      expect(result.current.relatedProducts).toEqual(mockProducts);
      expect(result.current.error).toBe(null);
    });

    expect(mockRelatedProductsService.getRelatedProducts).toHaveBeenCalledWith("1", 4);
  });

  it("should return error when API call fails", async () => {
    mockRelatedProductsService.getRelatedProducts.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useRelatedProductsService("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      expect(result.current.relatedProducts).toEqual([]);
      expect(result.current.error).toBe("Error al cargar productos relacionados");
    });
  });

  it("should use custom limit", async () => {
    mockRelatedProductsService.getRelatedProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useRelatedProductsService("1", 6));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      expect(mockRelatedProductsService.getRelatedProducts).toHaveBeenCalledWith("1", 6);
    });
  });

  it("should not fetch if productId is empty", () => {
    const { result } = renderHook(() => useRelatedProductsService(""));

    expect(result.current.isLoading).toBe(true);
    expect(mockRelatedProductsService.getRelatedProducts).not.toHaveBeenCalled();
  });
});
