"use client";

import { JSX } from "react";
import { Product } from "@/types/product";
import { formatPrice, calculateInstallments } from "@/lib/utils";

interface ProductPriceProps {
    product: Product;
}

export default function ProductPrice({ product }: ProductPriceProps): JSX.Element {
    const { price } = product;
    const installmentAmount = calculateInstallments(price.amount);

    return (
        <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(price.amount)}
                </span>
                {price.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                        {formatPrice(price.originalPrice)}
                    </span>
                )}
                {price.discount && (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                        {price.discount}% OFF
                    </span>
                )}
            </div>
            {price.originalPrice && (
                <p className="text-sm text-gray-600 mt-1">
                    En 12 cuotas sin interés de {formatPrice(installmentAmount)}
                </p>
            )}
        </div>
    );
}
