import React from "react";

interface KeyFeaturesProps {
    features: string[];
    className?: string;
}

export const KeyFeatures: React.FC<KeyFeaturesProps> = ({ features, className = "" }) => {
    if (!features || features.length === 0) {
        return null;
    }

    return (
        <div className={`bg-white ${className}`}>
            <h3 className="text-lg font-bold ml-text-primary mb-4">
                Lo que tenés que saber de este producto
            </h3>
            <ul className="space-y-2 mb-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                        <span className="text-base ml-text-secondary">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className="text-base ml-link hover:underline">
                Ver características
            </button>
        </div>
    );
};
