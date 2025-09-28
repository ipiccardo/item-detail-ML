import { Product } from "@/types/product";

export interface CompareHandlers {
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  canAddMore: boolean;
  compareProducts: Product[];
  clearCompare: () => void;
}

export const createCompareHandlers = (
  addToCompare: (product: Product) => void,
  removeFromCompare: (productId: string) => void,
  isInCompare: (productId: string) => boolean,
  canAddMore: boolean,
  compareProducts: Product[],
  clearCompare: () => void,
): CompareHandlers => {
  const handleAddToCompare = (product: Product): void => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleRemoveFromCompare = (productId: string): void => {
    removeFromCompare(productId);
  };

  return {
    addToCompare: handleAddToCompare,
    removeFromCompare: handleRemoveFromCompare,
    isInCompare,
    canAddMore,
    compareProducts,
    clearCompare,
  };
};
