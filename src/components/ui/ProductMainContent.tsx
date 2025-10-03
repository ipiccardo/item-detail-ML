/* eslint-disable max-len */
import { JSX } from "react";
import { ProductCharacteristics } from "./ProductCharacteristics";
import { DetailedSpecifications } from "./DetailedSpecifications";
import QuestionsAndAnswers from "./QuestionsAndAnswers";
import ProductReviews from "./ProductReviews";
import { RelatedProducts } from "./RelatedProducts";
import type { Product } from "@/types/product";

interface ProductMainContentProps {
    relatedProducts?: Product[];
    isLoadingRelated?: boolean;
}

export const ProductMainContent = ({ relatedProducts = [], isLoadingRelated = false }: ProductMainContentProps): JSX.Element => {
    return (
        <>
            {/* Product Characteristics */}
            <div className="bg-white rounded-md p-4 lg:p-6">
                <ProductCharacteristics />
            </div>

            {/* Detailed Specifications */}
            <div className="bg-white rounded-md p-4 lg:p-6 mb-0 mt-0 py-4 lg:py-0">
                <DetailedSpecifications />
            </div>

            {/* Description */}
            <div className="bg-white rounded-md p-4 lg:p-6">
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <h2 className="text-xl font-semibold ml-text-primary mb-4">Descripción</h2>
                    <div className="space-y-4">
                        <p className="text-sm ml-text-secondary leading-relaxed">
                            Dale a tu estilo una ventaja con el Galaxy A26 5G. El cuerpo delgado se adapta cómodamente a la mano, mientras que la parte posterior de cristal brillante y el diseño limpio de la cámara llaman la atención.
                        </p>
                        <p className="text-sm ml-text-secondary leading-relaxed">
                            La pantalla Super AMOLED de 6,7&quot; con un bisel delgado y minimizado lo atrae a su entretenimiento con una claridad vívida, desde el último video de su creador favorito hasta las fotos de sus seres queridos.
                        </p>
                        <p className="text-sm ml-text-secondary leading-relaxed">
                            Disfruta de tus actividades favoritas al aire libre con tranquilidad. Con clasificación IP67 para resistencia al polvo y al agua, el Galaxy A26 5G está listo para capturar los momentos más destacados de los conciertos o grabar momentos épicos del entretiempo, incluso bajo la lluvia.
                        </p>
                        <p className="text-sm ml-text-secondary leading-relaxed">
                            Ahora, con OIS para estabilizar tus tomas, puedes capturar las escenas más dinámicas con una claridad impresionante, ya sea que estés en una fiesta, un concierto o un juego deportivo.
                        </p>
                        <p className="text-sm ml-text-secondary leading-relaxed">
                            Aumenta la diversión de navegar y jugar a vídeos en streaming, la CPU actualizada mantiene todo funcionando rápido y sin problemas.
                        </p>
                        <p className="text-sm ml-text-secondary leading-relaxed">
                            Con una batería de larga duración de 5.000 mAh (típica), puede disfrutar de maratones de películas hasta 17 horas sin tener que cargar su Galaxy A26 5G.
                        </p>
                    </div>
                </div>
            </div>

            {/* Questions and Answers */}
            <QuestionsAndAnswers />

            {/* Product Reviews */}
            <ProductReviews />

            {/* Related Products */}
            {!isLoadingRelated && relatedProducts && relatedProducts.length > 0 && (
                <div className="bg-white rounded-md p-4 lg:p-6">
                    <RelatedProducts products={relatedProducts} />
                </div>
            )}
        </>
    );
};

