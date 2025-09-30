import React from "react";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
    items: string[];
    className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <nav className={`flex items-center space-x-1 text-sm ml-text-secondary ${className}`} aria-label="Breadcrumb">
            <Home className="h-4 w-4" />
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <span
                        className={
                            index === items.length - 1
                                ? "ml-text-primary font-medium"
                                : "hover:text-blue-600 cursor-pointer"
                        }
                    >
                        {item}
                    </span>
                </React.Fragment>
            ))}
        </nav>
    );
};
