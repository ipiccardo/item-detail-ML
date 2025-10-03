import { renderHook, waitFor } from "@testing-library/react";
import { useProduct } from "../../src/hooks/useProduct";
import { ProductService } from "../../src/services/productService";
import { Product } from "../../src/types/product";

// Mock ProductService
jest.mock("../../src/services/productService");
const mockProductService = ProductService as jest.Mocked<typeof ProductService>;

describe("useProduct", () => {
    const mockProduct: Product = {
        id: "1",
        title: "Test Product",
        price: { amount: 100, currency: "ARS" },
        images: ["image1.jpg"],
        rating: 4.5,
        stock: 10,
        seller: {
            id: "seller1",
            name: "Test Seller",
            sales: 100,
            reputation: "high",
        },
        shipping: {
            free: true,
            estimatedDays: 3,
        },
        brand: "Test Brand",
        category: "Electronics",
        subcategory: "Phones",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should initialize with loading state", () => {
        mockProductService.getProduct.mockResolvedValue({
            success: true,
            data: mockProduct,
        });

        const { result } = renderHook(() => useProduct("1"));

        expect(result.current.product).toBeNull();
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();
    });

    it("should fetch product successfully", async () => {
        mockProductService.getProduct.mockResolvedValue({
            success: true,
            data: mockProduct,
        });

        const { result } = renderHook(() => useProduct("1"));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.product).toEqual(mockProduct);
        expect(result.current.error).toBeNull();
        expect(mockProductService.getProduct).toHaveBeenCalledWith("1");
    });

    it("should handle API error response", async () => {
        mockProductService.getProduct.mockResolvedValue({
            success: false,
            error: "Product not found",
        });

        const { result } = renderHook(() => useProduct("999"));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.product).toBeNull();
        expect(result.current.error).toBe("Product not found");
    });

    it("should handle API response without data", async () => {
        mockProductService.getProduct.mockResolvedValue({
            success: true,
            data: null,
        });

        const { result } = renderHook(() => useProduct("1"));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.product).toBeNull();
        expect(result.current.error).toBe("Error al cargar el producto");
    });

    it("should handle API response with success but no error message", async () => {
        mockProductService.getProduct.mockResolvedValue({
            success: false,
        });

        const { result } = renderHook(() => useProduct("1"));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.product).toBeNull();
        expect(result.current.error).toBe("Error al cargar el producto");
    });

    it("should handle fetch error", async () => {
        mockProductService.getProduct.mockRejectedValue(new Error("Network error"));

        const { result } = renderHook(() => useProduct("1"));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.product).toBeNull();
        expect(result.current.error).toBe("Error de conexión");
    });

    it("should refetch when productId changes", async () => {
        mockProductService.getProduct
            .mockResolvedValueOnce({
                success: true,
                data: mockProduct,
            })
            .mockResolvedValueOnce({
                success: true,
                data: { ...mockProduct, id: "2", title: "Product 2" },
            });

        const { result, rerender } = renderHook(
            ({ productId }) => useProduct(productId),
            { initialProps: { productId: "1" } },
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.product?.id).toBe("1");

        // Change productId
        rerender({ productId: "2" });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.product?.id).toBe("2");
        expect(result.current.product?.title).toBe("Product 2");
        expect(mockProductService.getProduct).toHaveBeenCalledTimes(2);
        expect(mockProductService.getProduct).toHaveBeenLastCalledWith("2");
    });

    it("should reset loading state on new fetch", async () => {
        mockProductService.getProduct.mockResolvedValue({
            success: true,
            data: mockProduct,
        });

        const { result, rerender } = renderHook(
            ({ productId }) => useProduct(productId),
            { initialProps: { productId: "1" } },
        );

        // First fetch
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // Change productId to trigger new fetch
        rerender({ productId: "2" });

        // Should be loading again
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();
    });

    it("should handle multiple rapid productId changes", async () => {
        mockProductService.getProduct.mockResolvedValue({
            success: true,
            data: mockProduct,
        });

        const { result, rerender } = renderHook(
            ({ productId }) => useProduct(productId),
            { initialProps: { productId: "1" } },
        );

        // Rapid changes
        rerender({ productId: "2" });
        rerender({ productId: "3" });
        rerender({ productId: "4" });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // Should have called with the last productId
        expect(mockProductService.getProduct).toHaveBeenLastCalledWith("4");
    });
});
