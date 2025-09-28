"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2 } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, generateStars } from "@/lib/utils";

interface CompareProductsProps {
    products: Product[];
    onRemove: (productId: string) => void;
    onClear: () => void;
    className?: string;
}

export const CompareProducts: React.FC<CompareProductsProps> = ({
    products,
    onRemove,
    onClear,
    className = "",
}) => {
    if (products.length === 0) {
        return null;
    }

    const specifications = products[0]?.specifications ? Object.keys(products[0].specifications) : [];

    return (
        <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    Comparar productos ({products.length}/3)
                </h3>
                <button
                    onClick={onClear}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                >
                    <Trash2 className="w-4 h-4" />
                    Limpiar todo
                </button>
            </div>

            {/* Products Grid */}
            <div className="overflow-x-auto">
                <div className="min-w-full">
                    {/* Product Headers */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="text-sm font-medium text-gray-500">Producto</div>
                        {products.map((product) => (
                            <div key={product.id} className="relative">
                                <button
                                    onClick={() => onRemove(product.id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1
                                    hover:bg-red-600 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>

                                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                                    <Image
                                        src={product.images[0] || "/placeholder.png"}
                                        alt={product.title}
                                        width={120}
                                        height={120}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                                    {product.title}
                                </h4>

                                <div className="space-y-1">
                                    <div className="text-lg font-bold text-gray-900">
                                        {formatPrice(product.price.amount)}
                                    </div>
                                    {product.price.discount && product.price.discount > 0 && (
                                        <div className="text-sm text-green-600">
                                            {product.price.discount}% OFF
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500 text-xs">
                                            {generateStars(product.rating.average)}
                                        </span>
                                        <span className="text-xs text-gray-600">
                                            ({product.rating.totalReviews})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Specifications Comparison */}
                    {specifications.length > 0 && (
                        <div className="border-t border-gray-200 pt-6">
                            <h4 className="text-md font-medium text-gray-900 mb-4">
                                Especificaciones
                            </h4>
                            <div className="space-y-3">
                                {specifications.map((spec) => (
                                    <div key={spec} className="grid grid-cols-4 gap-4">
                                        <div className="text-sm font-medium text-gray-600 py-2">
                                            {spec}
                                        </div>
                                        {products.map((product) => (
                                            <div key={product.id} className="text-sm text-gray-900 py-2">
                                                {product.specifications?.[spec] || "-"}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Key Features Comparison */}
                    <div className="border-t border-gray-200 pt-6 mt-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">
                            Características principales
                        </h4>
                        <div className="space-y-3">
                            {products.map((product) => (
                                <div key={product.id} className="grid grid-cols-4 gap-4">
                                    <div className="text-sm font-medium text-gray-600 py-2">
                                        {product.title}
                                    </div>
                                    <div className="col-span-3">
                                        <div className="flex flex-wrap gap-2">
                                            {product.keyFeatures?.map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-block bg-blue-100 text-blue-800 text-xs
                                                    px-2 py-1 rounded"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
