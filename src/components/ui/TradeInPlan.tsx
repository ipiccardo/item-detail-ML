/* eslint-disable max-len */
import React from "react";

interface TradeInPlanProps {
    className?: string;
}

export default function TradeInPlan({ className = "" }: TradeInPlanProps): React.JSX.Element {
    return (
        <div className={`bg-white border border-gray-200 rounded-md p-4 shadow-sm ${className}`}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <h3 className="text-base font-bold text-black">Ahorrá con Plan Canje Extra</h3>
            </div>

            {/* Content */}
            <div className="mb-4">
                <p className="text-sm text-black mb-2">
                    Recibí hasta{" "}
                    <span className="text-green-600 font-bold">$ 500.000</span>{" "}
                    por tu celular usado.
                </p>
                <p className="text-sm text-black">
                    Además,{" "}
                    <span className="text-green-600 font-bold">obtén dinero extra</span>{" "}
                    si comprás este producto y entregás un Samsung o iPhone.
                </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Cotizar mi celular
                </button>
                <button className="flex-1 bg-blue-100 text-blue-600 text-sm font-medium py-2.5 px-4 rounded-md hover:bg-blue-200 transition-colors">
                    Cómo funciona
                </button>
            </div>
        </div>
    );
}
