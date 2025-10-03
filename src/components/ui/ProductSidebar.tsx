import { JSX } from "react";
import { SellerInfoCard } from "./SellerInfoCard";
import { MercadoLibreStoreCard } from "./MercadoLibreStoreCard";
import { PaymentMethodsCard } from "./PaymentMethodsCard";
import type { Seller, Shipping } from "@/types/product";

interface ProductSidebarProps {
    seller: Seller;
    shipping: Shipping;
    stock: number;
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onBuyNow: () => void;
    onAddToCart: () => void;
}

export const ProductSidebar = ({
    seller,
    shipping,
    stock,
    quantity,
    onIncrement,
    onDecrement,
    onBuyNow,
    onAddToCart,
}: ProductSidebarProps): JSX.Element => {
    return (
        <div className="hidden lg:flex lg:w-[309px] lg:flex-shrink-0 lg:absolute lg:right-6 flex-col gap-6">
            <SellerInfoCard
                seller={seller}
                shipping={shipping}
                stock={stock}
                quantity={quantity}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onBuyNow={onBuyNow}
                onAddToCart={onAddToCart}
            />

            <MercadoLibreStoreCard />

            <PaymentMethodsCard />
        </div>
    );
};

