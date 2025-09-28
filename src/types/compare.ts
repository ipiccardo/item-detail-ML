import { Product } from "./product";

// Compare types
export interface CompareState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export interface UseCompareReturn extends CompareState {
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  canAddMore: boolean;
  isInCompare: (productId: string) => boolean;
}

export const MAX_COMPARE_PRODUCTS = 3;
