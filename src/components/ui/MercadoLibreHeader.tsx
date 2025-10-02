/* eslint-disable @next/next/no-img-element */
"use client";

import { JSX } from "react";
import { Search, MapPin, ShoppingCart, Menu, ChevronDown } from "lucide-react";

export const MercadoLibreHeader = (): JSX.Element => {
    return (
        <div className="ml-header">
            {/* Top Banner */}
            <div className="bg-blue-600 text-white text-center py-1 text-xs">
                ENVÍO GRATIS EN TU PRIMERA COMPRA EXCLUSIVO EN APP
            </div>

            {/* Main Header */}
            <div className="max-w-[1200px] mx-auto  py-3">
                {/* Top Row */}
                <div className="flex items-center justify-between mb-3">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.150/mercadolibre/logo_large_plus@2x.webp"
                            alt="MercadoLibre"
                            className="h-8 w-auto"
                        />
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8 px-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar productos, marcas y más..."
                                className="w-full h-10 px-4 pr-12 border border-gray-300 rounded-md text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>Enviar a Capital Federal</span>
                        </div>
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

                {/* Navigation */}
                <div className="flex items-center gap-6 text-sm">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                        <Menu className="w-4 h-4" />
                        <span>Categorías</span>
                        <ChevronDown className="w-3 h-3" />
                    </button>
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
                </div>
            </div>
        </div>
    );
};
