"use client";

import { JSX, useMemo } from "react";
import { Product } from "@/types/product";
import { useQuantity, useVariants, useRelatedProductsService, useProductActions } from "@/hooks";
import ImageGallery from "./ui/ImageGallery";
import ProductPrice from "./ui/ProductPrice";
import { VariantSelector } from "./ui/VariantSelector";
import { KeyFeatures } from "./ui/KeyFeatures";
import TradeInPlan from "./ui/TradeInPlan";
import { ProductHeader } from "./ui/ProductHeader";
import { ProductMobileActions } from "./ui/ProductMobileActions";
import { ProductSidebar } from "./ui/ProductSidebar";
import { ProductMobileSections } from "./ui/ProductMobileSections";
import { ProductMainContent } from "./ui/ProductMainContent";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps): JSX.Element {
    // Hooks for state management
    const { quantity, increment, decrement } = useQuantity(product.stock);
    const { selectedVariants, selectColor, selectStorage, getCurrentPrice, getCurrentImage } = useVariants(product);
    const { relatedProducts, isLoading: isLoadingRelated } = useRelatedProductsService(product.id);
    const { handleBuyNow, handleAddToCart } = useProductActions({ productId: product.id, quantity });

    // Update product with selected variants
    const updatedProduct = useMemo(() => {
        const currentPrice = getCurrentPrice();
        const currentImage = getCurrentImage();
        return {
            ...product,
            price: { ...product.price, amount: currentPrice },
            images: currentImage
                ? [currentImage, ...product.images.filter((img) => img !== currentImage)]
                : product.images,
        };
    }, [product, getCurrentPrice, getCurrentImage]);

    return (
        <div className="min-h-screen bg-white relative" style={{ backgroundColor: "#F5F5F5" }}>
            <div className="max-w-[1200px] mx-auto lg:pt-6 bg-white relative">
                <div className="flex flex-col lg:flex-row items-start bg-white">
                    {/* Left Column - Images (Sticky on desktop) */}
                    <div className="w-full lg:w-[478px] lg:flex-shrink-0 lg:sticky lg:top-4 lg:self-start">
                        <div className="bg-white lg:rounded-md lg:p-6 p-0">
                            <ImageGallery images={updatedProduct.images} title={updatedProduct.title} />
                        </div>
                    </div>

                    {/* Middle Column - Product Info */}
                    <div className="w-full lg:flex-1 bg-white lg:rounded-md lg:max-w-[360px] px-4 lg:px-0 pt-3 lg:pt-0">
                        <ProductHeader
                            title={product.title}
                            rating={product.rating}
                            sales={product.seller.sales}
                        />

                        <ProductPrice product={updatedProduct} />

                        <ProductMobileActions
                            stock={product.stock}
                            quantity={quantity}
                            onBuyNow={handleBuyNow}
                            onAddToCart={handleAddToCart}
                        />

                        <VariantSelector
                            product={product}
                            selectedColor={selectedVariants.color}
                            selectedStorage={selectedVariants.storage}
                            onColorSelect={selectColor}
                            onStorageSelect={selectStorage}
                        />

                        <TradeInPlan className="mb-4" />

                        {product.keyFeatures && product.keyFeatures.length > 0 && (
                            <KeyFeatures features={product.keyFeatures} />
                        )}
                    </div>

                    {/* Right Column - Sidebar (Desktop only) */}
                    <ProductSidebar
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

                {/* Full-width sections below main layout */}
                <div className="mt-4 px-4 lg:px-0 mb-4">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Left side - Product sections */}
                        <div className="flex-1 space-y-4 lg:max-w-[851px]">
                            <ProductMobileSections />
                            <ProductMainContent
                                relatedProducts={relatedProducts}
                                isLoadingRelated={isLoadingRelated}
                            />
                        </div>

                        {/* Right side - Empty space (desktop only) */}
                        <div className="hidden lg:block lg:w-[309px] lg:flex-shrink-0">
                            {/* Empty space - no content here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
