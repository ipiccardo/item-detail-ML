import React from "react";

type BadgeVariant = "primary" | "success" | "warning" | "danger" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    children: React.ReactNode;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    primary: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-orange-100 text-orange-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-gray-100 text-gray-700",
};

const sizeStyles: Record<BadgeSize, string> = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-3 py-1",
};

export default function Badge({
    variant = "primary",
    size = "md",
    className = "",
    children,
}: BadgeProps): React.JSX.Element {
    const combinedClasses = [
        "inline-flex items-center rounded-full font-semibold",
        variantStyles[variant],
        sizeStyles[size],
        className,
    ].join(" ");

    return (
        <span className={combinedClasses}>
            {children}
        </span>
    );
}

