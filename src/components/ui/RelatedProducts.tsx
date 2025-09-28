import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface RelatedProductsProps {
    products: Product[];
    title?: string;
    className?: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
    products,
    title = "Productos relacionados",
    className = "",
}) => {
    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className={`mt-8 ${className}`}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        className="group block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                            <Image
                                src={product.images[0] || "/placeholder.png"}
                                alt={product.title}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                        </div>

                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                            {product.title}
                        </h4>

                        <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-900">
                                    {formatPrice(product.price.amount)}
                                </span>
                                {product.price.discount && product.price.discount > 0 && (
                                    <span className="text-sm text-green-600 font-medium">
                                        {product.price.discount}% OFF
                                    </span>
                                )}
                            </div>

                            {product.price.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(product.price.originalPrice)}
                                </span>
                            )}

                            <div className="text-xs text-green-600">
                                Envío gratis
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
