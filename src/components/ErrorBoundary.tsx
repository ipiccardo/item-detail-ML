"use client";

import { JSX, useEffect } from "react";

interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps): JSX.Element {
    useEffect(() => {
        // eslint-disable-next-line no-console
        console.error("Error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ¡Oops! Algo salió mal
                </h2>
                <p className="text-gray-600 mb-6">
                    No pudimos cargar el producto. Por favor, intenta nuevamente.
                </p>
                <button
                    onClick={reset}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium
            hover:bg-blue-700 transition-colors"
                >
                    Intentar nuevamente
                </button>
            </div>
        </div>
    );
}