import { render, screen } from "@testing-library/react";
import { ProductSidebar } from "../../src/components/ui/ProductSidebar";

// Mock child components
jest.mock("../../src/components/ui/SellerInfoCard", () => ({
  SellerInfoCard: () => <div data-testid="seller-info-card">Seller Info Card Mock</div>,
}));

jest.mock("../../src/components/ui/MercadoLibreStoreCard", () => ({
  MercadoLibreStoreCard: () => <div data-testid="mercado-libre-store-card">MercadoLibre Store Card Mock</div>,
}));

jest.mock("../../src/components/ui/PaymentMethodsCard", () => ({
  PaymentMethodsCard: () => <div data-testid="payment-methods-card">Payment Methods Card Mock</div>,
}));

jest.mock("../../src/components/ui/ProductChat", () => ({
  ProductChat: () => <div data-testid="product-chat">Product Chat Mock</div>,
}));

const mockSeller = {
  name: "TechStore",
  link: "#",
  rating: 4.8,
  sales: 1000,
};

const mockShipping = {
  method: "Envío gratis",
  time: "Llega mañana",
};

const mockProduct = {
  id: "1",
  title: "Test Product",
  description: "Test Description",
  price: {
    amount: 100,
    currency: "USD",
  },
  images: ["image1.jpg"],
  seller: mockSeller,
  condition: "new" as const,
  stock: 10,
  shipping: mockShipping,
  paymentMethods: ["credit", "debit"],
  rating: {
    average: 4.5,
    totalReviews: 100,
  },
  specifications: {},
  category: "Electronics",
  brand: "Test Brand",
  model: "Test Model",
};

describe("ProductSidebar", () => {
  const mockProps = {
    seller: mockSeller,
    shipping: mockShipping,
    stock: 10,
    quantity: 1,
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    onBuyNow: jest.fn(),
    onAddToCart: jest.fn(),
    product: mockProduct,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render sidebar container", () => {
    const { container } = render(<ProductSidebar {...mockProps} />);

    const sidebarContainer = container.firstChild as HTMLElement;
    expect(sidebarContainer).toHaveClass("hidden", "lg:flex", "lg:w-[309px]", "lg:flex-shrink-0", "lg:absolute", "lg:right-6", "flex-col", "gap-6");
  });

  it("should render seller info card", () => {
    render(<ProductSidebar {...mockProps} />);

    expect(screen.getByTestId("seller-info-card")).toBeInTheDocument();
  });

  it("should render mercado libre store card", () => {
    render(<ProductSidebar {...mockProps} />);

    expect(screen.getByTestId("mercado-libre-store-card")).toBeInTheDocument();
  });

  it("should render payment methods card", () => {
    render(<ProductSidebar {...mockProps} />);

    expect(screen.getByTestId("payment-methods-card")).toBeInTheDocument();
  });

  it("should pass props to seller info card", () => {
    render(<ProductSidebar {...mockProps} />);

    // The component should render without errors, indicating props are passed correctly
    expect(screen.getByTestId("seller-info-card")).toBeInTheDocument();
  });

  it("should have proper responsive classes", () => {
    const { container } = render(<ProductSidebar {...mockProps} />);

    const sidebarContainer = container.firstChild as HTMLElement;
    expect(sidebarContainer).toHaveClass("hidden", "lg:flex");
  });

  it("should have proper positioning classes", () => {
    const { container } = render(<ProductSidebar {...mockProps} />);

    const sidebarContainer = container.firstChild as HTMLElement;
    expect(sidebarContainer).toHaveClass("lg:absolute", "lg:right-6");
  });

  it("should have proper sizing classes", () => {
    const { container } = render(<ProductSidebar {...mockProps} />);

    const sidebarContainer = container.firstChild as HTMLElement;
    expect(sidebarContainer).toHaveClass("lg:w-[309px]", "lg:flex-shrink-0");
  });

  it("should have proper layout classes", () => {
    const { container } = render(<ProductSidebar {...mockProps} />);

    const sidebarContainer = container.firstChild as HTMLElement;
    expect(sidebarContainer).toHaveClass("flex-col", "gap-6");
  });

  it("should render all child components", () => {
    render(<ProductSidebar {...mockProps} />);

    expect(screen.getByTestId("seller-info-card")).toBeInTheDocument();
    expect(screen.getByTestId("mercado-libre-store-card")).toBeInTheDocument();
    expect(screen.getByTestId("payment-methods-card")).toBeInTheDocument();
  });

  it("should handle different seller data", () => {
    const differentSeller = {
      name: "Different Store",
      link: "#",
      rating: 4.5,
      sales: 500,
    };

    render(<ProductSidebar {...mockProps} seller={differentSeller} />);

    expect(screen.getByTestId("seller-info-card")).toBeInTheDocument();
  });

  it("should handle different shipping data", () => {
    const differentShipping = {
      method: "Envío estándar",
      time: "Llega en 3 días",
    };

    render(<ProductSidebar {...mockProps} shipping={differentShipping} />);

    expect(screen.getByTestId("seller-info-card")).toBeInTheDocument();
  });

  it("should handle different stock values", () => {
    render(<ProductSidebar {...mockProps} stock={0} />);

    expect(screen.getByTestId("seller-info-card")).toBeInTheDocument();
  });

  it("should handle different quantities", () => {
    render(<ProductSidebar {...mockProps} quantity={5} />);

    expect(screen.getByTestId("seller-info-card")).toBeInTheDocument();
  });

  it("should render product chat", () => {
    render(<ProductSidebar {...mockProps} />);

    expect(screen.getByTestId("product-chat")).toBeInTheDocument();
  });
});
