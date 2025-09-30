"use client";

import { JSX } from "react";
import { Truck, Clock } from "lucide-react";

interface SellerInfoCardProps {
  seller: {
    name: string;
    sales: number;
    reputation: number;
    location: string;
  };
  shipping: {
    estimatedDays: string;
    free: boolean;
  };
  stock: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onBuyNow: () => void;
  onAddToCart: () => void;
}

export const SellerInfoCard = ({
  seller,
  shipping,
  stock,
  quantity,
  onIncrement,
  onDecrement,
  onBuyNow,
  onAddToCart,
}: SellerInfoCardProps): JSX.Element => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      {/* Delivery Info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-1">
          <Truck className="w-4 h-4" />
          <span>Llega gratis entre el 8 y el 14/oct</span>
        </div>
        <p className="text-xs text-gray-600 mb-2">Más detalles y formas de entrega</p>

        <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-1">
          <Clock className="w-4 h-4" />
          <span>Retirá gratis entre el 7 y el 13/oct en correo y otros puntos</span>
        </div>
        <p className="text-xs text-blue-600 hover:underline cursor-pointer">Ver en el mapa</p>
      </div>

      {/* Stock Info */}
      <div className="mb-4">
        <p className="text-sm text-green-600 font-medium mb-2">Stock disponible</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Cantidad:</span>
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={onDecrement}
              disabled={quantity <= 1}
              className="px-2 py-1 text-gray-400 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-3 py-1 text-sm border-x border-gray-300">
              {quantity} unidad{quantity !== 1 ? "es" : ""}
            </span>
            <button
              onClick={onIncrement}
              disabled={quantity >= stock}
              className="px-2 py-1 text-gray-400 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
          <span className="text-xs text-gray-500">({stock} disponibles)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-4">
        <button
          onClick={onBuyNow}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors"
        >
          Comprar ahora
        </button>
        <button
          onClick={onAddToCart}
          className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-md font-semibold text-lg hover:bg-blue-50 transition-colors"
        >
          Agregar al carrito
        </button>
      </div>

      {/* Seller Info */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600 mb-1">
          Vendido por <span className="font-medium">{seller.name}</span>
        </p>
        <p className="text-sm text-gray-600">+{seller.sales} ventas</p>
      </div>
    </div>
  );
};
