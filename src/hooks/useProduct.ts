import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { LoadingState } from "@/types/ui";
import { ProductService } from "@/services/productService";

export function useProduct(productId: string): {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
} {
  const [product, setProduct] = useState<Product | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      try {
        setLoadingState({ isLoading: true, error: null });
        const response = await ProductService.getProduct(productId);

        if (response.success && response.data) {
          setProduct(response.data);
        } else {
          setLoadingState({
            isLoading: false,
            error: response.error ?? "Error al cargar el producto",
          });
        }
      } catch {
        setLoadingState({ isLoading: false, error: "Error de conexión" });
      } finally {
        setLoadingState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    void fetchProduct();
  }, [productId]);

  return { product, ...loadingState };
}
