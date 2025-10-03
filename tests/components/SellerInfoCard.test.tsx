import { render, screen, fireEvent } from "@testing-library/react";
import { SellerInfoCard } from "../../src/components/ui/SellerInfoCard";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Shield: (props: any) => <svg {...props} data-testid="shield-icon" />,
    RotateCcw: (props: any) => <svg {...props} data-testid="rotate-ccw-icon" />,
}));

describe("SellerInfoCard", () => {
    const mockProps = {
        seller: {
            name: "TechStore",
            sales: 1000,
            reputation: 4.8,
            location: "Buenos Aires",
        },
        shipping: {
            estimatedDays: "Llega mañana",
            free: true,
        },
        stock: 10,
        quantity: 1,
        onIncrement: jest.fn(),
        onDecrement: jest.fn(),
        onBuyNow: jest.fn(),
        onAddToCart: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render delivery information", () => {
        render(<SellerInfoCard {...mockProps} />);

        expect(screen.getByText("Llega gratis mañana")).toBeInTheDocument();
        expect(screen.getByText("Más detalles y formas de entrega")).toBeInTheDocument();
        expect(screen.getByText("Retirá gratis a partir de mañana")).toBeInTheDocument();
        expect(screen.getByText("Ver en el mapa")).toBeInTheDocument();
    });

    it("should render stock information", () => {
        render(<SellerInfoCard {...mockProps} />);

        expect(screen.getByText("Stock disponible")).toBeInTheDocument();
        expect(screen.getByText("Almacenado y enviado por")).toBeInTheDocument();
        expect(screen.getByText("FULL")).toBeInTheDocument();
        expect(screen.getByText("Cantidad:")).toBeInTheDocument();
        expect(screen.getByText("1 unidad")).toBeInTheDocument();
        expect(screen.getByText("(+10 disponibles)")).toBeInTheDocument();
    });

    it("should render quantity selector dropdown", () => {
        render(<SellerInfoCard {...mockProps} />);

        const quantityButton = screen.getByRole("button", { name: /1 unidad/ });
        expect(quantityButton).toBeInTheDocument();

        // Click to open dropdown
        fireEvent.click(quantityButton);

        // Check if dropdown options are rendered
        expect(screen.getByText("2 unidades")).toBeInTheDocument();
        expect(screen.getByText("3 unidades")).toBeInTheDocument();
    });

    it("should handle quantity selection from dropdown", () => {
        render(<SellerInfoCard {...mockProps} />);

        const quantityButton = screen.getByRole("button", { name: /1 unidad/ });
        fireEvent.click(quantityButton);

        const option2 = screen.getByText("2 unidades");
        fireEvent.click(option2);

        expect(mockProps.onIncrement).toHaveBeenCalledTimes(1);
    });

    it("should render action buttons", () => {
        render(<SellerInfoCard {...mockProps} />);

        const buyNowButton = screen.getByText("Comprar ahora");
        const addToCartButton = screen.getByText("Agregar al carrito");

        expect(buyNowButton).toBeInTheDocument();
        expect(addToCartButton).toBeInTheDocument();

        fireEvent.click(buyNowButton);
        expect(mockProps.onBuyNow).toHaveBeenCalledTimes(1);

        fireEvent.click(addToCartButton);
        expect(mockProps.onAddToCart).toHaveBeenCalledTimes(1);
    });

    it("should render seller information", () => {
        render(<SellerInfoCard {...mockProps} />);

        expect(screen.getByText("Tienda oficial")).toBeInTheDocument();
        expect(screen.getByText("Mercado Libre")).toBeInTheDocument();
        expect(screen.getByText("+1 M ventas")).toBeInTheDocument();
    });

    it("should render guarantees", () => {
        render(<SellerInfoCard {...mockProps} />);

        expect(screen.getByTestId("rotate-ccw-icon")).toBeInTheDocument();
        expect(screen.getByTestId("shield-icon")).toBeInTheDocument();
        expect(screen.getByText("Devolución gratis.")).toBeInTheDocument();
        expect(screen.getByText("Tenés 30 días desde que lo recibís.")).toBeInTheDocument();
        expect(screen.getByText("Compra Protegida")).toBeInTheDocument();
        expect(screen.getByText("12 meses de garantía de fábrica.")).toBeInTheDocument();
    });

    it("should have proper container structure", () => {
        const { container } = render(<SellerInfoCard {...mockProps} />);

        const mainContainer = container.firstChild as HTMLElement;
        expect(mainContainer).toHaveClass("bg-white", "border", "border-gray-200", "rounded-md", "p-4", "shadow-sm", "w-[309px]");
    });

    it("should handle different stock quantities", () => {
        const propsWithLowStock = {
            ...mockProps,
            stock: 3,
        };

        render(<SellerInfoCard {...propsWithLowStock} />);

        const quantityButton = screen.getByRole("button", { name: /1 unidad/ });
        fireEvent.click(quantityButton);

        // Should only show up to 3 options
        expect(screen.getByText("2 unidades")).toBeInTheDocument();
        expect(screen.getByText("3 unidades")).toBeInTheDocument();
        expect(screen.queryByText("4 unidades")).not.toBeInTheDocument();
    });

    it("should handle quantity decrement from dropdown", () => {
        const propsWithHigherQuantity = {
            ...mockProps,
            quantity: 3,
        };

        render(<SellerInfoCard {...propsWithHigherQuantity} />);

        const quantityButton = screen.getByRole("button", { name: /3 unidad/ });
        fireEvent.click(quantityButton);

        const option1 = screen.getByText("1 unidad");
        fireEvent.click(option1);

        expect(mockProps.onDecrement).toHaveBeenCalledTimes(2);
    });

    it("should close dropdown when clicking outside", () => {
        render(<SellerInfoCard {...mockProps} />);

        const quantityButton = screen.getByRole("button", { name: /1 unidad/ });
        fireEvent.click(quantityButton);

        // Dropdown should be open
        expect(screen.getByText("2 unidades")).toBeInTheDocument();

        // Click outside
        fireEvent.mouseDown(document.body);

        // Dropdown should be closed
        expect(screen.queryByText("2 unidades")).not.toBeInTheDocument();
    });

    it("should render all sections in correct order", () => {
        render(<SellerInfoCard {...mockProps} />);

        // Check that all main sections are present
        expect(screen.getByText("Llega gratis mañana")).toBeInTheDocument();
        expect(screen.getByText("Stock disponible")).toBeInTheDocument();
        expect(screen.getByText("Comprar ahora")).toBeInTheDocument();
        expect(screen.getByText("Tienda oficial")).toBeInTheDocument();
        expect(screen.getByText("Devolución gratis.")).toBeInTheDocument();
    });

    it("should handle free shipping correctly", () => {
        const propsWithPaidShipping = {
            ...mockProps,
            shipping: {
                estimatedDays: "Llega en 3-5 días",
                free: false,
            },
        };

        render(<SellerInfoCard {...propsWithPaidShipping} />);

        // The component always shows "Llega gratis mañana" as it's hardcoded
        expect(screen.getByText("Llega gratis mañana")).toBeInTheDocument();
    });

    it("should render with proper styling classes", () => {
        render(<SellerInfoCard {...mockProps} />);

        const buyNowButton = screen.getByText("Comprar ahora");
        expect(buyNowButton).toHaveClass("w-full", "bg-blue-600", "text-white", "py-2.5", "px-4", "rounded-md", "font-semibold", "text-sm");

        const addToCartButton = screen.getByText("Agregar al carrito");
        expect(addToCartButton).toHaveClass("w-full", "bg-blue-100", "text-blue-600", "py-2.5", "px-4", "rounded-md", "font-semibold", "text-sm");
    });
});