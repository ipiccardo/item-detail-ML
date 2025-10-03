/* eslint-disable max-len */
import React from "react";
import { Star, ThumbsUp, Check, ChevronDown, Diamond } from "lucide-react";

interface Review {
    id: string;
    rating: number;
    date: string;
    text: string;
    helpful: number;
    verified: boolean;
    image?: string;
}

interface ProductReviewsProps {
    className?: string;
}

const mockReviews: Review[] = [
    {
        id: "1",
        rating: 5,
        date: "25 jun. 2025",
        text: "La verdad deberían agregar el cargador, viene solo el cable.",
        helpful: 15,
        verified: true,
    },
    {
        id: "2",
        rating: 5,
        date: "26 jul. 2025",
        text: "Me estafaron en el envoltorio vino un pedazo de madera.",
        helpful: 0,
        verified: false,
    },
];

const ratingDistribution = [
    { stars: 5, percentage: 85, count: 156 },
    { stars: 4, percentage: 12, count: 22 },
    { stars: 3, percentage: 2, count: 4 },
    { stars: 2, percentage: 1, count: 1 },
    { stars: 1, percentage: 0, count: 0 },
];

const featureRatings = [
    { name: "Relación precio-calidad", rating: 5 },
    { name: "Duración de la batería", rating: 5 },
    { name: "Calidad de la cámara", rating: 4.5 },
    { name: "Durabilidad", rating: 4.5 },
];

export default function ProductReviews({ className = "" }: ProductReviewsProps): React.JSX.Element {
    // const [sortBy, setSortBy] = useState("recent");
    // const [ratingFilter, setRatingFilter] = useState("all");

    const renderStars = (rating: number, size: "sm" | "md" = "md"): React.JSX.Element => {
        const sizeClass = size === "sm" ? "w-3 h-3" : "w-4 h-4";
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
        <div className={`bg-white rounded-md p-6 ${className}`}>
            <div className="flex gap-8">
                {/* Left Column - Rating Summary */}
                <div className="w-72 flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Opiniones del producto</h2>
                    {/* Overall Rating */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl font-bold text-blue-600">4.7</span>
                        <div className="flex flex-col">
                            {renderStars(4.7, "md")}
                            <span className="text-sm text-gray-600 mt-1">183 calificaciones</span>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="mb-6">
                        {ratingDistribution.map((item) => (
                            <div key={item.stars} className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-gray-600 w-3">{item.stars}</span>
                                <Star className="w-3 h-3 text-blue-500 fill-current" />
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-600 w-8">{item.count}</span>
                            </div>
                        ))}
                    </div>

                    {/* Feature Ratings */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-3">Calificación de características</h3>
                        <div className="space-y-3">
                            {featureRatings.map((feature) => (
                                <div key={feature.name} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">{feature.name}</span>
                                    {renderStars(feature.rating, "sm")}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Reviews */}
                <div className="flex-1">
                    {/* Reviews with Photos */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">Opiniones con fotos</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/1.png"
                                    alt="Review photo"
                                    className="w-20 h-20 object-cover rounded border"
                                />
                                <div className="absolute -bottom-1 -left-1 bg-white rounded-full w-6 h-6 flex items-center justify-center border">
                                    <div className="flex items-center gap-0.5">
                                        <span className="text-xs font-bold text-gray-900">5</span>
                                        <Star className="w-2 h-2 text-gray-900 fill-current" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                                    Ordenar
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                                    Calificación
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-blue-500" />
                            <span>Comprado a Tienda oficial Samsung ✔</span>
                        </div>
                    </div>

                    {/* Featured Reviews */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-base font-semibold text-gray-900">Opiniones destacadas</h3>
                            <span className="text-sm text-gray-600">50 comentarios</span>
                        </div>

                        {/* AI Summary */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                Es un dispositivo que destaca por su excelente relación precio-calidad. Ofrece un rendimiento fluido, una batería de larga duración y una buena calidad de fotos. Además, su diseño es atractivo y cumple con las expectativas de los usuarios en términos de funcionalidad y eficiencia.
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-blue-600">
                                    <Diamond className="w-3 h-3" />
                                    <span>Resumen de opiniones generado por IA</span>
                                </div>
                                <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 bg-white px-2 py-1 rounded border">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>Es útil</span>
                                    <span className="ml-1">0</span>
                                </button>
                            </div>
                        </div>

                        {/* Individual Reviews */}
                        <div className="space-y-4">
                            {mockReviews.map((review) => (
                                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {renderStars(review.rating, "sm")}
                                            {review.verified && (
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <Check className="w-3 h-3 text-blue-500" />
                                                    <span>Comprado a Tienda oficial Samsung ✔</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2">{review.text}</p>
                                    <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 bg-white px-2 py-1 rounded border">
                                        <ThumbsUp className="w-3 h-3" />
                                        <span>Es útil</span>
                                        <span className="ml-1">{review.helpful}</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
