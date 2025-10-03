import { render, screen, fireEvent } from "@testing-library/react";
import ProductActions from "../../../src/components/ui/ProductActions";
import type { ProductActions as ProductActionsType } from "../../../src/types/ui";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Heart: (props: any) => <svg {...props} data-testid="heart-icon" />,
    Share2: (props: any) => <svg {...props} data-testid="share-icon" />,
    GitCompare: (props: any) => <svg {...props} data-testid="compare-icon" />,
}));

describe("ProductActions", () => {
    const mockActions: ProductActionsType = {
        onBuyNow: jest.fn(),
        onAddToCart: jest.fn(),
        onAddToFavorites: jest.fn(),
        onAddToCompare: jest.fn(),
        onShare: jest.fn(),
        isFavorite: false,
        isInCompare: false,
        canAddToCompare: true,
    };

    const defaultProps = {
        actions: mockActions,
        quantity: 1,
        stock: 10,
        onIncrement: jest.fn(),
        onDecrement: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render main action buttons", () => {
        render(<ProductActions {...defaultProps} />);

        expect(screen.getByText("Comprar ahora")).toBeInTheDocument();
        expect(screen.getByText("Agregar al carrito")).toBeInTheDocument();
    });

    it("should call onBuyNow when buy now button is clicked", () => {
        render(<ProductActions {...defaultProps} />);

        fireEvent.click(screen.getByText("Comprar ahora"));
        expect(mockActions.onBuyNow).toHaveBeenCalledTimes(1);
    });

    it("should call onAddToCart when add to cart button is clicked", () => {
        render(<ProductActions {...defaultProps} />);

        fireEvent.click(screen.getByText("Agregar al carrito"));
        expect(mockActions.onAddToCart).toHaveBeenCalledTimes(1);
    });

    it("should render quantity selector", () => {
        render(<ProductActions {...defaultProps} />);

        expect(screen.getByText("Cantidad:")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("(10 disponibles)")).toBeInTheDocument();
    });

    it("should call onIncrement when plus button is clicked", () => {
        render(<ProductActions {...defaultProps} />);

        fireEvent.click(screen.getByText("+"));
        expect(defaultProps.onIncrement).toHaveBeenCalledTimes(1);
    });

    it("should call onDecrement when minus button is clicked", () => {
        render(<ProductActions {...defaultProps} quantity={2} />);

        fireEvent.click(screen.getByText("-"));
        expect(defaultProps.onDecrement).toHaveBeenCalledTimes(1);
    });

    it("should disable decrement button when quantity is 1", () => {
        render(<ProductActions {...defaultProps} quantity={1} />);

        const decrementButton = screen.getByText("-");
        expect(decrementButton).toBeDisabled();
    });

    it("should disable increment button when quantity equals stock", () => {
        render(<ProductActions {...defaultProps} quantity={10} stock={10} />);

        const incrementButton = screen.getByText("+");
        expect(incrementButton).toBeDisabled();
    });

    it("should render secondary action buttons", () => {
        render(<ProductActions {...defaultProps} />);

        expect(screen.getByText("Favoritos")).toBeInTheDocument();
        expect(screen.getByText("Comparar")).toBeInTheDocument();
        expect(screen.getByText("Compartir")).toBeInTheDocument();
    });

    it("should render favorite button as active when isFavorite is true", () => {
        render(<ProductActions {...defaultProps} actions={{ ...mockActions, isFavorite: true }} />);

        expect(screen.getByText("En favoritos")).toBeInTheDocument();
        expect(screen.getByTestId("heart-icon")).toHaveClass("fill-current", "scale-110");
    });

    it("should call onAddToFavorites when favorites button is clicked", () => {
        render(<ProductActions {...defaultProps} />);

        fireEvent.click(screen.getByText("Favoritos"));
        expect(mockActions.onAddToFavorites).toHaveBeenCalledTimes(1);
    });

    it("should render compare button as active when isInCompare is true", () => {
        render(<ProductActions {...defaultProps} actions={{ ...mockActions, isInCompare: true }} />);

        expect(screen.getByText("En comparar")).toBeInTheDocument();
    });

    it("should render compare button as disabled when canAddToCompare is false", () => {
        render(<ProductActions {...defaultProps} actions={{ ...mockActions, canAddToCompare: false }} />);

        const compareButton = screen.getByText("Límite alcanzado").closest("button");
        expect(compareButton).toBeDisabled();
    });

    it("should call onAddToCompare when compare button is clicked", () => {
        render(<ProductActions {...defaultProps} />);

        fireEvent.click(screen.getByText("Comparar"));
        expect(mockActions.onAddToCompare).toHaveBeenCalledTimes(1);
    });

    it("should call onShare when share button is clicked", () => {
        render(<ProductActions {...defaultProps} />);

        fireEvent.click(screen.getByText("Compartir"));
        expect(mockActions.onShare).toHaveBeenCalledTimes(1);
    });

    it("should render all icons", () => {
        render(<ProductActions {...defaultProps} />);

        expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
        expect(screen.getByTestId("compare-icon")).toBeInTheDocument();
        expect(screen.getByTestId("share-icon")).toBeInTheDocument();
    });

    it("should apply correct styling to main buttons", () => {
        render(<ProductActions {...defaultProps} />);

        const buyNowButton = screen.getByText("Comprar ahora");
        const addToCartButton = screen.getByText("Agregar al carrito");

        expect(buyNowButton).toHaveClass("ml-button-primary");
        expect(addToCartButton).toHaveClass("ml-button-secondary");
    });

    it("should apply correct styling to quantity selector", () => {
        render(<ProductActions {...defaultProps} />);

        const quantityContainer = screen.getByText("1").closest("div");
        expect(quantityContainer).toHaveClass("flex", "items-center", "border", "border-gray-300", "rounded");
    });

    it("should apply correct styling to secondary actions", () => {
        render(<ProductActions {...defaultProps} />);

        const secondaryActionsContainer = screen.getByText("Favoritos").closest("div");
        expect(secondaryActionsContainer).toHaveClass("flex", "gap-4", "pt-2");
    });

    it("should handle favorite button hover states", () => {
        render(<ProductActions {...defaultProps} actions={{ ...mockActions, isFavorite: true }} />);

        const favoriteButton = screen.getByText("En favoritos").closest("button");
        expect(favoriteButton).toHaveClass("text-red-600", "hover:text-red-700", "hover:bg-red-50");
    });

    it("should handle compare button hover states", () => {
        render(<ProductActions {...defaultProps} actions={{ ...mockActions, isInCompare: true }} />);

        const compareButton = screen.getByText("En comparar").closest("button");
        expect(compareButton).toHaveClass("text-blue-600", "hover:text-blue-700", "hover:bg-blue-50");
    });

    it("should display correct stock information", () => {
        render(<ProductActions {...defaultProps} stock={5} />);

        expect(screen.getByText("(5 disponibles)")).toBeInTheDocument();
    });

    it("should display correct quantity", () => {
        render(<ProductActions {...defaultProps} quantity={3} />);

        expect(screen.getByText("3")).toBeInTheDocument();
    });
});
