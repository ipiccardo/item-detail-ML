import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
    rating: number;
    size?: "sm" | "md" | "lg";
    showNumber?: boolean;
    totalReviews?: number;
    className?: string;
}

const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
};

const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
};

export default function RatingStars({
    rating,
    size = "md",
    showNumber = false,
    totalReviews,
    className = "",
}: RatingStarsProps): React.JSX.Element {
    const renderStars = (): React.JSX.Element => {
        const sizeClass = sizeClasses[size];
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                    const isHalfStar = star === Math.ceil(rating) && rating % 1 !== 0;
                    const isFullStar = star <= Math.floor(rating);

                    return (
                        <div key={star} className="relative">
                            <Star
                                className={`${sizeClass} ${isFullStar ? "text-blue-500 fill-current" : "text-gray-300"
                                    }`}
                            />
                            {isHalfStar && (
                                <div className="absolute inset-0 overflow-hidden">
                                    <Star
                                        className={`${sizeClass} text-blue-500 fill-current`}
                                        style={{ clipPath: "inset(0 50% 0 0)" }}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {showNumber && (
                <span className={`font-semibold text-gray-900 ${textSizeClasses[size]}`}>
                    {rating}
                </span>
            )}
            {renderStars()}
            {totalReviews && (
                <span className={`text-gray-600 ${textSizeClasses[size]}`}>
                    ({totalReviews})
                </span>
            )}
        </div>
    );
}

