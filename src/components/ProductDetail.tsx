/* eslint-disable max-len */
"use client";

import { JSX } from "react";
import { Product } from "@/types/product";
import { formatNumber, generateStars } from "@/lib/utils";
import { useQuantity } from "@/hooks/useQuantity";
import { useVariants } from "@/hooks/useVariants";
import { useRelatedProductsService } from "@/hooks/useRelatedProductsService";
import { useCompare } from "@/hooks/useCompare";
import { Heart } from "lucide-react";
import ImageGallery from "./ui/ImageGallery";
import ProductPrice from "./ui/ProductPrice";
import { VariantSelector } from "./ui/VariantSelector";
import { KeyFeatures } from "./ui/KeyFeatures";
import { ProductCharacteristics } from "./ui/ProductCharacteristics";
import { DetailedSpecifications } from "./ui/DetailedSpecifications";
import { RelatedProducts } from "./ui/RelatedProducts";
import { CompareProducts } from "./ui/CompareProducts";
import { SellerInfoCard } from "./ui/SellerInfoCard";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps): JSX.Element {
    const { quantity, increment, decrement } = useQuantity(product.stock);
    const { selectedVariants, selectColor, selectStorage, getCurrentPrice, getCurrentImage } = useVariants(product);
    const { relatedProducts, isLoading: isLoadingRelated } = useRelatedProductsService(product.id);
    const { products: compareProducts, removeFromCompare, clearCompare } = useCompare();

    // Handle actions
    const handleBuyNow = () => {
        console.log("Comprar ahora:", { productId: product.id, quantity });
        // Aquí iría la lógica de compra
    };

    const handleAddToCart = () => {
        console.log("Agregar al carrito:", { productId: product.id, quantity });
        // Aquí iría la lógica de agregar al carrito
    };

    // Update product price based on selected variants
    const currentPrice = getCurrentPrice();
    const currentImage = getCurrentImage();
    const updatedProduct = {
        ...product,
        price: { ...product.price, amount: currentPrice },
        images: currentImage ? [currentImage, ...product.images.filter((img) => img !== currentImage)] : product.images,
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
            {/* Main Content - 3 Column Layout */}
            <div className="max-w-7xl mx-auto  pt-6">
                <div className="grid grid-cols-12 gap-6 bg-white">
                    {/* Left Column - Images */}
                    <div className="col-span-12 lg:col-span-5  mt-10">
                        <ImageGallery images={updatedProduct.images} title={updatedProduct.title} />
                    </div>

                    {/* Center Column - Product Info */}
                    <div className="col-span-12 lg:col-span-4 mt-10">
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm ml-link">Ver más productos marca Samsung</p>
                            </div>
                            {/* Status and Actions */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className=" px-2 rounded text-xs\n font-medium">Nuevo</span>
                                    <span>|</span>
                                    <span>+{formatNumber(product.seller.sales)} vendidos</span>
                                </div>
                                <button className="ml-heart-button">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Best Seller Tag */}
                            <div className="flex items-center gap-2">
                                <span className="ml-tag-mas-vendido">MÁS VENDIDO</span>
                                <span className="text-sm ml-link">5° en Celulares y Smartphones Samsung</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl font-bold ml-text-primary leading-tight !mt-3">{product.title}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 !mt-3">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-semibold ml-text-primary">{product.rating.average}</span>
                                    <span className="ml-rating text-lg ">{generateStars(product.rating.average)}</span>
                                </div>
                                <span className="text-sm ml-text-secondary">({formatNumber(product.rating.totalReviews)})</span>
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
                            {product.keyFeatures && product.keyFeatures.length > 0 && <KeyFeatures features={product.keyFeatures} />}
                        </div>
                    </div>

                    {/* Right Column - Purchase Info */}
                    <div className="col-span-12 lg:col-span-3">
                        <SellerInfoCard
                            seller={product.seller}
                            shipping={product.shipping}
                            stock={product.stock}
                            quantity={quantity}
                            onIncrement={increment}
                            onDecrement={decrement}
                            onBuyNow={handleBuyNow}
                            onAddToCart={handleAddToCart}
                        />
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="max-w-7xl  mx-auto  bg-white">

                <div className="max-w-4xl  bg-white">
                    {/* Product Characteristics */}
                    <ProductCharacteristics />
                    {/* Detailed Specifications */}
                    <DetailedSpecifications className="mt-6" />

                    <div className="ml-card p-6">
                        <h2 className="text-lg font-semibold ml-text-primary mb-4">Descripción del producto</h2>
                        <div className="prose max-w-none">
                            <p className="ml-text-secondary leading-relaxed">{product.description}</p>
                        </div>
                    </div>


                    {/* Compare Products */}
                    {compareProducts.length > 0 && (
                        <CompareProducts
                            products={compareProducts}
                            onRemove={removeFromCompare}
                            onClear={clearCompare}
                            className="mt-6"
                        />
                    )}

                    {/* Related Products */}
                    {!isLoadingRelated && relatedProducts.length > 0 && (
                        <RelatedProducts products={relatedProducts} className="mt-6" />
                    )}
                </div>
            </div>
        </div>
    );
}
