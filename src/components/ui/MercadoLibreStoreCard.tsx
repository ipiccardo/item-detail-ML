/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
import { JSX } from "react";

export const MercadoLibreStoreCard = (): JSX.Element => {
    return (
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm w-[309px]">
            <div className="mb-4">
                <img
                    src="/ml-store-banner.png"
                    alt="Mercado Libre"
                    className="w-full h-24 object-cover rounded-md mb-3"
                    onError={(e) => {
                        e.currentTarget.style.display = "none";
                    }}
                />
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold ml-text-primary">Mercado Libre</h3>
                    <button
                        className="text-xs text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-50"
                    >
                        Seguir
                    </button>
                </div>
                <p className="text-xs text-gray-600 mb-1 flex items-center">
                    Tienda oficial de Mercado Libre
                    <svg
                        className="w-3 h-3 inline ml-1 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                </p>
                <p className="text-[10px] text-gray-500 mb-3">
                    <span className="font-semibold">+10mil</span> Seguidores  <span className="font-semibold">+1000</span> Productos
                </p>
            </div>

            <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-2 bg-green-50 p-2 rounded">
                    <svg
                        className="w-4 h-4 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                    <span className="text-xs font-semibold text-green-700">MercadoLíder Platinum</span>
                </div>
                <p className="text-[10px] text-green-700 mb-2">¡Uno de los mejores del sitio!</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                        <p className="text-sm font-semibold ml-text-primary">+1 M</p>
                        <p className="text-[9px] text-gray-500">Ventas</p>
                    </div>
                    <div>
                        <svg
                            className="w-5 h-5 mx-auto mb-0.5 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="text-[9px] text-gray-500">Buena atención</p>
                    </div>
                    <div>
                        <svg
                            className="w-5 h-5 mx-auto mb-0.5 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                            />
                        </svg>
                        <p className="text-[9px] text-gray-500">Entrega a tiempo</p>
                    </div>
                </div>
            </div>

            <button className="w-full text-sm text-blue-600 hover:underline mb-3">
                Ir a la tienda oficial
            </button>

            <div className="border-t border-gray-100 pt-3">
                <p className="text-xs font-semibold ml-text-primary mb-2">Otras opciones de compra</p>
                <p className="text-xs text-blue-600 hover:underline cursor-pointer">
                    Ver 26 opciones desde $ 439.900
                </p>
            </div>
        </div>
    );
};

