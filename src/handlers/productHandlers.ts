import { ProductActions } from "@/types/ui";
import { Product } from "@/types/product";

export const createProductActions = (
  product: Product,
  favoritesHandlers: {
    toggleFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
  },
  compareHandlers: {
    addToCompare: (product: Product) => void;
    isInCompare: (productId: string) => boolean;
    canAddMore: boolean;
  },
): ProductActions => {
  return {
    onBuyNow: (): void => {
      // eslint-disable-next-line no-alert
      alert("Funcionalidad de compra no implementada en este prototipo");
    },

    onAddToCart: (): void => {
      // eslint-disable-next-line no-alert
      alert("Funcionalidad de carrito no implementada en este prototipo");
    },

    onAddToFavorites: (): void => {
      favoritesHandlers.toggleFavorite(product.id);
    },

    onAddToCompare: (): void => {
      compareHandlers.addToCompare(product);
    },

    onShare: (): void => {
      if (navigator.share) {
        void navigator.share({
          title: "MercadoLibre - Producto",
          text: "Mira este producto en MercadoLibre",
          url: window.location.href,
        });
      } else {
        // Fallback para navegadores que no soportan Web Share API
        void navigator.clipboard.writeText(window.location.href);
        // eslint-disable-next-line no-alert
        alert("Enlace copiado al portapapeles");
      }
    },

    isFavorite: favoritesHandlers.isFavorite(product.id),
    isInCompare: compareHandlers.isInCompare(product.id),
    canAddToCompare: compareHandlers.canAddMore,
  };
};
