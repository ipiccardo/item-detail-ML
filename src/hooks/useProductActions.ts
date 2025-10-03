import { useCallback } from "react";

interface ProductActionData {
  productId: string;
  quantity: number;
  variantColor?: string;
  variantStorage?: string;
}

interface UseProductActionsReturn {
  handleBuyNow: () => void;
  handleAddToCart: () => void;
  handleAddToFavorites: () => void;
  handleShare: () => void;
}

export function useProductActions(data: ProductActionData): UseProductActionsReturn {
  const handleBuyNow = useCallback((): void => {
    // eslint-disable-next-line no-console
    console.log("Comprar ahora:", data);
    // Aquí iría la lógica de compra real
  }, [data]);

  const handleAddToCart = useCallback((): void => {
    // eslint-disable-next-line no-console
    console.log("Agregar al carrito:", data);
    // Aquí iría la lógica de agregar al carrito real
  }, [data]);

  const handleAddToFavorites = useCallback((): void => {
    // eslint-disable-next-line no-console
    console.log("Agregar a favoritos:", data.productId);
    // Aquí iría la lógica de favoritos
  }, [data.productId]);

  const handleShare = useCallback((): void => {
    if (navigator.share) {
      void navigator
        .share({
          title: "Producto en MercadoLibre",
          url: window.location.href,
        })
        .catch(() => {
          // Fallback: copiar URL
          void navigator.clipboard.writeText(window.location.href);
        });
    } else {
      void navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  return {
    handleBuyNow,
    handleAddToCart,
    handleAddToFavorites,
    handleShare,
  };
}
