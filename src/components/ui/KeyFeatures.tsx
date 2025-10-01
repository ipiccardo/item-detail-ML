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
        <div className={`mt-4 ${className}`}>
            <h3 className="text-[18px] font-semibold ml-text-primary mb-3">
                Lo que tenés que saber de este producto
            </h3>
            <ul className="space-y-2 mb-3">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-black rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-[13px] ml-text-primary leading-relaxed">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className="text-[14px] ml-link hover:underline">
                Ver características
            </button>
        </div>
    );
};
