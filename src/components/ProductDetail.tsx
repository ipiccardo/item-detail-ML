"use client";

import { JSX } from "react";
import { Product } from "@/types/product";
import { formatNumber, generateStars } from "@/lib/utils";
import { useQuantity } from "@/hooks/useQuantity";
import { createProductActions } from "@/handlers/productHandlers";
import {
    Star,
    Truck,
    CreditCard,
    MapPin,
} from "lucide-react";
import ImageGallery from "./ui/ImageGallery";
import ProductPrice from "./ui/ProductPrice";
import ProductActions from "./ui/ProductActions";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps): JSX.Element {
    const { quantity, increment, decrement } = useQuantity(product.stock);
    const actions = createProductActions();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Images Section */}
                <ImageGallery images={product.images} title={product.title} />

                {/* Product Info Section */}
                <div className="space-y-6">
                    {/* Title and Rating */}
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                                <span className="text-yellow-500 text-sm">
                                    {generateStars(product.rating.average)}
                                </span>
                                <span className="ml-2 text-sm text-gray-600">
                                    {product.rating.average}
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                ({formatNumber(product.rating.totalReviews)} opiniones)
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Vendido por {product.seller.name}</span>
                            <span>•</span>
                            <span>{product.seller.location}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <ProductPrice product={product} />

                    {/* Stock and Quantity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Cantidad:</span>
                            <div className="flex items-center border border-gray-300 rounded">
                                <button
                                    onClick={decrement}
                                    className="px-3 py-1 hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                                <button
                                    onClick={increment}
                                    className="px-3 py-1 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">
                                ({product.stock} disponibles)
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <ProductActions actions={actions} />
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-700 mb-2">
                            <Truck className="w-5 h-5" />
                            <span className="font-medium">Envío gratis</span>
                        </div>
                        <p className="text-sm text-green-600">
                            Llega {product.shipping.estimatedDays} a {product.seller.location}
                        </p>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-3">
                        <h3 className="font-medium text-gray-900">Medios de pago</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {product.paymentMethods.map((method, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                    <CreditCard className="w-4 h-4" />
                                    <span>{method}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Seller Info */}
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-3">Información del vendedor</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{product.seller.name}</span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm text-gray-600">{product.seller.reputation}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span>{product.seller.location}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                                {formatNumber(product.seller.sales)} ventas
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción del producto</h2>
                <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
            </div>

            {/* Specifications */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Especificaciones técnicas
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-2 border-b
                border-gray-200 last:border-b-0">
                                <span className="font-medium text-gray-700">{key}:</span>
                                <span className="text-gray-600">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}