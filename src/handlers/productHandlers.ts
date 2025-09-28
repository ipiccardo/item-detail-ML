import { ProductActions } from "@/types/ui";

export const createProductActions = (): ProductActions => ({
  onBuyNow: (): void => {
    // eslint-disable-next-line no-alert
    alert("Funcionalidad de compra no implementada en este prototipo");
  },

  onAddToCart: (): void => {
    // eslint-disable-next-line no-alert
    alert("Funcionalidad de carrito no implementada en este prototipo");
  },

  onAddToFavorites: (): void => {
    // eslint-disable-next-line no-alert
    alert("Funcionalidad de favoritos no implementada en este prototipo");
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
});
