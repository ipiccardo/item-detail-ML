import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    label?: string;
    variant?: "default" | "circular";
    size?: "sm" | "md" | "lg";
}

const sizeStyles = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-10 h-10",
};

export default function IconButton({
    icon,
    label,
    variant = "default",
    size = "md",
    className = "",
    ...props
}: IconButtonProps): React.JSX.Element {
    const baseStyles = "flex items-center justify-center transition-colors focus:outline-none";
    const variantStyles = variant === "circular"
        ? "bg-white rounded-full shadow-lg hover:bg-gray-50 border border-gray-200"
        : "hover:bg-gray-100 rounded";

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${sizeStyles[size]} ${className}`}
            aria-label={label}
            {...props}
        >
            {icon}
        </button>
    );
}

