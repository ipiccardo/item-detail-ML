import { FooterSection as FooterSectionType } from "@/types/footer";
import { FooterLink } from "./FooterLink";

interface FooterSectionProps {
    section: FooterSectionType;
    className?: string;
}

/**
 * Componente molecular para renderizar una sección del footer con título y enlaces
 */
export const FooterSection: React.FC<FooterSectionProps> = ({ section, className = "" }) => {
    return (
        <div className={`flex flex-col space-y-2 ${className}`}>
            <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
            <div className="flex flex-col space-y-1">
                {section.links.map((link, index) => (
                    <FooterLink key={`${link.href}-${index}`} link={link} className="text-sm" />
                ))}
            </div>
        </div>
    );
};
