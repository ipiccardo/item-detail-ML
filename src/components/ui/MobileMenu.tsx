/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { JSX } from "react";
import { X, Search, MapPin, ShoppingCart, Home, Tag, Play, Clock, Headphones, ShoppingBag, Shirt, Star, Store, FileText, DollarSign } from "lucide-react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps): JSX.Element => {
    if (!isOpen) return <></>;

    return (
        <div className="w-full bg-white">
            {/* Yellow Header Section */}
            <div className="bg-yellow-400 p-4">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4">
                    {/* Logo */}
                    <img
                        src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.150/mercadolibre/logo_large_plus@2x.webp"
                        alt="MercadoLibre"
                        className="h-6 w-auto"
                    />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Estoy buscando..."
                        className="w-full h-10 px-4 pr-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>Enviar a Capital Federal</span>
                </div>

                {/* Welcome Section */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-800">Bienvenido</div>
                        <div className="text-xs text-gray-600">Ingresa a tu cuenta para ver tus compras, favoritos, etc.</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium">
                        Ingresá
                    </button>
                    <button className="flex-1 bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded text-sm font-medium">
                        Creá tu cuenta
                    </button>
                </div>
            </div>

            {/* White Content Section */}
            <div className="bg-white p-4">
                {/* First Group */}
                <div className="space-y-1 mb-4">
                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <Home className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Inicio</span>
                    </button>

                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <Tag className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Ofertas</span>
                    </button>

                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <Play className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Mercado Play</span>
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded ml-auto">GRATIS</span>
                    </button>

                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <Clock className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Historial</span>
                    </button>

                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <Headphones className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Ayuda</span>
                    </button>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Second Group */}
                <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <ShoppingBag className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Supermercado</span>
                    </button>

                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <Shirt className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Moda</span>
                    </button>

                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <Star className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Más vendidos</span>
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded ml-auto">NUEVO</span>
                    </button>

                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <Store className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Tiendas oficiales</span>
                    </button>

                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <div className="w-5 h-5 flex flex-col justify-center items-center">
                            <div className="w-4 h-0.5 bg-gray-600 mb-0.5"></div>
                            <div className="w-4 h-0.5 bg-gray-600 mb-0.5"></div>
                            <div className="w-4 h-0.5 bg-gray-600"></div>
                        </div>
                        <span className="text-gray-800">Categorías</span>
                    </button>
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Third Group */}
                <div className="space-y-1">
                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Resumen</span>
                    </button>

                    <button className="w-full flex items-center gap-3 py-3 text-left hover:bg-gray-50">
                        <DollarSign className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">Vender</span>
                    </button>
                </div>
            </div>

        </div>
    );
};
