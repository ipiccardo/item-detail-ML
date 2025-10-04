# MercadoLibre Item Detail - Challenge Técnico

Una página de detalle de producto inspirada en MercadoLibre, desarrollada con Next.js 15, TypeScript y Tailwind CSS.

## 🚀 Características

- **Diseño Responsive**: Se asemeja al diseño de MercadoLibre con adaptación completa a mobile y desktop
- **Galería Interactiva**: Navegación por imágenes
- **Chat con IA**: Sistema de chat con webhook n8n y fallback inteligente
- **Header Dinámico**: Menú hamburguesa móvil y dropdown de categorías desktop
- **Productos Relacionados**: Sección con imágenes dinámicas y precios
- **API RESTful**: Backend completo con endpoints para productos

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (utilizamos la API de Next.js como backend)
- **Testing**: Jest, React Testing Library
- **Iconos**: Lucide React
- **Datos**: JSON local

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir en navegador
http://localhost:3000
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con cobertura
npm test -- --coverage

# Tests en modo watch
npm test -- --watch
```

## 📊 Cobertura de Tests

- **Statements**: 83.21% ✅
- **Functions**: 88.23% ✅
- **Lines**: 83.66% ✅
- **Branches**: 76.37%

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
├── components/            # Componentes React
│   ├── atoms/            # Componentes básicos
│   ├── molecules/        # Componentes compuestos
│   └── ui/              # Componentes de interfaz
├── hooks/               # Custom hooks
├── services/            # Servicios de API
├── types/               # Definiciones TypeScript
├── lib/                 # Utilidades
└── handlers/            # Manejo de eventos
```

## 🔌 API Endpoints (Next.js API Routes)

- `GET /api/products/[id]` - Obtener producto por ID
- `GET /api/products` - Listar productos con filtros

## 📱 Características Responsive

- **Mobile**: Menú hamburguesa, chat widget flotante, layout vertical
- **Desktop**: Dropdown de categorías, chat en sidebar, layout horizontal
- **Breakpoints**: Tailwind CSS con diseño mobile-first

## 🤖 Chat con IA

- **Webhook**: Integración con n8n para respuestas inteligentes
- **Fallback**: Sistema de respuestas contextuales cuando el servicio no está disponible
- **Responsive**: Widget flotante en mobile, integrado en sidebar en desktop

## 🎨 Diseño

- **Referencia**: Inspirado en el diseño de MercadoLibre
- **Colores**: Paleta de colores similar a MercadoLibre
- **Tipografía**: Sistema de tipografías consistente
- **Componentes**: Arquitectura atómica reutilizable

## 📈 Performance

- **Lighthouse Score**: 95+
- **Core Web Vitals**: Optimizados
- **Bundle Size**: Optimizado con code splitting
- **Images**: Optimizadas con next/image

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build para producción
npm run start        # Producción
npm run lint         # Linter
npm test             # Tests
npm test -- --coverage  # Tests con cobertura
```

## 📄 Documentación

- [DOCUMENTATION.md](./DOCUMENTATION.md) - Documentación técnica detallada
- [run.md](./run.md) - Instrucciones de ejecución

## 🎯 Requerimientos Cumplidos

- ✅ Frontend responsive inspirado en MercadoLibre
- ✅ Backend API RESTful utilizando Next.js API Routes
- ✅ Cobertura de tests > 80% (3 de 4 métricas)
- ✅ Manejo de errores comprehensivo
- ✅ Documentación completa
- ✅ Instrucciones de ejecución

## 🚀 Próximas Mejoras

- Implementar funcionalidad de carrito
- Agregar sistema de autenticación
- Implementar búsqueda avanzada
- Agregar más productos de ejemplo
- Mejorar sistema de reviews

---

**Desarrollado con ❤️ usando Next.js y TypeScript**
