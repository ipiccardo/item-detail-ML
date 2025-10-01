"use client";

import { JSX } from "react";
import { Smartphone, Cpu, Camera } from "lucide-react";

interface ProductCharacteristicsProps {
    className?: string;
}

export const ProductCharacteristics = ({ className = "" }: ProductCharacteristicsProps): JSX.Element => {
    return (
        <div className={`ml-card p-6 ${className}`}>
            <h2 className="text-lg font-semibold ml-text-primary mb-6">Características del producto</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Screen Size */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                                <Smartphone className="w-4 h-4 text-gray-600" />
                            </div>
                            <div>
                                <span className="text-sm text-gray-600">Tamaño de la pantalla: </span>
                                <span className="text-sm font-bold ml-text-primary">6.7</span>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 ml-11">
                            (16.4 cm x 7.75 cm x 7.7 mm)
                        </div>
                        <div className="ml-11 space-y-2">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>PEQUEÑO</span>
                                <span>GRANDE</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Internal Memory */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                            <Cpu className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                            <span className="text-sm text-gray-600">Memoria interna: </span>
                            <span className="text-sm font-bold ml-text-primary">256 GB</span>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 flex align-bottom">
                    {/* Front Camera */}
                    <div className="flex items-center gap-3 mt-auto">
                        <div className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center">
                            <Camera className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                            <span className="text-sm text-gray-600">Cámara frontal principal: </span>
                            <span className="text-sm font-bold ml-text-primary">13 Mpx</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
