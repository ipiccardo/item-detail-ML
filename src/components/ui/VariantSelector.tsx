import React, { JSX } from "react";
import { Product } from "@/types/product";

interface VariantSelectorProps {
    product: Product;
    selectedColor?: string;
    selectedStorage?: string;
    onColorSelect: (colorValue: string) => void;
    onStorageSelect: (storageValue: string) => void;
    className?: string;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
    product,
    selectedColor,
    selectedStorage,
    onColorSelect,
    onStorageSelect,
    className = "",
}) => {
    const renderColorSelector = (): JSX.Element | null => {
        if (!product.variants?.color || product.variants.color.length === 0) {
            return null;
        }

        return (
            <div className="mb-4">
                <h3 className="text-sm font-semibold ml-text-primary mb-2">
                    Color: {product.variants.color.find(c => c.value === selectedColor)?.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {product.variants.color.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => onColorSelect(color.value)}
                            disabled={!color.available}
                            className={`
                w-8 h-8 rounded-full border-2 transition-all duration-200
                ${selectedColor === color.value
                                    ? "border-blue-500 ring-2 ring-blue-200"
                                    : "border-gray-300 hover:border-gray-400"
                                }
                ${!color.available
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer hover:scale-110"
                                }
              `}
                            style={{
                                backgroundColor: color.value === "white" ? "#ffffff" :
                                    color.value === "black" ? "#000000" :
                                        color.value === "blue" ? "#3b82f6" :
                                            color.value === "green" ? "#10b981" : "#ffffff",
                            }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const renderStorageSelector = (): JSX.Element | null => {
        if (!product.variants?.storage || product.variants.storage.length === 0) {
            return null;
        }

        return (
            <div className="mb-4">
                <h3 className="text-sm font-semibold ml-text-primary mb-2">Almacenamiento:</h3>
                <div className="flex flex-wrap gap-2">
                    {product.variants.storage.map((storage) => (
                        <button
                            key={storage.value}
                            onClick={() => onStorageSelect(storage.value)}
                            disabled={!storage.available}
                            className={`
                px-3 py-2 text-sm border rounded transition-colors
                ${selectedStorage === storage.value
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-300 hover:border-gray-400"
                                }
                ${!storage.available
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                }
              `}
                        >
                            {storage.name}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const hasColorVariants = product.variants?.color && product.variants.color.length > 0;
    const hasStorageVariants = product.variants?.storage && product.variants.storage.length > 0;

    if (!hasColorVariants && !hasStorageVariants) {
        return null;
    }

    return (
        <div className={className}>
            {renderColorSelector()}
            {renderStorageSelector()}
        </div>
    );
};
