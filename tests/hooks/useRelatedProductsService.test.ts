import { renderHook, waitFor } from "@testing-library/react";
import { useRelatedProductsService } from "../../src/hooks/useRelatedProductsService";
import { RelatedProductsService } from "../../src/services/relatedProductsService";
import { Product } from "../../src/types/product";

// Mock RelatedProductsService
jest.mock("../../src/services/relatedProductsService");
const mockRelatedProductsService = RelatedProductsService as jest.Mocked<typeof RelatedProductsService>;

describe("useRelatedProductsService", () => {
    const mockRelatedProducts: Product[] = [
        {
            id: "2",
            title: "iPhone 14",
            price: { amount: 800, currency: "ARS" },
            images: ["iphone14.jpg"],
            rating: 4.6,
            stock: 10,
            seller: {
                id: "seller1",
                name: "Apple Store",
                sales: 1000,
                reputation: "high",
            },
            shipping: {
                free: true,
                estimatedDays: 2,
            },
            brand: "Apple",
            category: "Electronics",
            subcategory: "Phones",
        },
        {
            id: "3",
            title: "MacBook Pro",
            price: { amount: 2000, currency: "ARS" },
            images: ["macbook.jpg"],
            rating: 4.9,
            stock: 3,
            seller: {
                id: "seller1",
                name: "Apple Store",
                sales: 1000,
                reputation: "high",
            },
            shipping: {
                free: true,
                estimatedDays: 2,
            },
            brand: "Apple",
            category: "Electronics",
            subcategory: "Laptops",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should initialize with loading state", () => {
        mockRelatedProductsService.getRelatedProducts.mockResolvedValue(mockRelatedProducts);

        const { result } = renderHook(() => useRelatedProductsService("1"));

        expect(result.current.relatedProducts).toEqual([]);
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();
    });

    it("should fetch related products successfully", async () => {
        mockRelatedProductsService.getRelatedProducts.mockResolvedValue(mockRelatedProducts);

        const { result } = renderHook(() => useRelatedProductsService("1"));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.relatedProducts).toEqual(mockRelatedProducts);
        expect(result.current.error).toBeNull();
        expect(mockRelatedProductsService.getRelatedProducts).toHaveBeenCalledWith("1", 4);
    });

    it("should use custom limit", async () => {
        mockRelatedProductsService.getRelatedProducts.mockResolvedValue(mockRelatedProducts.slice(0, 1));

        const { result } = renderHook(() => useRelatedProductsService("1", 1));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(mockRelatedProductsService.getRelatedProducts).toHaveBeenCalledWith("1", 1);
    });

    it("should handle service error", async () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();
        mockRelatedProductsService.getRelatedProducts.mockRejectedValue(new Error("Service error"));

        const { result } = renderHook(() => useRelatedProductsService("1"));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.relatedProducts).toEqual([]);
        expect(result.current.error).toBe("Error al cargar productos relacionados");
        expect(consoleSpy).toHaveBeenCalledWith(
            "Error fetching related products:",
            expect.any(Error),
        );

        consoleSpy.mockRestore();
    });

    it("should refetch when currentProductId changes", async () => {
        mockRelatedProductsService.getRelatedProducts
            .mockResolvedValueOnce(mockRelatedProducts)
            .mockResolvedValueOnce(mockRelatedProducts.slice(0, 1));

        const { result, rerender } = renderHook(
            ({ productId }) => useRelatedProductsService(productId),
            { initialProps: { productId: "1" } },
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.relatedProducts).toEqual(mockRelatedProducts);

        // Change productId
        rerender({ productId: "2" });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(mockRelatedProductsService.getRelatedProducts).toHaveBeenCalledTimes(2);
        expect(mockRelatedProductsService.getRelatedProducts).toHaveBeenLastCalledWith("2", 4);
    });

    it("should refetch when limit changes", async () => {
        mockRelatedProductsService.getRelatedProducts
            .mockResolvedValueOnce(mockRelatedProducts)
            .mockResolvedValueOnce(mockRelatedProducts.slice(0, 1));

        const { result, rerender } = renderHook(
            ({ productId, limit }) => useRelatedProductsService(productId, limit),
            { initialProps: { productId: "1", limit: 4 } },
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // Change limit
        rerender({ productId: "1", limit: 1 });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(mockRelatedProductsService.getRelatedProducts).toHaveBeenCalledTimes(2);
        expect(mockRelatedProductsService.getRelatedProducts).toHaveBeenLastCalledWith("1", 1);
    });

    it("should not fetch when currentProductId is empty", () => {
        const { result } = renderHook(() => useRelatedProductsService(""));

        expect(result.current.relatedProducts).toEqual([]);
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(mockRelatedProductsService.getRelatedProducts).not.toHaveBeenCalled();
    });

    it("should handle empty related products response", async () => {
        mockRelatedProductsService.getRelatedProducts.mockResolvedValue([]);

        const { result } = renderHook(() => useRelatedProductsService("1"));

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.relatedProducts).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it("should reset error state on new fetch", async () => {
        const consoleSpy = jest.spyOn(console, "error").mockImplementation();

        // First call fails
        mockRelatedProductsService.getRelatedProducts
            .mockRejectedValueOnce(new Error("First error"))
            .mockResolvedValueOnce(mockRelatedProducts);

        const { result, rerender } = renderHook(
            ({ productId }) => useRelatedProductsService(productId),
            { initialProps: { productId: "1" } },
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBe("Error al cargar productos relacionados");

        // Change productId to trigger new fetch
        rerender({ productId: "2" });

        expect(result.current.error).toBeNull();

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBeNull();
        expect(result.current.relatedProducts).toEqual(mockRelatedProducts);

        consoleSpy.mockRestore();
    });

    it("should handle multiple rapid productId changes", async () => {
        mockRelatedProductsService.getRelatedProducts.mockResolvedValue(mockRelatedProducts);

        const { result, rerender } = renderHook(
            ({ productId }) => useRelatedProductsService(productId),
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
        expect(mockRelatedProductsService.getRelatedProducts).toHaveBeenLastCalledWith("4", 4);
    });
});
