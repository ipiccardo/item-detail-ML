import React from "react";

interface Guarantee {
    icon: React.ReactNode;
    text: string;
}

interface GuaranteesListProps {
    guarantees: Guarantee[];
    className?: string;
}

export default function GuaranteesList({
    guarantees,
    className = "",
}: GuaranteesListProps): React.JSX.Element {
    return (
        <div className={`space-y-2 ${className}`}>
            {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                    {guarantee.icon}
                    <span>{guarantee.text}</span>
                </div>
            ))}
        </div>
    );
}

