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
                    font-medium hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5
                    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Comprar ahora
                </button>
                <button
                    onClick={actions.onAddToCart}
                    className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6
                    rounded-lg font-medium hover:bg-blue-50 hover:border-blue-700 hover:shadow-md
                    transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Agregar al carrito
                </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-6">
                <button
                    onClick={actions.onAddToFavorites}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${actions.isFavorite
                            ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                >
                    <Heart
                        className={`w-5 h-5 transition-transform duration-200 ${actions.isFavorite ? "fill-current scale-110" : "hover:scale-110"
                            }`}
                    />
                    <span className="font-medium">{actions.isFavorite ? "En favoritos" : "Favoritos"}</span>
                </button>

                <button
                    onClick={actions.onAddToCompare}
                    disabled={!actions.canAddToCompare && !actions.isInCompare}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${actions.isInCompare
                            ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            : actions.canAddToCompare
                                ? "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                : "text-gray-400 cursor-not-allowed"
                        }`}
                >
                    <GitCompare className={`w-5 h-5 transition-transform duration-200 ${actions.canAddToCompare || actions.isInCompare ? "hover:scale-110" : ""
                        }`} />
                    <span className="font-medium">
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
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-800
                    hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2
                    focus:ring-gray-500 focus:ring-offset-2"
                >
                    <Share2 className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">Compartir</span>
                </button>
            </div>
        </div>
    );
}
