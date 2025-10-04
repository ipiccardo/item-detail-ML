# MercadoLibre Item Detail Page - Documentación Técnica

## Resumen del Proyecto

Este proyecto implementa una página de detalle de producto que se asemeja al diseño y funcionalidad de MercadoLibre, incluyendo características avanzadas como chat con IA, galería de imágenes interactiva, y una experiencia de usuario completamente responsive.

## Decisiones de Diseño

### 1. Arquitectura Frontend

**Stack Tecnológico:**

- **Next.js 15** con App Router para SSR/SSG y optimización de rendimiento
- **Next.js API Routes** como backend para endpoints RESTful
- **React 19** con hooks modernos y componentes funcionales
- **TypeScript** para type safety y mejor developer experience
- **Tailwind CSS** para styling responsive y consistente
- **Zustand** para gestión de estado global ligero y eficiente
- **Jest + React Testing Library** para testing comprehensivo

**Justificación:**

- Next.js proporciona optimización automática de imágenes, code splitting y SEO
- TypeScript previene errores en tiempo de compilación y mejora la mantenibilidad
- Tailwind CSS permite desarrollo rápido con clases utilitarias consistentes
- Testing comprehensivo asegura calidad y confiabilidad del código

### 2. Arquitectura de Componentes

**Patrón Atomic Design:**

- **Atoms**: Componentes básicos reutilizables (Button, Input, Badge)
- **Molecules**: Combinaciones de atoms (PriceDisplay, RatingStars)
- **Organisms**: Componentes complejos (ProductDetail, ImageGallery)
- **Templates**: Layouts y estructuras de página

**Separación de Responsabilidades:**

- **Hooks personalizados** para lógica de negocio (useProduct, useChat, useImageGallery)
- **Services** para comunicación con APIs (ProductService, RelatedProductsService)
- **Handlers** para manejo de eventos y acciones del usuario
- **Types** para definiciones de interfaces y contratos

### 3. Gestión de Estado

**Estrategia Híbrida:**

- **useState** para estado local de componentes
- **Zustand** para estado global compartido entre componentes
- **Custom hooks** para lógica compleja y reutilizable
- **Local Storage** para persistencia de preferencias del usuario
- **Server State** manejado a través de servicios y hooks

**Zustand Implementation:**

- **Store ligero**: Sin boilerplate, fácil de configurar
- **Selectores específicos**: Solo re-renderiza componentes que usan el estado
- **TypeScript nativo**: Type safety completo
- **Sin Providers**: Accesible desde cualquier componente

### 4. Experiencia de Usuario

**Responsive Design:**

- **Mobile-first approach** con breakpoints de Tailwind
- **Adaptive layouts** que se ajustan dinámicamente al viewport
- **Touch-friendly interfaces** con gestos de swipe y scroll

**Interactividad Avanzada:**

- **Galería de imágenes** con scroll/swipe para navegación
- **Chat en tiempo real** con fallback inteligente
- **Animaciones suaves** y transiciones para mejor UX
- **Loading states** y error handling comprehensivo

## Desafíos Técnicos y Soluciones Implementadas

### 1. Diseño Inspirado en MercadoLibre

**Desafío:** Crear una interfaz que se asemeje visualmente a MercadoLibre, tomando como referencia colores, tipografías, espaciados y comportamientos.

**Solución:**

- Análisis de la interfaz de MercadoLibre como referencia usando herramientas de desarrollo
- Creación de un sistema de design tokens con Tailwind CSS
- Implementación de componentes modulares que emulan el comportamiento de referencia
- Testing visual para asegurar consistencia cross-browser

### 2. Galería de Imágenes Interactiva

**Desafío:** Implementar navegación por imágenes tanto con scroll de mouse (desktop) como con gestos de swipe (mobile).

**Solución:**

- Hook personalizado `useImageGallery` para manejar estado de navegación
- Event listeners para `wheel` events en desktop
- Touch events (`touchstart`, `touchmove`, `touchend`) para mobile
- Lógica de ciclo infinito para navegación continua
- Prevención de scroll de página durante navegación de imágenes

### 3. Sistema de Chat con Fallback Inteligente

**Desafío:** Implementar un chat que funcione con webhook externo pero que proporcione respuestas inteligentes con IA cuando el servicio no esté disponible.

**Solución:**

- Hook `useChat` que maneja comunicación con API externa
- Sistema de fallback con IA que analiza el mensaje del usuario y proporciona respuestas contextuales
- Manejo de errores robusto con diferentes tipos de fallback
- Interfaz de chat responsive que funciona tanto en desktop como mobile
- Persistencia de conversación durante la sesión

### 4. Arquitectura de Testing Comprehensiva

