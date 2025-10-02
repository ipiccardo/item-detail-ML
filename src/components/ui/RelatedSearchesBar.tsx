"use client";

import { JSX } from "react";
import { ChevronRight, Share2 } from "lucide-react";

export const RelatedSearchesBar = (): JSX.Element => {
    const relatedSearches = [
        "tienda personal 2x1 celular",
        "celulares samsung",
        "samsung galaxy",
        "samsung a52s 5g",
        "cargador samsung",
    ];

    const breadcrumbs = [
        { label: "Volver", href: "#" },
        { label: "Celulares y Teléfonos", href: "#" },
        { label: "Celulares y Smartphones", href: "#" },
        { label: "Samsung", href: "#" },
    ];

    return (
        <div className="bg-gray-100 py-3">
            <div className="max-w-[1200px] mx-auto">
                {/* Related Searches */}
                <div className="flex items-center gap-4 text-sm mb-2">
                    <span className="text-gray-800 font-semibold">También puede interesarte:</span>
                    <div className="flex items-center gap-3">
                        {relatedSearches.map((search, index) => (
                            <a
                                key={index}
                                href="#"
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                {search}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Breadcrumbs and Actions */}
                <div className="flex items-center justify-between text-sm">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2">
                        {breadcrumbs.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <a
                                    href={item.href}
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    {item.label}
                                </a>
                                {index < breadcrumbs.length - 1 && (
                                    <ChevronRight className="w-3 h-3 text-gray-400" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-4">
                        <div className="w-px h-4 bg-gray-300"></div>
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            Vender uno igual
                        </a>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                        >
                            <Share2 className="w-3 h-3" />
                            Compartir
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
