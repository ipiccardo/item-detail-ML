/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";
import Visa from "./icons/Visa";
import Amex from "./icons/Amex";
import Master from "./icons/Master";
import Naranja from "./icons/Naranja";
import VisaDebito from "./icons/VisaDebito";
import Maestro from "./icons/Maestro";
import Cabal from "./icons/Cabal";
import MasterCardDebito from "./icons/MasterCardDebito";
import PagoFacil from "./icons/PagoFacil";
import Rapipago from "./icons/Rapipago";

interface PaymentMethodsCardProps {
    isMobile?: boolean;
}

export const PaymentMethodsCard = ({ isMobile = false }: PaymentMethodsCardProps): JSX.Element => {
    return (
        <div className={`bg-white border border-gray-200 rounded-md p-4 shadow-sm ${isMobile ? "" : "w-[309px]"}`}>
            <h3 className="text-base font-semibold ml-text-primary mb-3">Medios de pago</h3>

            {!isMobile && (
                <>
                    <div className="mb-4 bg-green-600 text-white p-3 rounded-md">
                        <p className="text-xs font-semibold">¡Pagá el mismo precio en hasta 12 cuotas!</p>
                    </div>

                    <div className="mb-3">
                        <p className="text-xs font-semibold ml-text-primary mb-2">Cuotas sin Tarjeta</p>
                        <img
                            src="/mercado-pago-logo.png"
                            alt="Mercado Pago"
                            className="h-6"
                            onError={(e) => {
                                e.currentTarget.src = "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"/>";
                            }}
                        />
                    </div>
                </>
            )}

            <div className="mb-3">
                <p className="text-xs font-semibold ml-text-primary mb-2">Tarjetas de crédito</p>
                <div className={`flex ${isMobile ? "flex-wrap" : ""} gap-4`}>
                    <Visa />
                    <Amex />
                    <Master />
                    {isMobile && <Naranja />}
                </div>
                {!isMobile && <Naranja />}
            </div>

            <div className="mb-3">
                <p className="text-xs font-semibold ml-text-primary mb-2">Tarjetas de débito</p>
                <div className={`flex ${isMobile ? "flex-wrap" : ""}  gap-4`}>
                    <VisaDebito />
                    <Maestro />
                    <Cabal />
                    {isMobile && <MasterCardDebito />}
                </div>
                {!isMobile && <MasterCardDebito />}
            </div>

            <div className="mb-3">
                <p className="text-xs font-semibold ml-text-primary mb-2">Efectivo</p>
                <div className={`flex ${isMobile ? "flex-wrap" : ""} gap-4`}>
                    <PagoFacil />
                    <Rapipago />
                </div>
            </div>

            {isMobile ? (
                <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                    Ver más medios de pago
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            ) : (
                <button className="text-xs text-blue-600 hover:underline">
                    Conocé otros medios de pago
                </button>
            )}
        </div>
    );
};

