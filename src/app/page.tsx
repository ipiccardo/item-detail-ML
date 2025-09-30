"use client";

import { JSX } from "react";
import { useProduct } from "@/hooks/useProduct";
import ProductDetail from "@/components/ProductDetail";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MercadoLibreHeader } from "@/components/ui/MercadoLibreHeader";
import { RelatedSearchesBar } from "@/components/ui/RelatedSearchesBar";

export default function HomePage(): JSX.Element {
  const { product, isLoading, error } = useProduct("MLA50303499");

  if (isLoading) {
    return (
      <div>
        <MercadoLibreHeader />
        <RelatedSearchesBar />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <MercadoLibreHeader />
        <RelatedSearchesBar />
        <ErrorBoundary
          error={new Error(error ?? "No se pudo cargar el producto")}
          reset={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div>
      <MercadoLibreHeader />
      <RelatedSearchesBar />
      <ProductDetail product={product} />
    </div>
  );
}