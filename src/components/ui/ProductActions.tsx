"use client";

import { JSX } from "react";
import { Heart, Share2, GitCompare } from "lucide-react";
import type { ProductActions } from "@/types/ui";

interface ProductActionsProps {
  actions: ProductActions;
  quantity: number;
  stock: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ProductActions({
  actions,
  quantity,
  stock,
  onIncrement,
  onDecrement,
}: ProductActionsProps): JSX.Element {
  return (
    <div className="space-y-4">
      {/* Main Action Buttons - MercadoLibre Style */}
      <div className="space-y-3">
        <button onClick={actions.onBuyNow} className="w-full ml-button-primary py-4 px-6 text-lg font-semibold">
          Comprar ahora
        </button>
        <button onClick={actions.onAddToCart} className="w-full ml-button-secondary py-4 px-6 text-lg font-semibold">
          Agregar al carrito
        </button>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm ml-text-primary font-medium">Cantidad:</span>
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={onDecrement}
            disabled={quantity <= 1}
            className="px-3 py-2 hover:bg-gray-100 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            -
          </button>
          <span className="px-4 py-2 border-x border-gray-300 font-medium">{quantity}</span>
          <button
            onClick={onIncrement}
            disabled={quantity >= stock}
            className="px-3 py-2 hover:bg-gray-100 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            +
          </button>
        </div>
        <span className="text-sm ml-text-secondary">({stock} disponibles)</span>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={actions.onAddToFavorites}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                      actions.isFavorite
                        ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                        : "ml-text-secondary hover:text-gray-800"
                    }`}
        >
          <Heart
            className={`w-5 h-5 transition-transform duration-200 ${
              actions.isFavorite ? "fill-current scale-110" : "hover:scale-110"
            }`}
          />
          <span className="font-medium text-sm">{actions.isFavorite ? "En favoritos" : "Favoritos"}</span>
        </button>

        <button
          onClick={actions.onAddToCompare}
          disabled={!actions.canAddToCompare && !actions.isInCompare}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      actions.isInCompare
                        ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        : actions.canAddToCompare
                        ? "ml-text-secondary hover:text-gray-800 hover:bg-gray-50"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
        >
          <GitCompare
            className={`w-5 h-5 transition-transform duration-200 ${
              actions.canAddToCompare || actions.isInCompare ? "hover:scale-110" : ""
            }`}
          />
          <span className="font-medium text-sm">
            {actions.isInCompare ? "En comparar" : actions.canAddToCompare ? "Comparar" : "Límite alcanzado"}
          </span>
        </button>

        <button
          onClick={actions.onShare}
          className="flex items-center gap-2 px-4 py-2 rounded-lg ml-text-secondary hover:text-gray-800
                    hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2
                    focus:ring-gray-500 focus:ring-offset-2"
        >
          <Share2 className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
          <span className="font-medium text-sm">Compartir</span>
        </button>
      </div>
    </div>
  );
}
