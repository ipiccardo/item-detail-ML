import { render, screen, fireEvent } from "@testing-library/react";
import ProductActions from "../ProductActions";

// Mock window.alert
const mockAlert = jest.fn();
Object.defineProperty(window, "alert", {
  value: mockAlert,
  writable: true,
});

// Mock window.navigator
const mockNavigator = {
  share: jest.fn(),
  clipboard: {
    writeText: jest.fn(),
  },
};

Object.defineProperty(window, "navigator", {
  value: mockNavigator,
  writable: true,
});

describe("ProductActions", () => {
  const mockActions = {
    onBuyNow: jest.fn(),
    onAddToCart: jest.fn(),
    onAddToFavorites: jest.fn(),
    onShare: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all action buttons", () => {
    render(<ProductActions actions={mockActions} />);
    
    expect(screen.getByText("Comprar ahora")).toBeInTheDocument();
    expect(screen.getByText("Agregar al carrito")).toBeInTheDocument();
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByText("Compartir")).toBeInTheDocument();
  });

  it("should call onBuyNow when buy now button is clicked", () => {
    render(<ProductActions actions={mockActions} />);
    
    const buyNowButton = screen.getByText("Comprar ahora");
    fireEvent.click(buyNowButton);
    
    expect(mockActions.onBuyNow).toHaveBeenCalledTimes(1);
  });

  it("should call onAddToCart when add to cart button is clicked", () => {
    render(<ProductActions actions={mockActions} />);
    
    const addToCartButton = screen.getByText("Agregar al carrito");
    fireEvent.click(addToCartButton);
    
    expect(mockActions.onAddToCart).toHaveBeenCalledTimes(1);
  });

  it("should call onAddToFavorites when favorites button is clicked", () => {
    render(<ProductActions actions={mockActions} />);
    
    const favoritesButton = screen.getByText("Favoritos");
    fireEvent.click(favoritesButton);
    
    expect(mockActions.onAddToFavorites).toHaveBeenCalledTimes(1);
  });

  it("should call onShare when share button is clicked", () => {
    render(<ProductActions actions={mockActions} />);
    
    const shareButton = screen.getByText("Compartir");
    fireEvent.click(shareButton);
    
    expect(mockActions.onShare).toHaveBeenCalledTimes(1);
  });

  it("should have correct styling for buttons", () => {
    render(<ProductActions actions={mockActions} />);
    
    const buyNowButton = screen.getByText("Comprar ahora");
    const addToCartButton = screen.getByText("Agregar al carrito");
    
    expect(buyNowButton).toHaveClass("bg-blue-600", "text-white");
    expect(addToCartButton).toHaveClass("border-blue-600", "text-blue-600");
  });
});
