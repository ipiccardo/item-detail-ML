import React from "react";
import { formatNumber } from "@/lib/utils";

interface ProductStatusProps {
    condition: string;
    salesCount: number;
    showCondition?: boolean;
    className?: string;
}

export default function ProductStatus({
    condition,
    salesCount,
    showCondition = true,
    className = "",
}: ProductStatusProps): React.JSX.Element {
    const conditionText = condition === "new" ? "Nuevo" : "Usado";

    return (
        <div className={`flex items-center gap-1.5 text-xs text-gray-600 ${className}`}>
            {showCondition && <span>{conditionText}</span>}
            {showCondition && salesCount > 0 && <span>|</span>}
            {salesCount > 0 && <span>+{formatNumber(salesCount)} vendidos</span>}
        </div>
    );
}