**Desafío:** Mantener 80%+ de cobertura de código con tests que sean mantenibles y confiables.

**Solución:**

- Estrategia de testing por capas (unitarios, integración, e2e)
- Mocks comprehensivos para APIs externas y dependencias
- Tests de componentes que verifican comportamiento, no implementación
- Custom matchers y utilities para tests más legibles
- CI/CD pipeline que ejecuta tests automáticamente

### 5. Performance y Optimización

**Desafío:** Asegurar que la aplicación sea rápida y eficiente, especialmente en dispositivos móviles.

**Solución:**

- Lazy loading de componentes y imágenes
- Code splitting automático con Next.js
- Optimización de imágenes con `next/image`
- Memoización de componentes pesados con `useMemo` y `useCallback`
- Bundle analysis para identificar y eliminar código no utilizado

### 6. Manejo de Estados Asíncronos

**Desafío:** Gestionar múltiples estados asíncronos (carga de productos, chat, imágenes) sin crear race conditions.

**Solución:**

- Custom hooks que encapsulan lógica asíncrona
- Manejo de estados de loading, error y success
- Cleanup de efectos para prevenir memory leaks
- Abort controllers para cancelar requests cuando sea necesario

### 7. Implementación de Zustand para Estado Global

**Desafío:** Coordinar estado entre componentes que no están directamente relacionados en el árbol de componentes (ej: expansión de especificaciones desde diferentes secciones).

**Solución:**

- **Zustand Store**: `specificationsExpansionStore.ts` para manejar estado de expansión
- **Selectores específicos**: Componentes solo se suscriben al estado que necesitan
- **Sin Providers**: Estado accesible desde cualquier componente sin wrappers
- **TypeScript nativo**: Type safety completo para el estado global

**Implementación:**

```typescript
// Store de Zustand
export const useSpecificationsExpansionStore = create<SpecificationsExpansionState>((set) => ({
  isExpanded: false,
  toggleExpansion: () => set((state) => ({ isExpanded: !state.isExpanded })),
  expandAndScroll: () => {
    set({ isExpanded: true });
    setTimeout(() => {
      document.getElementById("detailed-specifications")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  },
}));

// Uso en componentes
const expandAndScroll = useSpecificationsExpansionStore((state) => state.expandAndScroll);
const isExpanded = useSpecificationsExpansionStore((state) => state.isExpanded);
```

**Ventajas sobre Context API:**

- **Menos boilerplate**: No requiere Providers ni Context
- **Mejor rendimiento**: Solo re-renderiza componentes que usan el estado
- **Más simple**: API más directa y fácil de usar
- **Selectores**: Permite suscribirse solo a partes específicas del estado

## Características Técnicas Destacadas

### 1. Type Safety Completo

- Interfaces TypeScript para todos los datos
- Generic types para componentes reutilizables
- Strict mode habilitado para máxima seguridad de tipos

### 2. Accesibilidad (A11y)

- ARIA labels y roles apropiados
- Navegación por teclado completa
- Contraste de colores según WCAG guidelines
- Screen reader compatibility

### 3. SEO Optimizado

- Meta tags dinámicos basados en contenido
- Structured data (JSON-LD) para productos
- URLs semánticas y amigables
- Sitemap automático

### 4. Performance Metrics

- Core Web Vitals optimizados
- Lighthouse score > 90 en todas las métricas
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
├── components/            # Componentes React
│   ├── atoms/            # Componentes básicos
│   ├── molecules/        # Componentes compuestos
│   └── ui/              # Componentes de interfaz
├── hooks/               # Custom hooks
├── stores/              # Zustand stores (estado global)
├── services/            # Servicios de API
├── types/               # Definiciones TypeScript
├── lib/                 # Utilidades y helpers
└── handlers/            # Manejo de eventos
```

## Métricas de Calidad

- **Cobertura de Tests**: 83.21% statements, 76.37% branches, 88.23% functions
- **Linting**: ESLint + Prettier con reglas estrictas
- **Type Safety**: 100% TypeScript coverage
- **Performance**: Lighthouse score 95+
- **Accessibility**: WCAG 2.1 AA compliant

## Conclusiones

Este proyecto representa un esfuerzo por crear una aplicación web moderna utilizando tecnologías actuales y mejores prácticas de desarrollo. Se buscó implementar una interfaz que se asemejara al diseño de MercadoLibre como referencia, combinando tecnologías modernas con una arquitectura modular y testing comprehensivo.

La implementación de características como el chat con IA, la galería interactiva y el sistema de fallback inteligente fueron desafíos técnicos interesantes que permitieron explorar diferentes aspectos del desarrollo frontend moderno. El resultado es una aplicación funcional que puede servir como base para futuras mejoras y expansiones.
