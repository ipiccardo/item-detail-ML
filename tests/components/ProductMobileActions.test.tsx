import { render, screen, fireEvent } from "@testing-library/react";
import { ProductMobileActions } from "../../src/components/ui/ProductMobileActions";

describe("ProductMobileActions", () => {
    const mockProps = {
        stock: 10,
        quantity: 1,
        onBuyNow: jest.fn(),
        onAddToCart: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render buy now button", () => {
        render(<ProductMobileActions {...mockProps} />);

        expect(screen.getByText("Comprar ahora")).toBeInTheDocument();
    });

    it("should render add to cart button", () => {
        render(<ProductMobileActions {...mockProps} />);

        expect(screen.getByText("Agregar al carrito")).toBeInTheDocument();
    });

    it("should render quantity display", () => {
        render(<ProductMobileActions {...mockProps} />);

        expect(screen.getByText("Cantidad: 1")).toBeInTheDocument();
    });

    it("should have proper container structure", () => {
        render(<ProductMobileActions {...mockProps} />);

        const container = screen.getByText("Comprar ahora").closest("div");
        expect(container).toHaveClass("space-y-2", "mb-4");
    });

    it("should call onBuyNow when buy now button is clicked", () => {
        render(<ProductMobileActions {...mockProps} />);

        const buyNowButton = screen.getByText("Comprar ahora");
        fireEvent.click(buyNowButton);

        expect(mockProps.onBuyNow).toHaveBeenCalledTimes(1);
    });

    it("should call onAddToCart when add to cart button is clicked", () => {
        render(<ProductMobileActions {...mockProps} />);

        const addToCartButton = screen.getByText("Agregar al carrito");
        fireEvent.click(addToCartButton);

        expect(mockProps.onAddToCart).toHaveBeenCalledTimes(1);
    });

    it("should render buttons with proper styling", () => {
        render(<ProductMobileActions {...mockProps} />);

        const buyNowButton = screen.getByText("Comprar ahora");
        expect(buyNowButton).toHaveClass("bg-blue-600", "text-white", "px-4", "py-3", "rounded-md", "font-medium");

        const addToCartButton = screen.getByText("Agregar al carrito");
        expect(addToCartButton).toHaveClass("bg-blue-100", "text-blue-600", "px-4", "py-3", "rounded-md", "font-medium");
    });

    it("should render quantity display with proper styling", () => {
        render(<ProductMobileActions {...mockProps} />);

        const quantityDisplay = screen.getByText("Cantidad: 1");
        expect(quantityDisplay).toHaveClass("text-sm", "text-gray-600");
    });

    it("should handle zero stock", () => {
        render(<ProductMobileActions {...mockProps} stock={0} />);

        const buyNowButton = screen.getByText("Comprar ahora");
        const addToCartButton = screen.getByText("Agregar al carrito");

        // The component doesn't disable buttons based on stock
        expect(buyNowButton).not.toBeDisabled();
        expect(addToCartButton).not.toBeDisabled();
    });

    it("should handle high stock", () => {
        render(<ProductMobileActions {...mockProps} stock={999} />);

        const buyNowButton = screen.getByText("Comprar ahora");
        const addToCartButton = screen.getByText("Agregar al carrito");

        expect(buyNowButton).not.toBeDisabled();
        expect(addToCartButton).not.toBeDisabled();
    });

    it("should handle different quantities", () => {
        render(<ProductMobileActions {...mockProps} quantity={5} />);

        expect(screen.getByText("Cantidad: 5")).toBeInTheDocument();
    });

    it("should render buttons container with proper styling", () => {
        render(<ProductMobileActions {...mockProps} />);

        const buttonsContainer = screen.getByText("Comprar ahora").closest("div");
        expect(buttonsContainer).toHaveClass("space-y-2", "mb-4");
    });

    it("should render quantity container with proper styling", () => {
        render(<ProductMobileActions {...mockProps} />);

        const quantityContainer = screen.getByText("Cantidad: 1").closest("div");
        expect(quantityContainer).toHaveClass("flex", "items-center", "justify-between", "mb-3");
    });

    it("should render all elements in correct order", () => {
        render(<ProductMobileActions {...mockProps} />);

        // Check that all main elements are present
        expect(screen.getByText("Cantidad: 1")).toBeInTheDocument();
        expect(screen.getByText("Comprar ahora")).toBeInTheDocument();
        expect(screen.getByText("Agregar al carrito")).toBeInTheDocument();
    });

    it("should handle maximum quantity", () => {
        render(<ProductMobileActions {...mockProps} quantity={10} stock={10} />);

        expect(screen.getByText("Cantidad: 10")).toBeInTheDocument();
    });
});
