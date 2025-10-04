/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable max-len */
"use client";

import { useEffect } from "react";
import { Product } from "@/types/product";

interface ProductMetadataProps {
    product: Product;
}

export default function ProductMetadata({ product }: ProductMetadataProps): null {
    useEffect(() => {
        // Actualizar el título de la página
        document.title = `${product.title} - MercadoLibre`;

        // Actualizar la meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content',
                `${product.title} - ${product.brand} - ${product.category}. Precio: $${product.price.amount.toLocaleString()}. ${product.shipping.free ? 'Envío gratis' : 'Envío disponible'}. Stock disponible: ${product.stock} unidades.`
            );
        }

        // Actualizar Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', `${product.title} - MercadoLibre`);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) {
            ogDescription.setAttribute('content',
                `${product.title} - ${product.brand} - Precio: $${product.price.amount.toLocaleString()}`
            );
        }

        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage && product.images.length > 0) {
            ogImage.setAttribute('content', product.images[0]);
        }

        // Actualizar Twitter Card
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            twitterTitle.setAttribute('content', `${product.title} - MercadoLibre`);
        }

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) {
            twitterDescription.setAttribute('content',
                `${product.title} - ${product.brand} - Precio: $${product.price.amount.toLocaleString()}`
            );
        }

        const twitterImage = document.querySelector('meta[name="twitter:image"]');
        if (twitterImage && product.images.length > 0) {
            twitterImage.setAttribute('content', product.images[0]);
        }

        // Agregar structured data para SEO
        const structuredData = {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.title,
            "brand": {
                "@type": "Brand",
                "name": product.brand
            },
            "category": product.category,
            "offers": {
                "@type": "Offer",
                "price": product.price.amount,
                "priceCurrency": "ARS",
                "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "seller": {
                    "@type": "Organization",
                    "name": product.seller.name
                }
            },
            "image": product.images,
            "description": `${product.title} - ${product.brand} - ${product.category}`,
            "aggregateRating": product.rating ? {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.seller.sales
            } : undefined
        };

        // Remover structured data anterior si existe
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Agregar nuevo structured data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);

        // Cleanup function
        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [product]);

    return null;
}
