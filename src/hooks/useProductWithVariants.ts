/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMemo } from "react";
import { Product } from "@/types/product";
import { UseVariantsReturn } from "./useVariants";

interface UseProductWithVariantsProps {
  product: Product;
  variants: UseVariantsReturn;
}

export function useProductWithVariants({ product, variants }: UseProductWithVariantsProps) {
  const { getCurrentPrice, getCurrentImage } = variants;

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
