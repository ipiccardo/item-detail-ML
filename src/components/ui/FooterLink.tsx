import { FooterLink as FooterLinkType } from "@/types/footer";

interface FooterLinkProps {
    link: FooterLinkType;
    className?: string;
}

/**
 * Componente atómico para renderizar un enlace estático del footer
 */
export const FooterLink: React.FC<FooterLinkProps> = ({ link, className = "" }) => {
    return (
        <span
            className={`text-gray-600 ${className}`}
        >
            {link.text}
        </span>
    );
};
