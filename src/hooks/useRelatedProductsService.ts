import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { RelatedProductsService } from "@/services/relatedProductsService";

interface UseRelatedProductsReturn {
  relatedProducts: Product[];
  isLoading: boolean;
  error: string | null;
}

export const useRelatedProductsService = (currentProductId: string, limit: number = 4): UseRelatedProductsReturn => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setError(null);

        const products = await RelatedProductsService.getRelatedProducts(currentProductId, limit);
        setRelatedProducts(products);
      } catch (err) {
        setError("Error al cargar productos relacionados");
        // eslint-disable-next-line no-console
        console.error("Error fetching related products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentProductId) {
      void fetchRelatedProducts();
    }
  }, [currentProductId, limit]);

  return {
    relatedProducts,
    isLoading,
    error,
  };
};
