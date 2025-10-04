/* eslint-disable quotes */
/* eslint-disable @next/next/no-img-element */
"use client";

import { JSX, useState } from "react";
import { Search, MapPin, ShoppingCart, Menu, ChevronDown, X } from "lucide-react";
import { CategoriesDropdown } from "./CategoriesDropdown";
import { MobileMenu } from "./MobileMenu";

export const MercadoLibreHeader = (): JSX.Element => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="bg-yellow-400">
            {/* Top Banner - Desktop only */}
            <div className="hidden lg:block bg-blue-600 text-white text-center py-1 text-xs">
                ENVÍO GRATIS EN TU PRIMERA COMPRA EXCLUSIVO EN APP
            </div>

            {/* Main Header - Hide when mobile menu is open */}
            <div className={`max-w-[1200px] mx-auto px-4 lg:px-0 py-2 lg:py-3 ${isMobileMenuOpen ? 'hidden' : ''}`}>
                {/* Top Row */}
                <div className="flex items-center mb-2 lg:mb-3">
                    {/* Mobile: Menu + Logo */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <button
                            className="text-gray-600"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                        <img
                            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.151/mercadolibre/logo__small@2x.png"
                            alt="MercadoLibre"
                            className="h-7 w-auto block lg:hidden"
                        />
                        <img
                            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.150/mercadolibre/logo_large_plus@2x.webp"
                            alt="MercadoLibre"
                            className="h-7 w-auto hidden lg:block"
                        />
                    </div>

                    {/* Desktop: Logo */}
                    <div className="hidden lg:flex items-center gap-2">
                        <img
                            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.150/mercadolibre/logo_large_plus@2x.webp"
                            alt="MercadoLibre"
                            className="h-8 w-auto"
                        />
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 lg:max-w-2xl  px-4 lg:mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar productos, marcas y más..."
                                className="w-full h-9 lg:h-10 px-3 lg:px-4 pr-10 lg:pr-12 border border-gray-300
                                    rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile: Cart only */}
                    <button className="lg:hidden text-gray-600">
                        <ShoppingCart className="w-6 h-6" />
                    </button>

                    {/* Desktop: User Actions */}

                </div>

                {/* Mobile: Location */}
                <div className="lg:hidden flex items-center gap-1 text-xs text-gray-600 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>Enviar a Capital Federal</span>
                </div>

                {/* Navigation - Desktop only */}
                <div className="hidden lg:flex items-center gap-4 text-sm relative">
                    <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>Enviar a Capital Federal</span>
                    </div>
                    <button
                        className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    >
                        <Menu className="w-4 h-4 lg:hidden" />
                        <span>Categorías</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>

                    {/* Categories Dropdown */}
                    <CategoriesDropdown
                        isOpen={isCategoriesOpen}
                        onClose={() => setIsCategoriesOpen(false)}
                    />
                    <a href="#" className="text-gray-600 hover:text-blue-600">Ofertas</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">Cupones</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">Supermercado</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">Moda</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600 flex items-center gap-1">
                        <span>Mercado Play</span>
                        <span className="bg-green-500 text-white text-xs px-1 rounded">GRATIS</span>
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">Vender</a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">Ayuda</a>
                    <div className="hidden lg:flex items-center gap-4 text-sm ml-auto">
                        <div className="flex items-center gap-3">
                            <a href="#" className="text-gray-600 hover:text-blue-600">Creá tu cuenta</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Ingresá</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600">Mis compras</a>
                            <button className="text-gray-600 hover:text-blue-600">
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </div>
    );
};
