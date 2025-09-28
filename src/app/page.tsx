"use client";

import { useState, useEffect, JSX } from "react";
import { Product } from "@/types/product";
import ProductDetail from "@/components/ProductDetail";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HomePage(): JSX.Element {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch("/api/products/MLA50303499");
        const data = await response.json();

        if (data.success) {
          setProduct(data.data);
        } else {
          setError(data.error ?? "Error al cargar el producto");
        }
      } catch {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Oops! Algo salió mal
          </h2>
          <p className="text-gray-600 mb-6">
            {error ?? "No se pudo cargar el producto"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium
              hover:bg-blue-700 transition-colors"
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}