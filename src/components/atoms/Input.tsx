import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

export default function Input({
    label,
    error,
    icon,
    iconPosition = "right",
    className = "",
    ...props
}: InputProps): React.JSX.Element {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && iconPosition === "left" && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ${icon && iconPosition === "left" ? "pl-10" : ""}
                        ${icon && iconPosition === "right" ? "pr-10" : ""}
                        ${error ? "border-red-500" : ""}
                        ${className}`}
                    {...props}
                />
                {icon && iconPosition === "right" && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
        </div>
    );
}

