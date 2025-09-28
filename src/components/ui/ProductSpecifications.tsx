import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductSpecificationsProps {
    specifications: { [key: string]: string };
    className?: string;
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({
    specifications,
    className = "",
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showAll, setShowAll] = useState(false);

    if (!specifications || Object.keys(specifications).length === 0) {
        return null;
    }

    const specificationEntries = Object.entries(specifications);
    const visibleSpecs = showAll ? specificationEntries : specificationEntries.slice(0, 6);

    const toggleExpanded = (): void => {
        setIsExpanded(!isExpanded);
    };

    const toggleShowAll = (): void => {
        setShowAll(!showAll);
    };

    return (
        <div className={`border-t pt-6 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                    Características del producto
                </h3>
                <button
                    onClick={toggleExpanded}
                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                >
                    <span>{isExpanded ? "Ver menos" : "Ver todas las características"}</span>
                    {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </button>
            </div>

            {isExpanded && (
                <div className="space-y-4">
                    {visibleSpecs.map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <span className="text-sm font-medium text-gray-600">{key}:</span>
                            <span className="text-sm text-gray-900 text-right max-w-xs">{value}</span>
                        </div>
                    ))}

                    {specificationEntries.length > 6 && (
                        <button
                            onClick={toggleShowAll}
                            className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-2"
                        >
                            {showAll ? "Ver menos" : `Ver todas las ${specificationEntries.length} características`}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
