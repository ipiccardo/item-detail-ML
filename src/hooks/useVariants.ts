import { useState, useCallback } from "react";
import { Product, Variant } from "@/types/product";

interface SelectedVariants {
  color?: string;
  storage?: string;
}

interface UseVariantsReturn {
  selectedVariants: SelectedVariants;
  selectColor: (colorValue: string) => void;
  selectStorage: (storageValue: string) => void;
  getSelectedColor: () => Variant | undefined;
  getSelectedStorage: () => Variant | undefined;
  getCurrentPrice: () => number;
  getCurrentImage: () => string;
}

export const useVariants = (product: Product): UseVariantsReturn => {
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>({
    color: product.variants?.color?.[0]?.value,
    storage: product.variants?.storage?.[0]?.value,
  });

  const selectColor = useCallback((colorValue: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      color: colorValue,
    }));
  }, []);

  const selectStorage = useCallback((storageValue: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      storage: storageValue,
    }));
  }, []);

  const getSelectedColor = useCallback((): Variant | undefined => {
    if (!product.variants?.color || !selectedVariants.color) {
      return undefined;
    }
    return product.variants.color.find((color) => color.value === selectedVariants.color);
  }, [product.variants?.color, selectedVariants.color]);

  const getSelectedStorage = useCallback((): Variant | undefined => {
    if (!product.variants?.storage || !selectedVariants.storage) {
      return undefined;
    }
    return product.variants.storage.find((storage) => storage.value === selectedVariants.storage);
  }, [product.variants?.storage, selectedVariants.storage]);

  const getCurrentPrice = useCallback((): number => {
    let price = product.price.amount;

    const selectedStorage = getSelectedStorage();
    if (selectedStorage?.priceModifier) {
      price += selectedStorage.priceModifier;
    }

    return price;
  }, [product.price.amount, getSelectedStorage]);

  const getCurrentImage = useCallback((): string => {
    const selectedColor = getSelectedColor();
    if (selectedColor?.image) {
      return selectedColor.image;
    }

    // Fallback to first image if no color-specific image
    return product.images[0] || "";
  }, [getSelectedColor, product.images]);

  return {
    selectedVariants,
    selectColor,
    selectStorage,
    getSelectedColor,
    getSelectedStorage,
    getCurrentPrice,
    getCurrentImage,
  };
};
