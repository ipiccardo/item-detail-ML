import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { UseCompareReturn, MAX_COMPARE_PRODUCTS } from "@/types/compare";

const COMPARE_STORAGE_KEY = "meli_compare";

export const useCompare = (): UseCompareReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load compare products from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
      if (stored) {
        const parsedProducts = JSON.parse(stored);
        setProducts(parsedProducts);
      }
    } catch (err) {
      setError("Error al cargar productos para comparar");
      // eslint-disable-next-line no-console
      console.error("Error loading compare products:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(products));
      } catch (err) {
        setError("Error al guardar productos para comparar");
        // eslint-disable-next-line no-console
        console.error("Error saving compare products:", err);
      }
    }
  }, [products, isLoading]);

  const addToCompare = useCallback((product: Product) => {
    setProducts((prev) => {
      // Check if already in compare
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }

      // Check if we can add more
      if (prev.length >= MAX_COMPARE_PRODUCTS) {
        setError(`Solo puedes comparar hasta ${MAX_COMPARE_PRODUCTS} productos`);
        return prev;
      }

      return [...prev, product];
    });
  }, []);

  const removeFromCompare = useCallback(
    (productId: string) => {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      if (error) setError(null); // Clear error when removing
    },
    [error],
  );

  const clearCompare = useCallback(() => {
    setProducts([]);
    setError(null);
  }, []);

  const canAddMore = products.length < MAX_COMPARE_PRODUCTS;

  const isInCompare = useCallback(
    (productId: string) => {
      return products.some((p) => p.id === productId);
    },
    [products],
  );

  return {
    products,
    isLoading,
    error,
    addToCompare,
    removeFromCompare,
    clearCompare,
    canAddMore,
    isInCompare,
  };
};
