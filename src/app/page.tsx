"use client";

import { JSX } from "react";
import { useProduct } from "@/hooks/useProduct";
import ProductDetail from "@/components/ProductDetail";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function HomePage(): JSX.Element {
  const { product, isLoading, error } = useProduct("MLA50303499");

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <ErrorBoundary
        error={new Error(error ?? "No se pudo cargar el producto")}
        reset={() => window.location.reload()}
      />
    );
  }

  return <ProductDetail product={product} />;
}