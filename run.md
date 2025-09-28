# MercadoLibre Item Detail - Prototipo

## 📋 Descripción del Proyecto

Este es un prototipo de página de detalle de producto inspirado en MercadoLibre, desarrollado con Next.js 15, TypeScript y Tailwind CSS. Incluye tanto el frontend como el backend API.

**Características principales:**

- 🎨 Diseño responsive inspirado en MercadoLibre
- 🖼️ Galería de imágenes interactiva
- 💰 Sistema de precios con descuentos
- ⭐ Sistema de calificaciones
- 🚚 Información de envío
- 💳 Medios de pago
- 📱 Completamente responsive

## Características Implementadas

### Frontend

- ✅ Página de detalle de producto con diseño responsive
- ✅ Galería de imágenes con navegación
- ✅ Información de precio con descuentos
- ✅ Información del vendedor y reputación
- ✅ Medios de pago disponibles
- ✅ Información de envío
- ✅ Especificaciones técnicas del producto
- ✅ Botones de acción (Comprar, Agregar al carrito)
- ✅ Sistema de calificaciones con estrellas
- ✅ Diseño inspirado en MercadoLibre

### Backend API

- ✅ API RESTful con Next.js API Routes
- ✅ Endpoint para obtener producto por ID: `GET /api/products/[id]`
- ✅ Endpoint para listar productos con filtros: `GET /api/products`
- ✅ Manejo de errores y respuestas estructuradas
- ✅ Datos persistidos en archivos JSON locales

## Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Iconos**: Lucide React
- **Datos**: JSON local (sin base de datos)
- **Herramientas**: ESLint, PostCSS

## Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Pasos para ejecutar

1. **Instalar dependencias**:

   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:

   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── [id]/
│   │       │   └── route.ts      # API para obtener producto por ID
│   │       └── route.ts          # API para listar productos
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página principal
├── components/
│   ├── ProductDetail.tsx         # Componente principal del producto
│   ├── LoadingSpinner.tsx        # Componente de carga
│   └── ErrorBoundary.tsx         # Componente de manejo de errores
├── data/
│   └── products.json             # Datos de productos
├── lib/
│   └── utils.ts                  # Utilidades y helpers
└── types/
    └── product.ts                # Tipos TypeScript
```

## API Endpoints

### GET /api/products/[id]

Obtiene un producto específico por su ID.

**Ejemplo de respuesta**:

```json
{
  "success": true,
  "data": {
    "id": "MLA50303499",
    "title": "Samsung Galaxy A26 8 GB 256 GB 5G White",
    "price": {
      "amount": 299999,
      "currency": "ARS",
      "originalPrice": 349999,
      "discount": 14
    }
    // ... más campos
  }
}
```

### GET /api/products

Obtiene una lista de productos con filtros opcionales.

**Parámetros de consulta**:

- `category` - Filtrar por categoría
- `brand` - Filtrar por marca
- `minPrice` - Precio mínimo
- `maxPrice` - Precio máximo

## Datos de Ejemplo

El proyecto incluye un producto de ejemplo (Samsung Galaxy A26) con todos los campos necesarios para demostrar la funcionalidad completa.

## Notas de Desarrollo

- El proyecto está configurado para usar TypeScript estricto
- Los estilos siguen el sistema de diseño de MercadoLibre
- La aplicación es completamente responsive
- Se incluye manejo de errores y estados de carga
- Los datos están en español para coincidir con el mercado argentino

## Próximas Mejoras

- Implementar funcionalidad de carrito de compras
- Agregar sistema de autenticación
- Implementar búsqueda y filtros avanzados
- Agregar más productos de ejemplo
- Implementar sistema de reviews y calificaciones
