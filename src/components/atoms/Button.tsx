import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "link" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    link: "text-blue-600 hover:underline bg-transparent",
    ghost: "text-gray-600 hover:text-blue-600 bg-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2.5 px-4",
    lg: "text-base py-3 px-6",
};

export default function Button({
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    children,
    ...props
}: ButtonProps): React.JSX.Element {
    const baseStyles = "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";
    const widthStyles = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

