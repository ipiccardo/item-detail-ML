interface FooterToggleButtonProps {
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
}

/**
 * Componente atómico para el botón de toggle del footer
 */
export const FooterToggleButton: React.FC<FooterToggleButtonProps> = ({
    isOpen,
    onToggle,
    className = "",
}) => {
    return (
        <button
            onClick={onToggle}
            className={`w-full hover:bg-gray-200 transition-colors duration-200 py-4 ${className}`}
            style={{ backgroundColor: "rgb(245, 245, 245)" }}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar información del footer" : "Abrir información del footer"}
        >
            <div className="flex items-center justify-center space-x-2">
                <span className="text-gray-700 font-medium">Más información</span>
                <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </button>
    );
};
