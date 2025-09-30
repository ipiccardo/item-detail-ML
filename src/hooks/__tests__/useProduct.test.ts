import { renderHook, waitFor, act } from "@testing-library/react";
import { useProduct } from "../useProduct";
import { ProductService } from "@/services/productService";

// Mock ProductService
jest.mock("../../services/productService", () => ({
  ProductService: {
    getProduct: jest.fn(),
  },
}));

const mockProductService = ProductService as jest.Mocked<typeof ProductService>;

describe("useProduct", () => {
  const mockProduct = {
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
    condition: "new" as const,
    stock: 10,
    shipping: { free: true, estimatedDays: "1-2 días" },
    paymentMethods: ["Credit Card"],
    rating: { average: 4.5, totalReviews: 100 },
    specifications: {},
    category: "Test Category",
    brand: "Test Brand",
    model: "Test Model",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return loading state initially", () => {
    mockProductService.getProduct.mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    const { result } = renderHook(() => useProduct("1"));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.product).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should return product data when API call succeeds", async () => {
    mockProductService.getProduct.mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    const { result } = renderHook(() => useProduct("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      expect(result.current.product).toEqual(mockProduct);
      expect(result.current.error).toBe(null);
    });

    expect(mockProductService.getProduct).toHaveBeenCalledWith("1");
  });

  it("should return error when API call fails", async () => {
    mockProductService.getProduct.mockResolvedValue({
      success: false,
      error: "Product not found",
    });

    const { result } = renderHook(() => useProduct("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      expect(result.current.product).toBe(null);
      expect(result.current.error).toBe("Product not found");
    });
  });

  it("should return error when API call throws", async () => {
    mockProductService.getProduct.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useProduct("1"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    await act(async () => {
      expect(result.current.product).toBe(null);
      expect(result.current.error).toBe("Error de conexión");
    });
  });

  it("should refetch when productId changes", async () => {
    mockProductService.getProduct.mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    const { result, rerender } = renderHook(({ productId }) => useProduct(productId), {
      initialProps: { productId: "1" },
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockProductService.getProduct).toHaveBeenCalledWith("1");

    await act(async () => {
      rerender({ productId: "2" });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockProductService.getProduct).toHaveBeenCalledWith("2");
  });
});
