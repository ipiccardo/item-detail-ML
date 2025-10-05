import { FooterData } from "@/types/footer";
import { useFooterToggle } from "@/hooks/useFooterToggle";
import { FooterToggleButton } from "./FooterToggleButton";
import { FooterContent } from "./FooterContent";
import { FooterAlwaysVisible } from "./FooterAlwaysVisible";

interface FooterProps {
    data: FooterData;
    className?: string;
}

/**
 * Componente organism que representa el footer completo de la aplicación
 * Incluye el botón de toggle, contenido colapsable y sección siempre visible
 */
export const Footer: React.FC<FooterProps> = ({ data, className = "" }) => {
    const { isOpen, toggle, footerRef } = useFooterToggle(false);

    return (
        <footer ref={footerRef} className={`${className} -mt-4`}>
            {/* Botón de toggle */}
            <FooterToggleButton isOpen={isOpen} onToggle={toggle} />

            {/* Contenido colapsable */}
            {isOpen && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                    <FooterContent data={data} />
                </div>
            )}

            {/* Sección siempre visible */}
            <FooterAlwaysVisible data={data} />
        </footer>
    );
};
