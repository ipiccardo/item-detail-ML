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
        <div className="space-y-4">
            {/* Price Section */}
            <div className="space-y-2">
                {price.originalPrice && (
                    <span className="text-lg ml-text-secondary line-through">
                        {formatPrice(price.originalPrice)}
                    </span>
                )}
                <div className="flex items-baseline gap-3">
                    <span className="ml-ui-pdp-price text-4xl">
                        {formatPrice(price.amount)}
                    </span>

                    {price.discount && (
                        <span className="ml-ui-pdp-color--GREEN">
                            {price.discount}% OFF
                        </span>
                    )}
                </div>

                {/* Installments */}
                <div className="space-y-1">
                    <p className="text-base ml-text-primary font-medium ml-ui-pdp-color--GREEN">
                        Mismo precio en 6 cuotas de {formatPrice(installmentAmount)}
                    </p>
                    <p className="text-sm text-gray-600">
                        Precio sin impuestos nacionales: {formatPrice(price.amount)}
                    </p>
                    <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                        Ver los medios de pago
                    </p>
                </div>
            </div>
        </div>
    );
}
