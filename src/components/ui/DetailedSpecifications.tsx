"use client";

import { JSX } from "react";
import { useSpecificationsExpansionStore } from "@/stores/specificationsExpansionStore";

interface DetailedSpecificationsProps {
    className?: string;
}

export const DetailedSpecifications = ({ className = "" }: DetailedSpecificationsProps): JSX.Element => {
    const isExpanded = useSpecificationsExpansionStore((state) => state.isExpanded);
    const toggleExpansion = useSpecificationsExpansionStore((state) => state.toggleExpansion);

    const generalSpecs = [
        { label: "Marca", value: "Samsung" },
        { label: "Línea", value: "Galaxy" },
        { label: "Modelo", value: "Samsung Galaxy A26" },
        { label: "Color", value: "Blanco" },
    ];

    const operatingSystemSpecs = [
        { label: "Nombre del sistema operativo", value: "Android" },
    ];

    const connectivitySpecs = [
        { label: "Red móvil", value: "5G" },
        { label: "Con Wi-Fi", value: "Sí" },
        { label: "Con Bluetooth", value: "Sí" },
    ];

    const cameraSpecs = [
        { label: "Resolución de la cámara frontal principal", value: "13 Mpx" },
        { label: "Con cámara", value: "Sí" },
    ];

    const batterySpecs = [
        { label: "Capacidad de la batería", value: "5 Ah" },
        { label: "Con batería removible", value: "No" },
    ];

    const simCardSpecs = [
        { label: "Es Dual SIM", value: "No" },
        { label: "Cantidad de ranuras para tarjeta SIM", value: "1" },
        { label: "Con eSIM", value: "No" },
    ];

    const memorySpecs = [
        { label: "Memoria interna", value: "256 GB" },
        { label: "Memoria RAM", value: "8 GB" },
    ];

    const screenSpecs = [
        { label: "Tamaño de la pantalla", value: "6.7 \"" },
        { label: "Tipo de resolución de la pantalla", value: "Full HD+" },
        { label: "Resolución de la pantalla", value: "1080 px x 2340 px" },
        { label: "Con pantalla táctil", value: "Sí" },
        { label: "Con pantalla plegable", value: "No" },
        { label: "Con pantalla secundaria táctil", value: "No" },
    ];

    const weightDimensionsSpecs = [
        { label: "Peso", value: "200 g" },
        { label: "Altura x Ancho x Profundidad", value: "16.4 cm x 7.75 cm x 7.7 mm" },
    ];

    const otherSpecs = [
        { label: "Es celular de juego", value: "No" },
        { label: "Es celular robusto", value: "No" },
        { label: "Incluye lápiz", value: "No" },
    ];

    const designResistanceSpecs = [
        { label: "Con teclado QWERTY físico", value: "No" },
        { label: "Es resistente al agua", value: "Sí" },
        { label: "Es resistente al polvo", value: "Sí" },
    ];

    const renderSpecRow = (spec: { label: string; value: string }, index: number): JSX.Element => (
        <div
            key={index}
            className={`grid grid-cols-2 gap-4 py-3 px-4 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
        >
            <div className="text-sm ml-text-primary">{spec.label}</div>
            <div className="text-sm font-semibold ml-text-primary">{spec.value}</div>
        </div>
    );

    const renderSpecSection = (title: string, specs: Array<{ label: string; value: string }>): JSX.Element => (
        <div className="mb-6">
            <h3 className="text-base font-semibold ml-text-primary mb-3">{title}</h3>
            <div className="border border-gray-200 rounded-md overflow-hidden">
                {specs.map((spec, index) => renderSpecRow(spec, index))}
            </div>
        </div>
    );

    return (
        <div id="detailed-specifications" className={`${className}`}>

            {isExpanded && (
                <>

                    {/* Always visible sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                        {/* Left Column */}
                        <div>
                            {renderSpecSection("Características generales", generalSpecs)}
                            {renderSpecSection("Sistema operativo", operatingSystemSpecs)}
                            {renderSpecSection("Conectividad", connectivitySpecs)}
                            {renderSpecSection("Cámara", cameraSpecs)}
                        </div>

                        {/* Right Column */}
                        <div>
                            {renderSpecSection("Tarjeta SIM", simCardSpecs)}
                            {renderSpecSection("Memoria", memorySpecs)}
                            {renderSpecSection("Pantalla", screenSpecs)}
                        </div>
                    </div>

                    {/* Collapsible sections */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 mt-0">
                        {/* Left Column */}
                        <div>
                            {renderSpecSection("Batería", batterySpecs)}
                            {renderSpecSection("Peso y dimensiones", weightDimensionsSpecs)}
                        </div>

                        {/* Right Column */}
                        <div>
                            {renderSpecSection("Diseño y resistencia", designResistanceSpecs)}
                            {renderSpecSection("Otros", otherSpecs)}
                        </div>
                    </div>
                </>
            )}

            {/* Toggle Button */}
            <button
                onClick={toggleExpansion}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-4"
            >
                {isExpanded ? "Ver menos características" : "Ver todas las características"}
                <svg
                    className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
        </div>
    );
};
