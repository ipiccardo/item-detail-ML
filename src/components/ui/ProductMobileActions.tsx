import { JSX } from "react";
import { Heart } from "lucide-react";

interface ProductMobileActionsProps {
    stock: number;
    quantity: number;
    onBuyNow: () => void;
    onAddToCart: () => void;
}

export const ProductMobileActions = ({
    stock,
    quantity,
    onBuyNow,
    onAddToCart,
}: ProductMobileActionsProps): JSX.Element => {
    return (
        <div className="lg:hidden mb-4">
            {/* Stock Info */}
            <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-sm font-semibold ml-text-primary mb-3">Stock disponible</p>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Cantidad: {quantity}</span>
                    <span className="text-xs text-gray-500">({stock} disponibles)</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 mb-4">
                <button
                    onClick={onBuyNow}
                    className="w-full bg-blue-600 text-white text-sm font-medium py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Comprar ahora
                </button>
                <button
                    onClick={onAddToCart}
                    className="w-full bg-blue-100 text-blue-600 text-sm font-medium py-3 px-4 rounded-md hover:bg-blue-200 transition-colors"
                >
                    Agregar al carrito
                </button>
            </div>

            {/* Guarantees */}
            <div className="space-y-2 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    <span>Devolución gratis. Tenés 30 días desde que lo recibís.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>Compra Protegida, recibí el producto que esperabas o te devolvemos tu dinero.</span>
                </div>
            </div>

            {/* Favorites and Share */}
            <div className="flex items-center justify-center gap-6 pt-4">
                <button className="flex items-center gap-1 text-sm text-blue-600">
                    <Heart className="w-4 h-4" />
                    <span>Agregar a favoritos</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Compartir</span>
                </button>
            </div>
        </div>
    );
};

