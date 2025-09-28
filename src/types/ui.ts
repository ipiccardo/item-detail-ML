// UI Component types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ImageGalleryState {
  selectedImage: number;
  images: string[];
}

export interface QuantityState {
  quantity: number;
  maxQuantity: number;
}

export interface ProductActions {
  onBuyNow: () => void;
  onAddToCart: () => void;
  onAddToFavorites: () => void;
  onAddToCompare: () => void;
  onShare: () => void;
  isFavorite: boolean;
  isInCompare: boolean;
  canAddToCompare: boolean;
}
