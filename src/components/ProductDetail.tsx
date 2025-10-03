/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
"use client";

import { JSX } from "react";
import { Product } from "@/types/product";
import { formatNumber, generateStars } from "@/lib/utils";
import { useQuantity } from "@/hooks/useQuantity";
import { useVariants } from "@/hooks/useVariants";
import { useRelatedProductsService } from "@/hooks/useRelatedProductsService";
// import { useCompare } from "@/hooks/useCompare";
import { Heart } from "lucide-react";
import ImageGallery from "./ui/ImageGallery";
import ProductPrice from "./ui/ProductPrice";
import { VariantSelector } from "./ui/VariantSelector";
import { KeyFeatures } from "./ui/KeyFeatures";
import { ProductCharacteristics } from "./ui/ProductCharacteristics";
import { DetailedSpecifications } from "./ui/DetailedSpecifications";
import { RelatedProducts } from "./ui/RelatedProducts";
// import { CompareProducts } from "./ui/CompareProducts";
import { SellerInfoCard } from "./ui/SellerInfoCard";
import TradeInPlan from "./ui/TradeInPlan";
import QuestionsAndAnswers from "./ui/QuestionsAndAnswers";
import ProductReviews from "./ui/ProductReviews";
import Visa from "./ui/icons/Visa";
import Amex from "./ui/icons/Amex";
import Master from "./ui/icons/Master";
import Naranja from "./ui/icons/Naranja";
import VisaDebito from "./ui/icons/VisaDebito";
import Maestro from "./ui/icons/Maestro";
import Cabal from "./ui/icons/Cabal";
import MasterCardDebito from "./ui/icons/MasterCardDebito";
import PagoFacil from "./ui/icons/PagoFacil";
import Rapipago from "./ui/icons/Rapipago";

