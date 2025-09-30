import { render, screen } from "@testing-library/react";
import ProductDetail from "../ProductDetail";
import { Product } from "@/types/product";
import { JSX } from "react";

// Mock all the hooks
jest.mock("@/hooks/useQuantity", () => ({
  useQuantity: (): {
    quantity: number;
    increment: jest.Mock;
    decrement: jest.Mock;
  } => ({
    quantity: 1,
    increment: jest.fn(),
    decrement: jest.fn(),
  }),
}));

jest.mock("@/hooks/useVariants", () => ({
  useVariants: (): {
    selectedVariants: { color: string; storage: string };
    selectColor: jest.Mock;
    selectStorage: jest.Mock;
    getCurrentPrice: () => number;
    getCurrentImage: () => string;
  } => ({
    selectedVariants: { color: "blue", storage: "256gb" },
    selectColor: jest.fn(),
    selectStorage: jest.fn(),
    getCurrentPrice: (): number => 439000,
    getCurrentImage: (): string => "/1.png",
  }),
}));

jest.mock("@/hooks/useRelatedProductsService", () => ({
  useRelatedProductsService: (): {
    relatedProducts: never[];
    isLoading: boolean;
  } => ({
    relatedProducts: [],
    isLoading: false,
  }),
}));

jest.mock("@/hooks/useCompare", () => ({
  useCompare: (): {
    products: never[];
    removeFromCompare: jest.Mock;
    clearCompare: jest.Mock;
    addToCompare: jest.Mock;
    isInCompare: jest.Mock;
    canAddMore: boolean;
  } => ({
    products: [],
    removeFromCompare: jest.fn(),
    clearCompare: jest.fn(),
    addToCompare: jest.fn(),
    isInCompare: jest.fn((): boolean => false),
    canAddMore: true,
  }),
}));

jest.mock("@/hooks/useFavorites", () => ({
  useFavorites: (): {
    toggleFavorite: jest.Mock;
    isFavorite: jest.Mock;
  } => ({
    toggleFavorite: jest.fn(),
    isFavorite: jest.fn((): boolean => false),
  }),
}));

jest.mock("@/handlers/productHandlers", () => ({
  createProductActions: (): Array<{
    id: string;
    label: string;
    variant: "primary" | "secondary";
    onClick: jest.Mock;
  }> => [
    {
      id: "buy",
      label: "Comprar ahora",
      variant: "primary" as const,
      onClick: jest.fn(),
    },
    {
      id: "add-to-cart",
      label: "Agregar al carrito",
      variant: "secondary" as const,
      onClick: jest.fn(),
    },
  ],
}));

// Mock the UI components
jest.mock("../ui/ImageGallery", () => {
  return function MockImageGallery({ images, title }: { images: string[]; title: string }): JSX.Element {
    return (
      <div data-testid="image-gallery">
        <h3>{title}</h3>
        <div>{images.join(", ")}</div>
      </div>
    );
  };
});

jest.mock("../ui/ProductPrice", () => {
  return function MockProductPrice({ product }: { product: Product }): JSX.Element {
    return (
      <div data-testid="product-price">
        <span>${product.price.amount}</span>
      </div>
    );
  };
});

