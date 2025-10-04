import { JSX } from "react";
import { Heart } from "lucide-react";
import { formatNumber, generateStars } from "@/lib/utils";

interface ProductHeaderProps {
    title: string;
    rating: {
        average: number;
        totalReviews: number;
    };
    sales: number;
}

export const ProductHeader = ({ title, rating, sales }: ProductHeaderProps): JSX.Element => {
    return (
        <>
            {/* Desktop: Ver más productos */}
            <div className="mb-1 hidden lg:block">
                <p className="text-sm ml-link">Ver más productos marca Samsung</p>
            </div>

            {/* Mobile: Title First */}
            <h1 className="lg:hidden text-sm font-normal ml-text-primary leading-tight mb-2 ">{title}</h1>

            {/* Mobile: Nuevo + Vendidos + Rating */}
            <div className="lg:hidden mb-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
                    <span>Nuevo</span>
                    <span>|</span>
                    <span>+{formatNumber(sales)} vendidos</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold ml-text-primary">{rating.average}</span>
                    <div className="flex items-center">
                        <span className="ml-rating text-xs">{generateStars(rating.average)}</span>
                    </div>
                    <span className="text-xs text-gray-600">({formatNumber(rating.totalReviews)})</span>
                </div>
            </div>

            {/* Desktop: Status and Actions */}
            <div className="hidden lg:flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm ml-text-secondary">
                    <span>Nuevo</span>
                    <span>|</span>
                    <span>+{formatNumber(sales)} vendidos</span>
                </div>
                <button className="ml-heart-button">
                    <Heart className="w-6 h-6" />
                </button>
            </div>

            {/* Desktop: Best Seller Tag */}
            <div className="hidden lg:flex items-center gap-2 mb-2">
                <span className="ml-tag-mas-vendido">MÁS VENDIDO</span>
                <span className="ml-link text-xs">5° en Celulares y Smartphones Samsung</span>
            </div>

            {/* Desktop: Title */}
            <h1 className="hidden lg:block text-xl font-semibold ml-text-primary leading-snug ">{title}</h1>

            {/* Desktop: Rating */}
            <div className="hidden lg:flex items-center gap-2 mb-3">
                <span className="text-sm ml-text-primary">{rating.average}</span>
                <div className="flex items-center">
                    <span className="ml-rating text-sm">{generateStars(rating.average)}</span>
                </div>
                <span className="text-sm ml-text-secondary">({formatNumber(rating.totalReviews)})</span>
            </div>
        </>
    );
};

