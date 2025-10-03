/* eslint-disable max-len */
"use client";

import { JSX } from "react";
import { ChevronRight } from "lucide-react";

interface CategoriesDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CategoriesDropdown = ({ isOpen, onClose }: CategoriesDropdownProps): JSX.Element => {
    const categories = [
        "Vehículos",
        "Inmuebles",
        "Supermercado",
        "Tecnología",
        "Farmacia",
        "Compra Internacional",
        "Hogar y Muebles",
        "Electrodomésticos",
        "Herramientas",
        "Construcción",
        "Deportes y Fitness",
        "Accesorios para Vehículos",
        "Para tu Negocio",
        "Mascotas",
        "Moda",
        "Juegos y Juguetes",
        "Bebés",
        "Belleza y Cuidado Personal",
        "Salud y Equipamiento Médico",
        "Industrias y Oficinas",
        "Agro",
        "Productos Sustentables",
    ];

    if (!isOpen) return <></>;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50"
                onClick={onClose}
            />

            {/* Dropdown */}
            <div className="absolute top-full left-0 z-50 w-80 bg-gray-800 text-white shadow-lg">
                <div className="py-2">
                    {categories.map((category, index) => (
                        <div key={index} className="relative group">
                            <button
                                className="w-full px-4 py-3 text-left hover:bg-gray-700 flex items-center justify-between"
                                onClick={() => {
                                    // Handle category click
                                    console.log(`Clicked category: ${category}`);
                                    onClose();
                                }}
                            >
                                <span className="text-sm">{category}</span>
                                {category === "Tecnología" && (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                )}
                            </button>

                            {/* Submenu for Tecnología */}
                            {category === "Tecnología" && (
                                <div className="absolute left-full top-0 w-80 bg-gray-800 text-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="py-2">
                                        <button className="w-full px-4 py-3 text-left hover:bg-gray-700 text-sm">
                                            Celulares y Teléfonos
                                        </button>
                                        <button className="w-full px-4 py-3 text-left hover:bg-gray-700 text-sm">
                                            Computación
                                        </button>
                                        <button className="w-full px-4 py-3 text-left hover:bg-gray-700 text-sm">
                                            Cámaras y Accesorios
                                        </button>
                                        <button className="w-full px-4 py-3 text-left hover:bg-gray-700 text-sm">
                                            Audio y Video
                                        </button>
                                        <button className="w-full px-4 py-3 text-left hover:bg-gray-700 text-sm">
                                            Gaming
                                        </button>
                                        <button className="w-full px-4 py-3 text-left hover:bg-gray-700 text-sm">
                                            Smart Home
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
