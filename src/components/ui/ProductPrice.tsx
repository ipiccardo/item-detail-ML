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
        <div className="mb-4">
            {/* Price Section */}
            <div className="mb-2">
                {price.originalPrice && (
                    <div className="mb-1">
                        <span className="text-base ml-text-secondary line-through">
                            {formatPrice(price.originalPrice)}
                        </span>
                    </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[32px] font-light ml-text-primary leading-none">
                        {formatPrice(price.amount)}
                    </span>

                    {price.discount && (
                        <span className="text-[13px] font-semibold ml-ui-pdp-color--GREEN">
                            {price.discount}% OFF
                        </span>
                    )}
                </div>

                {/* Installments */}
                <div className="space-y-0.5">
                    <p className="text-base ml-ui-pdp-color--GREEN font-normal">
                        Mismo precio en 12 cuotas de {formatPrice(installmentAmount)}<sup className="text-[10px]">25</sup>
                    </p>
                    <p className="text-xs ml-text-secondary">
                        Precio sin impuestos nacionales: {formatPrice(price.amount)}
                    </p>
                    <button className="text-sm ml-link hover:underline">
                        Ver los medios de pago
                    </button>
                </div>
            </div>
        </div>
    );
}
