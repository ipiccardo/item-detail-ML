import { useMemo } from "react";
import { Product } from "@/types/product";

interface UseRelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  limit?: number;
}

export const useRelatedProducts = ({ currentProduct, allProducts, limit = 4 }: UseRelatedProductsProps): Product[] => {
  return useMemo(() => {
    // Filter out current product and get products from same brand or category
    const relatedProducts = allProducts
      .filter((product) => product.id !== currentProduct.id)
      .filter(
        (product) =>
          product.brand === currentProduct.brand ||
          product.category === currentProduct.category ||
          product.subcategory === currentProduct.subcategory,
      )
      .sort((a, b) => {
        // Prioritize same brand, then same category
        if (a.brand === currentProduct.brand && b.brand !== currentProduct.brand) return -1;
        if (b.brand === currentProduct.brand && a.brand !== currentProduct.brand) return 1;
        if (a.category === currentProduct.category && b.category !== currentProduct.category) return -1;
        if (b.category === currentProduct.category && a.category !== currentProduct.category) return 1;
        return 0;
      })
      .slice(0, limit);

    return relatedProducts;
  }, [currentProduct, allProducts, limit]);
};
