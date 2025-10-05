import { FooterData } from "@/types/footer";

export const footerData: FooterData = {
  sections: [
    {
      title: "Acerca de",
      links: [
        { text: "Mercado Libre", href: "/about" },
        { text: "Investor relations", href: "/investor-relations" },
        { text: "Tendencias", href: "/trends" },
        { text: "Sustentabilidad", href: "/sustainability" },
        { text: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Otros sitios",
      links: [
        { text: "Developers", href: "/developers" },
        { text: "Mercado Pago", href: "/mercado-pago" },
        { text: "Mercado Shops", href: "/mercado-shops" },
        { text: "Envíos", href: "/shipping" },
        { text: "Mercado Ads", href: "/mercado-ads" },
      ],
    },
    {
      title: "Ayuda",
      links: [
        { text: "Comprar", href: "/help/buy" },
        { text: "Vender", href: "/help/sell" },
        { text: "Resolución de problemas", href: "/help/troubleshooting" },
        { text: "Centro de seguridad", href: "/help/security" },
      ],
    },
    {
      title: "Redes sociales",
      links: [
        { text: "X", href: "/social/x" },
        { text: "Facebook", href: "/social/facebook" },
        { text: "Instagram", href: "/social/instagram" },
        { text: "YouTube", href: "/social/youtube" },
      ],
    },
    {
      title: "Mi cuenta",
      links: [
        { text: "Ingresá", href: "/login" },
        { text: "Vender", href: "/sell" },
      ],
    },
    {
      title: "Suscripciones",
      links: [
        { text: "Meli+", href: "/subscriptions/meli-plus" },
        { text: "Disney+", href: "/subscriptions/disney-plus" },
        { text: "HBO Max", href: "/subscriptions/hbo-max" },
        { text: "Paramount+", href: "/subscriptions/paramount-plus" },
        { text: "ViX Premium", href: "/subscriptions/vix-premium" },
        { text: "Universal+", href: "/subscriptions/universal-plus" },
      ],
    },
    {
      title: "Temporadas",
      links: [
        { text: "Hot Sale", href: "/events/hot-sale" },
        { text: "Cyber Monday", href: "/events/cyber-monday" },
        { text: "Black Friday", href: "/events/black-friday" },
      ],
    },
  ],
  alwaysVisibleLinks: [
    { text: "Trabajá con nosotros", href: "/careers" },
    { text: "Términos y condiciones", href: "/terms" },
    { text: "Promociones", href: "/promotions" },
    { text: "Cómo cuidamos tu privacidad", href: "/privacy" },
    { text: "Accesibilidad", href: "/accessibility" },
    { text: "Información al usuario financiero", href: "/financial-info" },
    { text: "Ayuda", href: "/help" },
    { text: "Defensa del Consumidor", href: "/consumer-defense" },
    { text: "Información sobre seguros", href: "/insurance" },
  ],
  secondaryLinks: [
    { text: "Libro de quejas online", href: "/complaints" },
    { text: "Programa de Afiliados", href: "/affiliate-program" },
  ],
  copyright: "Copyright © 1999-2025 MercadoLibre S.R.L.",
  address: "Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA",
};
