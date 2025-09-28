import { render, screen, fireEvent } from "@testing-library/react";
import { VariantSelector } from "../VariantSelector";
import { Product } from "@/types/product";

const mockProduct: Product = {
  id: "1",
  title: "Test Product",
  description: "Test Description",
  price: { amount: 1000, currency: "ARS" },
  images: ["image1.jpg"],
  seller: {
    id: "1",
    name: "Test Seller",
    reputation: 4.5,
    sales: 100,
    location: "Test Location",
  },
  condition: "new",
  stock: 10,
  shipping: { free: true, estimatedDays: "1-2 días" },
  paymentMethods: ["Credit Card"],
  rating: { average: 4.5, totalReviews: 100 },
  specifications: {},
  variants: {
    color: [
      { name: "Red", value: "red", available: true },
      { name: "Blue", value: "blue", available: true },
      { name: "Green", value: "green", available: false },
    ],
    storage: [
      { name: "128GB", value: "128gb", available: true },
      { name: "256GB", value: "256gb", available: true },
      { name: "512GB", value: "512gb", available: false },
    ],
  },
  category: "Test Category",
  brand: "Test Brand",
  model: "Test Model",
};

describe("VariantSelector", () => {
  const mockOnColorSelect = jest.fn();
  const mockOnStorageSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render color selector", () => {
    render(
      <VariantSelector
        product={mockProduct}
        selectedColor="red"
        selectedStorage="128gb"
        onColorSelect={mockOnColorSelect}
        onStorageSelect={mockOnStorageSelect}
      />,
    );

    expect(screen.getByText("Color:")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Blue")).toBeInTheDocument();
    expect(screen.getByText("Green")).toBeInTheDocument();
  });

  it("should render storage selector", () => {
    render(
      <VariantSelector
        product={mockProduct}
        selectedColor="red"
        selectedStorage="128gb"
        onColorSelect={mockOnColorSelect}
        onStorageSelect={mockOnStorageSelect}
      />,
    );

    expect(screen.getByText("Almacenamiento:")).toBeInTheDocument();
    expect(screen.getByText("128GB")).toBeInTheDocument();
    expect(screen.getByText("256GB")).toBeInTheDocument();
    expect(screen.getByText("512GB")).toBeInTheDocument();
  });

  it("should call onColorSelect when color is clicked", () => {
    render(
      <VariantSelector
        product={mockProduct}
        selectedColor="red"
        selectedStorage="128gb"
        onColorSelect={mockOnColorSelect}
        onStorageSelect={mockOnStorageSelect}
      />,
    );

    fireEvent.click(screen.getByText("Blue"));
    expect(mockOnColorSelect).toHaveBeenCalledWith("blue");
  });

  it("should call onStorageSelect when storage is clicked", () => {
    render(
      <VariantSelector
        product={mockProduct}
        selectedColor="red"
        selectedStorage="128gb"
        onColorSelect={mockOnColorSelect}
        onStorageSelect={mockOnStorageSelect}
      />,
    );

    fireEvent.click(screen.getByText("256GB"));
    expect(mockOnStorageSelect).toHaveBeenCalledWith("256gb");
  });

  it("should highlight selected color", () => {
    render(
      <VariantSelector
        product={mockProduct}
        selectedColor="red"
        selectedStorage="128gb"
        onColorSelect={mockOnColorSelect}
        onStorageSelect={mockOnStorageSelect}
      />,
    );

    const redButton = screen.getByText("Red");
    expect(redButton).toHaveClass("border-blue-500", "bg-blue-50", "text-blue-700");
  });

  it("should highlight selected storage", () => {
    render(
      <VariantSelector
        product={mockProduct}
        selectedColor="red"
        selectedStorage="256gb"
        onColorSelect={mockOnColorSelect}
        onStorageSelect={mockOnStorageSelect}
      />,
    );

    const storageButton = screen.getByText("256GB");
    expect(storageButton).toHaveClass("border-blue-500", "bg-blue-50", "text-blue-700");
  });

  it("should disable unavailable variants", () => {
    render(
      <VariantSelector
        product={mockProduct}
        selectedColor="red"
        selectedStorage="128gb"
        onColorSelect={mockOnColorSelect}
        onStorageSelect={mockOnStorageSelect}
      />,
    );

    const greenButton = screen.getByText("Green");
    const storage512Button = screen.getByText("512GB");

    expect(greenButton).toHaveClass("opacity-50", "cursor-not-allowed");
    expect(storage512Button).toHaveClass("opacity-50", "cursor-not-allowed");
  });

  it("should not render if no variants", () => {
    const productWithoutVariants = {
      ...mockProduct,
      variants: undefined,
    };

    const { container } = render(
      <VariantSelector
        product={productWithoutVariants}
        selectedColor="red"
        selectedStorage="128gb"
        onColorSelect={mockOnColorSelect}
        onStorageSelect={mockOnStorageSelect}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("should apply custom className", () => {
    const { container } = render(
      <VariantSelector
        product={mockProduct}
        selectedColor="red"
        selectedStorage="128gb"
        onColorSelect={mockOnColorSelect}
        onStorageSelect={mockOnStorageSelect}
        className="custom-class"
      />,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
