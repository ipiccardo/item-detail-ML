"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice, formatNumber, generateStars } from "@/lib/utils";
import {
    Star,
    Truck,
    CreditCard,
    MapPin,
    Heart,
    Share2,
} from "lucide-react";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps): JSX.Element {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleBuyNow = (): void => {
        // eslint-disable-next-line no-alert
        alert("Funcionalidad de compra no implementada en este prototipo");
    };

    const handleAddToCart = (): void => {
        // eslint-disable-next-line no-alert
        alert("Funcionalidad de carrito no implementada en este prototipo");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Images Section */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden 
                  border-2 relative ${selectedImage === index ? "border-blue-500" : "border-gray-200"}`}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.title} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

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
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">
                                {formatPrice(product.price.amount)}
                            </span>
                            {product.price.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">
                                    {formatPrice(product.price.originalPrice)}
                                </span>
                            )}
                            {product.price.discount && (
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                                    {product.price.discount}% OFF
                                </span>
                            )}
                        </div>
                        {product.price.originalPrice && (
                            <p className="text-sm text-gray-600 mt-1">
                                En 12 cuotas sin interés de {formatPrice(product.price.amount / 12)}
                            </p>
                        )}
                    </div>

                    {/* Stock and Quantity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Cantidad:</span>
                            <div className="flex items-center border border-gray-300 rounded">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-1 hover:bg-gray-100"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
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
                        <div className="flex gap-3">
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg
                  font-medium hover:bg-blue-700 transition-colors"
                            >
                                Comprar ahora
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 border border-blue-600 text-blue-600 py-3 px-6
                  rounded-lg font-medium hover:bg-blue-50 transition-colors"
                            >
                                Agregar al carrito
                            </button>
                        </div>

                        {/* Additional Actions */}
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                <Heart className="w-5 h-5" />
                                <span>Favoritos</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                                <Share2 className="w-5 h-5" />
                                <span>Compartir</span>
                            </button>
                        </div>
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