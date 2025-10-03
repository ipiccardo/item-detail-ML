import { JSX } from "react";

export default function LoadingSpinner(): JSX.Element {
    return (
        <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "#3483FA" }}></div>
                <p className="text-sm ml-text-secondary">Cargando producto...</p>
            </div>
        </div>
    );
}