interface ProductDetailProps {
    product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps): JSX.Element {
    const { quantity, increment, decrement } = useQuantity(product.stock);
    const { selectedVariants, selectColor, selectStorage, getCurrentPrice, getCurrentImage } = useVariants(product);
    const { relatedProducts, isLoading: isLoadingRelated } = useRelatedProductsService(product.id);
    // const { products: compareProducts, removeFromCompare, clearCompare } = useCompare();

    // No custom scroll - let CSS handle it naturally

    // Handle actions
    const handleBuyNow = (): void => {
        // eslint-disable-next-line no-console
        console.log("Comprar ahora:", { productId: product.id, quantity });
        // Aquí iría la lógica de compra
    };

    const handleAddToCart = (): void => {
        // eslint-disable-next-line no-console
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
        <div className="min-h-screen bg-white relative" style={{ backgroundColor: "#F5F5F5" }}>
            {/* Main Content - 3 Column Layout */}
            <div className="max-w-[1200px] mx-auto pt-6 bg-white relative">
                <div className="flex items-start bg-white">
                    {/* Left Column - Images (Sticky) */}
                    <div className="w-[478px] flex-shrink-0 sticky top-4 self-start">
                        <div className="bg-white rounded-md p-6">
                            <ImageGallery images={updatedProduct.images} title={updatedProduct.title} />
                        </div>
                    </div>

                    {/* Middle Column - Product Info */}
                    <div className="flex-1 bg-white rounded-md max-w-[360px]">
                        <div className="mb-1">
                            <p className="text-sm ml-link">Ver más productos marca Samsung</p>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-sm ml-text-secondary">
                                <span>Nuevo</span>
                                <span>|</span>
                                <span>+{formatNumber(product.seller.sales)} vendidos</span>
                            </div>
                            <button className="ml-heart-button">
                                <Heart className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Best Seller Tag */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="ml-tag-mas-vendido">MÁS VENDIDO</span>
                            <span className="ml-link text-xs">5° en Celulares y Smartphones Samsung</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-xl font-normal ml-text-primary leading-snug mb-3">{product.title}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm ml-text-primary">{product.rating.average}</span>
                            <div className="flex items-center">
                                <span className="ml-rating text-sm">{generateStars(product.rating.average)}</span>
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

                        {/* Trade In Plan */}
                        <TradeInPlan className="mb-4" />

                        {/* Key Features */}
                        {product.keyFeatures && product.keyFeatures.length > 0 && <KeyFeatures features={product.keyFeatures} />}
                    </div>

                    {/* Right Column - Purchase Info (Fixed width, Scrolls with page) */}
                    <div className="w-[309px] flex-shrink-0 absolute flex right-6 flex-col gap-6">
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

                        {/* Mercado Libre Store Section */}
                        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm w-[309px]">
                            <div className="mb-4">
                                <img
                                    src="/ml-store-banner.png"
                                    alt="Mercado Libre"
                                    className="w-full h-24 object-cover rounded-md mb-3"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-base font-semibold ml-text-primary">Mercado Libre</h3>
                                    <button className="text-xs text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-50">
                                        Seguir
                                    </button>
                                </div>
                                <p className="text-xs text-gray-600 mb-1 flex items-center">
                                    Tienda oficial de Mercado Libre
                                    <svg className="w-3 h-3 inline ml-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </p>
                                <p className="text-[10px] text-gray-500 mb-3">
                                    <span className="font-semibold">+10mil</span> Seguidores  <span className="font-semibold">+1000</span> Productos
                                </p>
                            </div>

                            <div className="mb-4 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-2 mb-2 bg-green-50 p-2 rounded">
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-green-700">MercadoLíder Platinum</span>
                                </div>
                                <p className="text-[10px] text-green-700 mb-2">¡Uno de los mejores del sitio!</p>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div>
                                        <p className="text-sm font-semibold ml-text-primary">+1 M</p>
                                        <p className="text-[9px] text-gray-500">Ventas</p>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 mx-auto mb-0.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-[9px] text-gray-500">Buena atención</p>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 mx-auto mb-0.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                        </svg>
                                        <p className="text-[9px] text-gray-500">Entrega a tiempo</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full text-sm text-blue-600 hover:underline mb-3">
                                Ir a la tienda oficial
                            </button>

                            <div className="border-t border-gray-100 pt-3">
                                <p className="text-xs font-semibold ml-text-primary mb-2">Otras opciones de compra</p>
                                <p className="text-xs text-blue-600 hover:underline cursor-pointer">
                                    Ver 26 opciones desde $ 439.900
                                </p>
                            </div>
                        </div>

                        {/* Payment Methods Section */}
                        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm w-[309px]">
                            <h3 className="text-base font-semibold ml-text-primary mb-3">Medios de pago</h3>

                            <div className="mb-4 bg-green-600 text-white p-3 rounded-md">
                                <p className="text-xs font-semibold">¡Pagá el mismo precio en hasta 12 cuotas!</p>
                            </div>

                            <div className="mb-3">
                                <p className="text-xs font-semibold ml-text-primary mb-2">Cuotas sin Tarjeta</p>
                                <img
                                    src="/mercado-pago-logo.png"
                                    alt="Mercado Pago"
                                    className="h-6"
                                    onError={(e) => {
                                        e.currentTarget.src = "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"/>";
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <p className="text-xs font-semibold ml-text-primary mb-2">Tarjetas de crédito</p>
                                <div className="flex gap-2">
                                    <Visa />
                                    <Amex />
                                    <Master />
                                </div>
                                <Naranja />
                            </div>

                            <div className="mb-3">
                                <p className="text-xs font-semibold ml-text-primary mb-2">Tarjetas de débito</p>
                                <div className="flex gap-2">
                                    <VisaDebito />
                                    <Maestro />
                                    <Cabal />
                                </div>
                                <MasterCardDebito />
                            </div>

                            <div className="mb-3">
                                <p className="text-xs font-semibold ml-text-primary mb-2">Efectivo</p>
                                <div className="flex gap-2">
                                    <PagoFacil />
                                    <Rapipago />
                                </div>
                            </div>

                            <button className="text-xs text-blue-600 hover:underline">
                                Conocé otros medios de pago
                            </button>
                        </div>
                    </div>
                </div>

                {/* Full-width sections below main layout */}
                <div className="mt-4 ">
                    <div className="flex gap-4">
                        {/* Left side - Product sections */}
                        <div className="flex-1 space-y-4 max-w-[851px]">
                            {/* Product Characteristics */}
                            <div className="bg-white rounded-md p-6 ">
                                <ProductCharacteristics />
                            </div>

                            {/* Detailed Specifications */}
                            <div className="bg-white rounded-md p-6 mb-0 mt-0 py-0">
                                <DetailedSpecifications />
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-md p-6">
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h2 className="text-xl font-semibold ml-text-primary mb-4">Descripción</h2>
                                    <div className="space-y-4">
                                        <p className="text-sm ml-text-secondary leading-relaxed">
                                            Dale a tu estilo una ventaja con el Galaxy A26 5G. El cuerpo delgado se adapta cómodamente a la mano, mientras que la parte posterior de cristal brillante y el diseño limpio de la cámara llaman la atención.
                                        </p>
                                        <p className="text-sm ml-text-secondary leading-relaxed">
                                            La pantalla Super AMOLED de 6,7&quot; con un bisel delgado y minimizado lo atrae a su entretenimiento con una claridad vívida, desde el último video de su creador favorito hasta las fotos de sus seres queridos.
                                        </p>
                                        <p className="text-sm ml-text-secondary leading-relaxed">
                                            Disfruta de tus actividades favoritas al aire libre con tranquilidad. Con clasificación IP67 para resistencia al polvo y al agua, el Galaxy A26 5G está listo para capturar los momentos más destacados de los conciertos o grabar momentos épicos del entretiempo, incluso bajo la lluvia.
                                        </p>
                                        <p className="text-sm ml-text-secondary leading-relaxed">
                                            Ahora, con OIS para estabilizar tus tomas, puedes capturar las escenas más dinámicas con una claridad impresionante, ya sea que estés en una fiesta, un concierto o un juego deportivo.
                                        </p>
                                        <p className="text-sm ml-text-secondary leading-relaxed">
                                            Aumenta la diversión de navegar y jugar a vídeos en streaming, la CPU actualizada mantiene todo funcionando rápido y sin problemas.
                                        </p>
                                        <p className="text-sm ml-text-secondary leading-relaxed">
                                            Con una batería de larga duración de 5.000 mAh (típica), puede disfrutar de maratones de películas hasta 17 horas sin tener que cargar su Galaxy A26 5G.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Questions and Answers */}
                            <QuestionsAndAnswers />

                            {/* Product Reviews */}
                            <ProductReviews />

                            {/* Related Products */}
                            {!isLoadingRelated && relatedProducts.length > 0 && (
                                <div className="bg-white rounded-md p-6">
                                    <RelatedProducts products={relatedProducts} />
                                </div>
                            )}
                        </div>

                        {/* Right side - Empty space where third column was */}
                        <div className="w-[309px] flex-shrink-0">
                            {/* Empty space - no content here */}
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}
