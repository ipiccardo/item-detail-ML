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
        <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ backgroundColor: "#F5F5F5" }}>
            <div className="text-center ml-card p-8">
                <h2 className="text-2xl font-bold ml-text-primary mb-4">
                    ¡Oops! Algo salió mal
                </h2>
                <p className="ml-text-secondary mb-6">
                    No pudimos cargar el producto. Por favor, intenta nuevamente.
                </p>
                <button
                    onClick={reset}
                    className="ml-button-primary px-6 py-3 text-lg font-semibold"
                >
                    Intentar nuevamente
                </button>
            </div>
        </div>
    );
}