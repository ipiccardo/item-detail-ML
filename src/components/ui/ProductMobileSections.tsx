import { JSX } from "react";
import { Search } from "lucide-react";
import { PaymentMethodsCard } from "./PaymentMethodsCard";

export const ProductMobileSections = (): JSX.Element => {
    return (
        <>
            {/* Mobile: Payment Methods */}
            <div className="lg:hidden">
                <PaymentMethodsCard isMobile />
            </div>

            {/* Mobile: Quick Questions */}
            <div className="lg:hidden bg-white rounded-md p-4 border border-gray-200">
                <h3 className="text-base font-semibold ml-text-primary mb-3">Preguntas y respuestas</h3>
                <div className="relative mb-3">
                    <input
                        type="text"
                        placeholder="Escribí una pregunta o palabra clave..."
                        className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                        <Search className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-gray-600 mb-2">Tiene NFC?</p>
                <button className="text-sm text-blue-600 hover:underline">
                    Buscar entre 118 preguntas de esta publicación
                </button>
            </div>
        </>
    );
};

