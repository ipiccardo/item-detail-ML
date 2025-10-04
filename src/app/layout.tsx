/* eslint-disable max-len */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JSX } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MercadoLibre - Detalle del Producto",
  description: "Página de detalle de producto inspirada en MercadoLibre con funcionalidades avanzadas como chat con IA, magnificador de imágenes y diseño responsive",
  keywords: "MercadoLibre, e-commerce, productos, compras online, chat IA, magnificador imágenes",
  authors: [{ name: "MercadoLibre Clone" }],
  creator: "MercadoLibre Clone",
  publisher: "MercadoLibre Clone",
  robots: "index, follow",
  openGraph: {
    title: "MercadoLibre - Detalle del Producto",
    description: "Página de detalle de producto inspirada en MercadoLibre con funcionalidades avanzadas",
    type: "website",
    locale: "es_AR",
    siteName: "MercadoLibre Clone",
  },
  twitter: {
    card: "summary_large_image",
    title: "MercadoLibre - Detalle del Producto",
    description: "Página de detalle de producto inspirada en MercadoLibre con funcionalidades avanzadas",
  },
  icons: {
    icon: "/logo__small@2x.png",
    shortcut: "/logo__small@2x.png",
    apple: "/logo__small@2x.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
