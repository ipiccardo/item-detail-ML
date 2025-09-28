export interface FavoritesHandlers {
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
}

export const createFavoritesHandlers = (
  toggleFavorite: (productId: string) => void,
  isFavorite: (productId: string) => boolean,
  addToFavorites: (productId: string) => void,
  removeFromFavorites: (productId: string) => void,
): FavoritesHandlers => {
  return {
    toggleFavorite,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  };
};
