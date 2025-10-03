import React from "react";
import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
    amount: number;
    originalPrice?: number;
    discount?: number;
    currency?: string;
    size?: "sm" | "md" | "lg";
    showDiscount?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: "text-lg",
    md: "text-xl lg:text-[32px]",
    lg: "text-3xl lg:text-5xl",
};

export default function PriceDisplay({
    amount,
    originalPrice,
    discount,
    size = "md",
    showDiscount = true,
    className = "",
}: PriceDisplayProps): React.JSX.Element {
    return (
        <div className={className}>
            {originalPrice && (
                <div className="mb-1">
                    <span className="text-sm lg:text-base ml-text-secondary line-through">
                        {formatPrice(originalPrice)}
                    </span>
                </div>
            )}
            <div className="flex items-center gap-2 flex-wrap">
                <span className={`${sizeClasses[size]} font-light ml-text-primary leading-none`}>
                    {formatPrice(amount)}
                </span>
                {showDiscount && discount && (
                    <span className="text-[13px] font-semibold ml-ui-pdp-color--GREEN">
                        {discount}% OFF
                    </span>
                )}
            </div>
        </div>
    );
}

