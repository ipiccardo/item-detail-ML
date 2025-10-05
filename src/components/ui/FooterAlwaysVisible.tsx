import { FooterData } from "@/types/footer";
import { FooterLink } from "./FooterLink";

interface FooterAlwaysVisibleProps {
    data: FooterData;
    className?: string;
}

/**
 * Componente molecular para la sección del footer que siempre está visible
 * Incluye los enlaces principales, secundarios, copyright y dirección
 */
export const FooterAlwaysVisible: React.FC<FooterAlwaysVisibleProps> = ({ data, className = "" }) => {
    return (
        <div className={`bg-white border-t border-gray-200 ${className}`}>
            <div className="max-w-[1200px] mx-auto px-4 py-6">
                <div className="space-y-4">
                    {/* Enlaces principales siempre visibles */}
                    <div className="flex flex-wrap gap-4 justify-start">
                        {data.alwaysVisibleLinks.map((link, index) => (
                            <FooterLink key={`always-visible-${index}`} link={link} className="text-sm" />
                        ))}
                    </div>

                    {/* Enlaces secundarios */}
                    <div className="flex flex-wrap gap-4 justify-start">
                        {data.secondaryLinks.map((link, index) => (
                            <FooterLink key={`secondary-${index}`} link={link} className="text-sm" />
                        ))}
                    </div>

                    {/* Copyright y dirección */}
                    <div className="text-left space-y-2">
                        <p className="text-sm text-gray-500">{data.copyright}</p>
                        <p className="text-sm text-gray-500">{data.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
