import { useMemo } from "react";
import { Product } from "@/types/product";
import { useVariants } from "./useVariants";

interface UseProductWithVariantsProps {
  product: Product;
}

export function useProductWithVariants({ product }: UseProductWithVariantsProps) {
  const { getCurrentPrice, getCurrentImage } = useVariants(product);

  // Update product with selected variants
  const updatedProduct = useMemo(() => {
    const currentPrice = getCurrentPrice();
    const currentImage = getCurrentImage();
    return {
      ...product,
      price: { ...product.price, amount: currentPrice },
      images: currentImage ? [currentImage, ...product.images.filter((img) => img !== currentImage)] : product.images,
    };
  }, [product, getCurrentPrice, getCurrentImage]);

  return {
    updatedProduct,
  };
}
