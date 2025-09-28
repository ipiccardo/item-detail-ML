"use client";

import { JSX } from "react";
import { Heart, Share2, GitCompare } from "lucide-react";
import type { ProductActions } from "@/types/ui";

interface ProductActionsProps {
    actions: ProductActions;
}

export default function ProductActions({ actions }: ProductActionsProps): JSX.Element {
    return (
        <div className="space-y-4">
            {/* Main Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={actions.onBuyNow}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg
            font-medium hover:bg-blue-700 transition-colors"
                >
                    Comprar ahora
                </button>
                <button
                    onClick={actions.onAddToCart}
                    className="flex-1 border border-blue-600 text-blue-600 py-3 px-6
            rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                    Agregar al carrito
                </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-4">
                <button
                    onClick={actions.onAddToFavorites}
                    className={`flex items-center gap-2 transition-colors ${actions.isFavorite
                        ? "text-red-600 hover:text-red-700"
                        : "text-gray-600 hover:text-gray-800"
                        }`}
                >
                    <Heart
                        className={`w-5 h-5 ${actions.isFavorite ? "fill-current" : ""}`}
                    />
                    <span>{actions.isFavorite ? "En favoritos" : "Favoritos"}</span>
                </button>

                <button
                    onClick={actions.onAddToCompare}
                    disabled={!actions.canAddToCompare && !actions.isInCompare}
                    className={`flex items-center gap-2 transition-colors ${actions.isInCompare
                        ? "text-blue-600 hover:text-blue-700"
                        : actions.canAddToCompare
                            ? "text-gray-600 hover:text-gray-800"
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                >
                    <GitCompare className="w-5 h-5" />
                    <span>
                        {actions.isInCompare
                            ? "En comparar"
                            : actions.canAddToCompare
                                ? "Comparar"
                                : "Límite alcanzado"
                        }
                    </span>
                </button>

                <button
                    onClick={actions.onShare}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                    <Share2 className="w-5 h-5" />
                    <span>Compartir</span>
                </button>
            </div>
        </div>
    );
}
