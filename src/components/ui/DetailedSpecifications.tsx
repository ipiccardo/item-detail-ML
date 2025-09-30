"use client";

import { JSX } from "react";

interface DetailedSpecificationsProps {
    className?: string;
}

export const DetailedSpecifications = ({ className = "" }: DetailedSpecificationsProps): JSX.Element => {

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
        { label: "Tamaño de la pantalla", value: "6,7\"" },
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

    const renderSpecSection = (title: string, specs: Array<{ label: string; value: string }>): JSX.Element => (
        <div className="ml-card p-6">
            <h3 className="text-lg font-semibold ml-text-primary mb-4">{title}</h3>
            <div className="space-y-0">
                {specs.map((spec, index) => (
                    <div
                        key={index}
                        className={`py-3 px-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } border-b border-gray-200 last:border-b-0`}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="font-medium ml-text-primary">{spec.label}</div>
                            <div className="ml-text-secondary">{spec.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">

                    {renderSpecSection("Sistema operativo", operatingSystemSpecs)}
                    {renderSpecSection("Conectividad", connectivitySpecs)}
                    {renderSpecSection("Cámara", cameraSpecs)}
                    {renderSpecSection("Batería", batterySpecs)}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {renderSpecSection("Tarjeta SIM", simCardSpecs)}
                    {renderSpecSection("Memoria", memorySpecs)}
                    {renderSpecSection("Pantalla", screenSpecs)}
                    {renderSpecSection("Peso y dimensiones", weightDimensionsSpecs)}
                    {renderSpecSection("Otros", otherSpecs)}
                    {renderSpecSection("Diseño y resistencia", designResistanceSpecs)}
                </div>
            </div>
        </div>
    );
};