jest.mock("../ui/ProductActions", () => {
  return function MockProductActions({
    actions,
  }: {
    actions: Array<{
      id: string;
      label: string;
      onClick: jest.Mock;
    }>;
  }): JSX.Element {
    return (
      <div data-testid="product-actions">
        {actions.map((action) => (
          <button key={action.id} onClick={action.onClick}>
            {action.label}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock("../ui/Breadcrumbs", () => ({
  Breadcrumbs: ({ items }: { items: string[] }): JSX.Element => (
    <nav data-testid="breadcrumbs">
      {items.map((item: string, index: number) => (
        <span key={index}>{item}</span>
      ))}
    </nav>
  ),
}));

jest.mock("../ui/VariantSelector", () => ({
  VariantSelector: ({
    selectedColor,
    selectedStorage,
  }: {
    product?: Product;
    selectedColor: string;
    selectedStorage: string;
    onColorSelect?: jest.Mock;
    onStorageSelect?: jest.Mock;
  }): JSX.Element => (
    <div data-testid="variant-selector">
      <span>Color: {selectedColor}</span>
      <span>Storage: {selectedStorage}</span>
    </div>
  ),
}));

jest.mock("../ui/KeyFeatures", () => ({
  KeyFeatures: ({ features }: { features: string[] }): JSX.Element => (
    <div data-testid="key-features">
      {features.map((feature: string, index: number) => (
        <span key={index}>{feature}</span>
      ))}
    </div>
  ),
}));

jest.mock("../ui/ProductSpecifications", () => ({
  ProductSpecifications: ({
    specifications,
    className,
  }: {
    specifications: Record<string, string>;
    className?: string;
  }): JSX.Element => (
    <div data-testid="product-specifications" className={className}>
      {Object.entries(specifications).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </div>
  ),
}));

jest.mock("../ui/RelatedProducts", () => ({
  RelatedProducts: ({ products, className }: { products: Product[]; className?: string }): JSX.Element => (
    <div data-testid="related-products" className={className}>
      <h3>Productos relacionados</h3>
      <div>{products.length} productos</div>
    </div>
  ),
}));

jest.mock("../ui/CompareProducts", () => ({
  CompareProducts: ({
    products,
    onClear,
    className,
  }: {
    products: Product[];
    onRemove?: jest.Mock;
    onClear: jest.Mock;
    className?: string;
  }): JSX.Element => (
    <div data-testid="compare-products" className={className}>
      <h3>Comparar productos</h3>
      <div>{products.length} productos</div>
      <button onClick={onClear}>Limpiar</button>
    </div>
  ),
}));

describe("ProductDetail", () => {
  const mockProduct: Product = {
    id: "MLA50303499",
    title: "Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM",
    description: "El Samsung Galaxy A55 5G combina rendimiento y estilo en un diseño elegante.",
    price: {
      amount: 439000,
      currency: "ARS",
      originalPrice: 499000,
      discount: 12,
    },
    images: ["/1.png", "/2.png", "/3.png", "/4.png"],
    seller: {
      id: "123456789",
      name: "Tienda oficial Samsung",
      reputation: 4.8,
      sales: 5000,
      location: "Buenos Aires, Argentina",
      warranty: "1 año de garantía",
    },
    condition: "new",
    stock: 15,
    shipping: {
      free: true,
      estimatedDays: "1-2 días hábiles",
      calculator: "Calculá cuándo llega",
    },
    paymentMethods: ["Tarjeta de crédito", "Tarjeta de débito", "Mercado Pago"],
    rating: {
      average: 4.3,
      totalReviews: 43,
    },
    specifications: {
      Pantalla: "6.6 pulgadas Super AMOLED",
      RAM: "8 GB",
      Almacenamiento: "256 GB",
    },
    variants: {
      color: [
        {
          name: "Azul oscuro",
          value: "blue",
          available: true,
          image: "/1.png",
        },
      ],
      storage: [
        {
          name: "256 GB",
          value: "256gb",
          available: true,
          priceModifier: 0,
        },
      ],
    },
    keyFeatures: ["Memoria RAM 8 GB", "Dispositivo desbloqueado", "Memoria interna 256 GB"],
    breadcrumbs: ["También puede interesarte", "Celulares y Teléfonos", "Samsung"],
    category: "Celulares y Teléfonos",
    subcategory: "Celulares y Smartphones",
    brand: "Samsung",
    model: "Galaxy A55 5G",
  };

  it("should render product details correctly", () => {
    render(<ProductDetail product={mockProduct} />);

    // Use getAllByText to handle multiple elements with same text
    expect(screen.getAllByText(mockProduct.title)[0]).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByTestId("image-gallery")).toBeInTheDocument();
    expect(screen.getByTestId("product-price")).toBeInTheDocument();
    expect(screen.getByTestId("product-actions")).toBeInTheDocument();
  });

  it("should render breadcrumbs when provided", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
    mockProduct.breadcrumbs?.forEach((breadcrumb) => {
      expect(screen.getByText(breadcrumb)).toBeInTheDocument();
    });
  });

  it("should render variant selector", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByTestId("variant-selector")).toBeInTheDocument();
    expect(screen.getByText("Color: blue")).toBeInTheDocument();
    expect(screen.getByText("Storage: 256gb")).toBeInTheDocument();
  });

  it("should render key features when provided", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByTestId("key-features")).toBeInTheDocument();
    mockProduct.keyFeatures?.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it("should render product specifications", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByTestId("product-specifications")).toBeInTheDocument();
    expect(screen.getByText("Pantalla:")).toBeInTheDocument();
    expect(screen.getByText("RAM:")).toBeInTheDocument();
  });

  it("should render seller information", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText(mockProduct.seller.name)).toBeInTheDocument();
    // Use getAllByText to handle multiple elements with same text
    expect(screen.getAllByText(mockProduct.seller.location)[0]).toBeInTheDocument();
    // Check if seller sales info is rendered (might be formatted differently)
    expect(screen.getByText(/ventas/)).toBeInTheDocument();
  });

  it("should render shipping information", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText("Envío gratis")).toBeInTheDocument();
    expect(
      screen.getByText(`Llega ${mockProduct.shipping.estimatedDays} a ${mockProduct.seller.location}`)
    ).toBeInTheDocument();
  });

  it("should render payment methods", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText("Medios de pago")).toBeInTheDocument();
    mockProduct.paymentMethods.forEach((method) => {
      expect(screen.getByText(method)).toBeInTheDocument();
    });
  });

  it("should render rating information", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText(mockProduct.rating.average.toString())).toBeInTheDocument();
    expect(screen.getByText(`(${mockProduct.rating.totalReviews} opiniones)`)).toBeInTheDocument();
  });

  it("should not render breadcrumbs when not provided", () => {
    const productWithoutBreadcrumbs = { ...mockProduct, breadcrumbs: undefined };
    render(<ProductDetail product={productWithoutBreadcrumbs} />);

    expect(screen.queryByTestId("breadcrumbs")).not.toBeInTheDocument();
  });

  it("should not render key features when not provided", () => {
    const productWithoutFeatures = { ...mockProduct, keyFeatures: undefined };
    render(<ProductDetail product={productWithoutFeatures} />);

    expect(screen.queryByTestId("key-features")).not.toBeInTheDocument();
  });

  it("should render quantity selector", () => {
    render(<ProductDetail product={mockProduct} />);

    expect(screen.getByText("Cantidad:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(`(${mockProduct.stock} disponibles)`)).toBeInTheDocument();
  });
});
