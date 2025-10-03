import React from "react";

interface StockInfoProps {
    quantity: number;
    stock: number;
    className?: string;
}

export default function StockInfo({
    quantity,
    stock,
    className = "",
}: StockInfoProps): React.JSX.Element {
    return (
        <div className={`mb-4 pb-4 border-b border-gray-200 ${className}`}>
            <p className="text-sm font-semibold ml-text-primary mb-3">Stock disponible</p>
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">Cantidad: {quantity}</span>
                <span className="text-xs text-gray-500">({stock} disponibles)</span>
            </div>
        </div>
    );
}

