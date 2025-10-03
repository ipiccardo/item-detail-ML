/* eslint-disable max-len */
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface RelatedProductsProps {
    products: Product[];
    title?: string;
    className?: string;
}

// Imágenes disponibles en public/
const availableImages = ["/1.png", "/2.png", "/3.png", "/4.png"];

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
    products,
    title = "Quienes vieron este producto también compraron",
    className = "",
}) => {
    if (!products || products.length === 0) {
        return null;
    }

    const handleClick = (e: React.MouseEvent): void => {
        e.preventDefault();
        // No hacer nada al hacer click
    };

    return (
        <div className={`ml-card p-6 ${className}`}>
            <h3 className="text-lg font-semibold ml-text-primary mb-4">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, index) => {
                    // Usar las imágenes del public/ de forma cíclica
                    const imageUrl = availableImages[index % availableImages.length];

                    return (
                        <div
                            key={product.id}
                            onClick={handleClick}
                            className="group ml-card rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                        >
                            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                                <Image
                                    src={imageUrl}
                                    alt={product.title}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                                />
                            </div>

                            <h4 className="text-sm ml-text-primary line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                                {product.title}
                            </h4>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xl lg:text-[32px] font-light ml-text-primary leading-none">
                                        {formatPrice(product.price.amount)}
                                    </span>
                                    {product.price.discount && product.price.discount > 0 && (
                                        <span className="text-[13px] font-semibold ml-ui-pdp-color--GREEN">
                                            {product.price.discount}% OFF
                                        </span>
                                    )}
                                </div>

                                {product.price.originalPrice && (
                                    <div className="text-base ml-text-secondary line-through">
                                        {formatPrice(product.price.originalPrice)}
                                    </div>
                                )}

                                <div className="text-sm ml-shipping-free">
                                    Envío gratis
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
