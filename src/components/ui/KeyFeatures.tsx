import React from "react";
import { CheckCircle } from "lucide-react";

interface KeyFeaturesProps {
    features: string[];
    className?: string;
}

export const KeyFeatures: React.FC<KeyFeaturesProps> = ({ features, className = "" }) => {
    if (!features || features.length === 0) {
        return null;
    }

    return (
        <div className={`bg-gray-50 p-4 rounded-lg ${className}`}>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
                Lo que tenés que saber de este producto
            </h3>
            <ul className="space-y-2">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
