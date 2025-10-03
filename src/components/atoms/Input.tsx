/* eslint-disable max-len */
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode | React.ComponentType<React.SVGProps<SVGSVGElement>>;
    iconPosition?: "left" | "right";
}

export default function Input({
    label,
    error,
    icon,
    iconPosition = "right",
    className = "",
    id,
    ...props
}: InputProps): React.JSX.Element {
    const inputId = id ?? `input-${Math.random().toString(36).substr(2, 9)}`;

    const renderIcon = (iconProp: React.ReactNode | React.ComponentType<React.SVGProps<SVGSVGElement>>): React.ReactNode => {
        if (React.isValidElement(iconProp)) {
            return iconProp;
        }
        if (typeof iconProp === "function") {
            const IconComponent = iconProp as React.ComponentType<React.SVGProps<SVGSVGElement>>;
            return <IconComponent />;
        }
        return iconProp;
    };

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && iconPosition === "left" && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {renderIcon(icon)}
                    </div>
                )}
                <input
                    id={inputId}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                        focus:outline-none focus:ring-2 ${error ? "focus:ring-red-500 focus:border-red-500" : "focus:ring-blue-500 focus:border-blue-500"}
                        ${icon && iconPosition === "left" ? "pl-10" : ""}
                        ${icon && iconPosition === "right" ? "pr-10" : ""}
                        ${error ? "border-red-500" : ""}
                        ${className}`}
                    {...props}
                />
                {icon && iconPosition === "right" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {renderIcon(icon)}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
}

