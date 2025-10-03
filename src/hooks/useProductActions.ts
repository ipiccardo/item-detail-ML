import { useCallback } from "react";

interface ProductActionsParams {
  productId: string;
  quantity: number;
}

interface ProductActions {
  handleBuyNow: () => void;
  handleAddToCart: () => void;
}

export const useProductActions = ({ productId, quantity }: ProductActionsParams): ProductActions => {
  const handleBuyNow = useCallback((): void => {
    // eslint-disable-next-line no-console
    console.log("Comprar ahora:", { productId, quantity });
    // Aquí iría la lógica de compra
  }, [productId, quantity]);

  const handleAddToCart = useCallback((): void => {
    // eslint-disable-next-line no-console
    console.log("Agregar al carrito:", { productId, quantity });
    // Aquí iría la lógica de agregar al carrito
  }, [productId, quantity]);

  return {
    handleBuyNow,
    handleAddToCart,
  };
};
