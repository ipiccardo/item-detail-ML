/* eslint-disable max-len */
"use client";

import { JSX, useState, useEffect, useRef } from "react";
import { Shield, RotateCcw } from "lucide-react";

interface SellerInfoCardProps {
  seller: {
    name: string;
    sales: number;
    reputation: number;
    location: string;
  };
  shipping: {
    estimatedDays: string;
    free: boolean;
  };
  stock: number;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onBuyNow: () => void;
  onAddToCart: () => void;
}

export const SellerInfoCard = ({
  stock,
  quantity,
  onIncrement,
  onDecrement,
  onBuyNow,
  onAddToCart,
}: SellerInfoCardProps): JSX.Element => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm w-[309px]">
      {/* Delivery Info */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <div className="mb-3">
          <p className="text-sm font-semibold text-green-600 mb-1">Llega gratis mañana</p>
          <button className="text-xs text-blue-600 hover:underline">
            Más detalles y formas de entrega
          </button>
        </div>

        <div className="mb-1">
          <p className="text-sm font-semibold text-green-600 mb-0.5">
            Retirá gratis a partir de mañana{" "}
            <span className="font-normal text-gray-800">en correos y otros puntos</span>
          </p>
          <p className="text-[11px] text-gray-500">
            Comprando dentro de las próximas
          </p>
          <p className="text-[11px] text-gray-500 mb-1">4 h 35 min</p>
          <button className="text-xs text-blue-600 hover:underline">
            Ver en el mapa
          </button>
        </div>
      </div>

      {/* Stock Info */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <p className="text-sm font-semibold ml-text-primary mb-2">Stock disponible</p>
        <p className="text-xs ml-text-secondary mb-3">
          Almacenado y enviado por <span className="font-semibold text-green-600">FULL</span>
        </p>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs ml-text-primary">Cantidad:</span>

          {/* Quantity Selector with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border border-gray-300 rounded px-2 py-1 text-xs ml-text-primary min-w-[90px] text-left flex items-center justify-between hover:border-blue-500 transition-colors"
            >
              <span>{quantity} unidad</span>
              <svg
                className={`w-3 h-3 ml-2 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {/* Lista de cantidades */}
                <div className="py-1">
                  {Array.from({ length: Math.min(stock, 6) }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        const diff = num - quantity;
                        if (diff > 0) {
                          for (let i = 0; i < diff; i++) onIncrement();
                        } else if (diff < 0) {
                          for (let i = 0; i < Math.abs(diff); i++) onDecrement();
                        }
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-blue-50 transition-colors ${quantity === num ? "bg-blue-50 text-blue-600 font-semibold" : "ml-text-primary"
                        }`}
                    >
                      {num} unidad{num !== 1 ? "es" : ""}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <span className="text-[10px] text-gray-400">(+{stock} disponibles)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
        <button
          onClick={onBuyNow}
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors"
        >
          Comprar ahora
        </button>
        <button
          onClick={onAddToCart}
          className="w-full bg-blue-100 text-blue-600 py-2.5 px-4 rounded-md font-semibold text-sm hover:bg-blue-200 transition-colors"
        >
          Agregar al carrito
        </button>
      </div>

      {/* Seller Info */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-gray-600">ML</span>
          </div>
          <div>
            <p className="text-xs ml-text-primary leading-tight">
              Tienda oficial <span className="text-blue-600 font-semibold">Mercado Libre</span>
              <svg className="w-3 h-3 inline ml-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </p>
            <p className="text-[10px] text-gray-500">+1 M ventas</p>
          </div>
        </div>
      </div>

      {/* Guarantees */}
      <div className="space-y-2.5">
        <div className="flex items-start gap-2">
          <RotateCcw className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs ml-text-primary leading-relaxed">
              <span className="text-blue-600 font-semibold">Devolución gratis.</span> Tenés 30 días desde que lo recibís.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs ml-text-primary leading-relaxed">
              <span className="text-blue-600 font-semibold">Compra Protegida</span>, recibí el producto que esperabas o te devolvemos tu dinero.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs ml-text-primary leading-relaxed">12 meses de garantía de fábrica.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
