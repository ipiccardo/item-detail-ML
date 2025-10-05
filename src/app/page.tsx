"use client";

import { JSX } from "react";
import { useProduct } from "@/hooks/useProduct";
import ProductDetail from "@/components/ProductDetail";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MercadoLibreHeader } from "@/components/ui/MercadoLibreHeader";
import { RelatedSearchesBar } from "@/components/ui/RelatedSearchesBar";
import { Footer } from "@/components/ui/Footer";
import { footerData } from "@/data/footerData";

export default function HomePage(): JSX.Element {
  const { product, isLoading, error } = useProduct("MLA50303499");

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <MercadoLibreHeader />
        <RelatedSearchesBar />
        <main className="flex-1">
          <LoadingSpinner />
        </main>
        <Footer data={footerData} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <MercadoLibreHeader />
        <RelatedSearchesBar />
        <main className="flex-1">
          <ErrorBoundary
            error={new Error(error ?? "No se pudo cargar el producto")}
            reset={() => window.location.reload()}
          />
        </main>
        <Footer data={footerData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MercadoLibreHeader />
      <RelatedSearchesBar />
      <main className="flex-1">
        <ProductDetail product={product} />
      </main>
      <Footer data={footerData} />
    </div>
  );
}