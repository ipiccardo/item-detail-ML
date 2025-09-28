// Favorites types
export interface FavoriteProduct {
  id: string;
  addedAt: Date;
}

export interface FavoritesState {
  favorites: FavoriteProduct[];
  isLoading: boolean;
  error: string | null;
}

export interface UseFavoritesReturn extends FavoritesState {
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}
