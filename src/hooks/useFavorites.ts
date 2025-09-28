import { useState, useEffect, useCallback } from "react";
import { UseFavoritesReturn, FavoriteProduct } from "@/types/favorites";

const FAVORITES_STORAGE_KEY = "meli_favorites";

export const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsedFavorites = JSON.parse(stored).map((fav: { id: string; addedAt: string }) => ({
          ...fav,
          addedAt: new Date(fav.addedAt),
        }));
        setFavorites(parsedFavorites);
      }
    } catch (err) {
      setError("Error al cargar favoritos");
      // eslint-disable-next-line no-console
      console.error("Error loading favorites:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (err) {
        setError("Error al guardar favoritos");
        // eslint-disable-next-line no-console
        console.error("Error saving favorites:", err);
      }
    }
  }, [favorites, isLoading]);

  const addToFavorites = useCallback((productId: string) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === productId)) {
        return prev; // Already in favorites
      }
      return [...prev, { id: productId, addedAt: new Date() }];
    });
  }, []);

  const removeFromFavorites = useCallback((productId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
  }, []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === productId);
      if (isAlreadyFavorite) {
        return prev.filter((fav) => fav.id !== productId);
      } else {
        return [...prev, { id: productId, addedAt: new Date() }];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (productId: string) => {
      return favorites.some((fav) => fav.id === productId);
    },
    [favorites],
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    isLoading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};
