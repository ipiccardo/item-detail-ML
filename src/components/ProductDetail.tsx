"use client";

import { JSX } from "react";
import { Product } from "@/types/product";
import { formatNumber, generateStars } from "@/lib/utils";
import { useQuantity } from "@/hooks/useQuantity";
import { useVariants } from "@/hooks/useVariants";
import { useRelatedProductsService } from "@/hooks/useRelatedProductsService";
import { useCompare } from "@/hooks/useCompare";
import { useFavorites } from "@/hooks/useFavorites";
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
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { VariantSelector } from "./ui/VariantSelector";
import { KeyFeatures } from "./ui/KeyFeatures";
import { ProductSpecifications } from "./ui/ProductSpecifications";
import { RelatedProducts } from "./ui/RelatedProducts";
import { CompareProducts } from "./ui/CompareProducts";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps): JSX.Element {
    const { quantity, increment, decrement } = useQuantity(product.stock);
    const {
        selectedVariants,
        selectColor,
        selectStorage,
        getCurrentPrice,
        getCurrentImage,
    } = useVariants(product);
    const { relatedProducts, isLoading: isLoadingRelated } = useRelatedProductsService(product.id);
    const {
        products: compareProducts,
        removeFromCompare,
        clearCompare,
        addToCompare,
        isInCompare,
        canAddMore,
    } = useCompare();
    const { toggleFavorite, isFavorite } = useFavorites();

    const actions = createProductActions(
        product,
        { toggleFavorite, isFavorite },
        { addToCompare, isInCompare, canAddMore },
    );

    // Update product price based on selected variants
    const currentPrice = getCurrentPrice();
    const currentImage = getCurrentImage();
    const updatedProduct = {
        ...product,
        price: { ...product.price, amount: currentPrice },
        images: currentImage ? [currentImage, ...product.images.filter(img => img !== currentImage)] : product.images,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            {/* Breadcrumbs */}
            {product.breadcrumbs && product.breadcrumbs.length > 0 && (
                <Breadcrumbs items={product.breadcrumbs} className="mb-8" />
            )}

            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images Section */}
                    <ImageGallery images={updatedProduct.images} title={updatedProduct.title} />

                    {/* Product Info Section */}
                    <div className="space-y-8">
                        {/* Title and Rating */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                    <span className="text-yellow-500 text-lg">
                                        {generateStars(product.rating.average)}
                                    </span>
                                    <span className="ml-2 text-sm font-semibold text-gray-700">
                                        {product.rating.average}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500 font-medium">
                                    ({formatNumber(product.rating.totalReviews)} opiniones)
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                                <span className="font-medium">Vendido por {product.seller.name}</span>
                                <span className="text-gray-400">•</span>
                                <span>{product.seller.location}</span>
                            </div>
                        </div>

                        {/* Price */}
                        <ProductPrice product={updatedProduct} />

                        {/* Variant Selector */}
                        <VariantSelector
                            product={product}
                            selectedColor={selectedVariants.color}
                            selectedStorage={selectedVariants.storage}
                            onColorSelect={selectColor}
                            onStorageSelect={selectStorage}
                        />

                        {/* Key Features */}
                        {product.keyFeatures && product.keyFeatures.length > 0 && (
                            <KeyFeatures features={product.keyFeatures} />
                        )}

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
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 text-green-700 mb-3">
                                <Truck className="w-6 h-6" />
                                <span className="font-bold text-lg">Envío gratis</span>
                            </div>
                            <p className="text-sm text-green-600 font-medium mb-3">
                                Llega {product.shipping.estimatedDays} a {product.seller.location}
                            </p>
                            {product.shipping.calculator && (
                                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium
                                hover:underline transition-colors duration-200">
                                    {product.shipping.calculator}
                                </button>
                            )}
                        </div>

                        {/* Payment Methods */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900">Medios de pago</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {product.paymentMethods.map((method, index) => (
                                    <div key={index} className="flex items-center gap-3 text-sm text-gray-600
                                    bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                        <CreditCard className="w-4 h-4 text-blue-600" />
                                        <span className="font-medium">{method}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Seller Info */}
                        <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Información del vendedor</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-lg text-gray-900">{product.seller.name}</span>
                                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="text-sm font-semibold text-gray-700">{product.seller.reputation}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    <span className="font-medium">{product.seller.location}</span>
                                </div>
                                <div className="text-sm text-gray-600 font-medium">
                                    {formatNumber(product.seller.sales)} ventas
                                </div>
                                {product.seller.warranty && (
                                    <div className="text-sm text-gray-600 font-medium bg-white px-3 py-2 rounded-lg">
                                        {product.seller.warranty}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción del producto</h2>
                <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                </div>
            </div>

            {/* Specifications */}
            <ProductSpecifications specifications={product.specifications} className="mt-12" />

            {/* Compare Products */}
            {compareProducts.length > 0 && (
                <CompareProducts
                    products={compareProducts}
                    onRemove={removeFromCompare}
                    onClear={clearCompare}
                    className="mt-12"
                />
            )}

            {/* Related Products */}
            {!isLoadingRelated && relatedProducts.length > 0 && (
                <RelatedProducts products={relatedProducts} className="mt-12" />
            )}
        </div>
    );
}