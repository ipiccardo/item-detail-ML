import { FooterData } from "@/types/footer";
import { FooterSection } from "./FooterSection";

interface FooterContentProps {
    data: FooterData;
    className?: string;
}

/**
 * Componente molecular para renderizar el contenido colapsable del footer
 * Solo incluye las columnas principales de enlaces
 */
export const FooterContent: React.FC<FooterContentProps> = ({ data, className = "" }) => {
    return (
        <div className={`bg-white ${className}`}>
            <div className="max-w-[1200px] mx-auto px-4 py-8">
                {/* Secciones principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
                    {data.sections.map((section, index) => (
                        <FooterSection key={`section-${index}`} section={section} />
                    ))}
                </div>
            </div>
        </div>
    );
};
