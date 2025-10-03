import { render, screen, fireEvent } from "@testing-library/react";
import { VariantSelector } from "../../src/components/ui/VariantSelector";
import { Product } from "../../src/types/product";

const mockProduct: Product = {
  id: "1",
  title: "Test Product",
  condition: "new",
  sales: 100,
  rating: { average: 4.5, totalReviews: 50 },
  price: { amount: 1000, currency: "ARS", decimals: 2 },
  freeShipping: true,
  fullShipping: true,
  seller: { name: "Test Seller", link: "#", rating: 4.8, sales: 100 },
  returns: "Free returns",
  guarantees: [],
  images: [],
  description: "Test description",
  keyFeatures: [],
  specifications: [],
  variants: {
    color: [
      { label: "Red", value: "red", hex: "#FF0000", available: true, name: "Red" },
      { label: "Blue", value: "blue", hex: "#0000FF", available: true, name: "Blue" },
    ],
    storage: [
      { label: "128 GB", value: "128gb", available: true, name: "128 GB" },
      { label: "256 GB", value: "256gb", available: true, name: "256 GB" },
    ],
  },
  breadcrumbs: [],
  paymentMethods: [],
  relatedProducts: [],
  stock: 10,
  shipping: { method: "Test", time: "Test" },
};

describe("VariantSelector", () => {
  const mockProps = {
    product: mockProduct,
    selectedColor: "red",
    selectedStorage: "128gb",
    onColorSelect: jest.fn(),
    onStorageSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render color selector", () => {
    render(<VariantSelector {...mockProps} />);

    expect(screen.getByText("Color: Red")).toBeInTheDocument();
  });

  it("should render storage selector", () => {
    render(<VariantSelector {...mockProps} />);

    expect(screen.getByText("Almacenamiento:")).toBeInTheDocument();
  });

  it("should render color options", () => {
    render(<VariantSelector {...mockProps} />);

    const buttons = screen.getAllByRole("button");
    const colorButtons = buttons.filter(button => 
      button.getAttribute("class")?.includes("w-8 h-8 rounded-full")
    );

    expect(colorButtons).toHaveLength(2);
  });

  it("should render storage options", () => {
    render(<VariantSelector {...mockProps} />);

    const buttons = screen.getAllByRole("button");
    const storageButtons = buttons.filter(button => 
      button.getAttribute("class")?.includes("px-3 py-2 text-sm border rounded")
    );

    expect(storageButtons).toHaveLength(2);
  });

  it("should call onColorSelect when color is clicked", () => {
    render(<VariantSelector {...mockProps} />);

    const buttons = screen.getAllByRole("button");
    const colorButtons = buttons.filter(button => 
      button.getAttribute("class")?.includes("w-8 h-8 rounded-full")
    );
    
    fireEvent.click(colorButtons[1]); // Click the second color button (blue)

    expect(mockProps.onColorSelect).toHaveBeenCalledWith("blue");
  });

  it("should call onStorageSelect when storage is clicked", () => {
    render(<VariantSelector {...mockProps} />);

    const buttons = screen.getAllByRole("button");
    const storageButtons = buttons.filter(button => 
      button.getAttribute("class")?.includes("px-3 py-2 text-sm border rounded")
    );
    
    fireEvent.click(storageButtons[1]); // Click the second storage button (256gb)

    expect(mockProps.onStorageSelect).toHaveBeenCalledWith("256gb");
  });

  it("should highlight selected color", () => {
    render(<VariantSelector {...mockProps} />);

    const buttons = screen.getAllByRole("button");
    const colorButtons = buttons.filter(button => 
      button.getAttribute("class")?.includes("w-8 h-8 rounded-full")
    );
    
    expect(colorButtons[0]).toHaveClass("border-blue-500", "ring-2", "ring-blue-200");
  });

  it("should highlight selected storage", () => {
    render(<VariantSelector {...mockProps} />);

    const buttons = screen.getAllByRole("button");
    const storageButtons = buttons.filter(button => 
      button.getAttribute("class")?.includes("px-3 py-2 text-sm border rounded")
    );
    
    expect(storageButtons[0]).toHaveClass("border-blue-500", "bg-blue-50", "text-blue-700");
  });

  it("should not render color selector when no color variants", () => {
    const productWithoutColors = {
      ...mockProduct,
      variants: {
        storage: [
          { label: "128 GB", value: "128gb", available: true, name: "128 GB" },
        ],
      },
    };

    render(<VariantSelector {...mockProps} product={productWithoutColors} />);

    expect(screen.queryByText(/Color:/)).not.toBeInTheDocument();
  });

  it("should not render storage selector when no storage variants", () => {
    const productWithoutStorage = {
      ...mockProduct,
      variants: {
        color: [
          { label: "Red", value: "red", hex: "#FF0000", available: true, name: "Red" },
        ],
      },
    };

    render(<VariantSelector {...mockProps} product={productWithoutStorage} />);

    expect(screen.queryByText(/Almacenamiento:/)).not.toBeInTheDocument();
  });

  it("should not render anything when no variants", () => {
    const productWithoutVariants = {
      ...mockProduct,
      variants: {},
    };

    render(<VariantSelector {...mockProps} product={productWithoutVariants} />);

    expect(screen.queryByText(/Color:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Almacenamiento:/)).not.toBeInTheDocument();
  });

  it("should handle undefined variants", () => {
    const productWithUndefinedVariants = {
      ...mockProduct,
      variants: undefined,
    };

    render(<VariantSelector {...mockProps} product={productWithUndefinedVariants} />);

    expect(screen.queryByText(/Color:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Almacenamiento:/)).not.toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const { container } = render(<VariantSelector {...mockProps} className="custom-class" />);

    const variantContainer = container.firstChild as HTMLElement;
    expect(variantContainer).toHaveClass("custom-class");
  });

  it("should handle empty color options", () => {
    const productWithEmptyColors = {
      ...mockProduct,
      variants: {
        color: [],
        storage: [
          { label: "128 GB", value: "128gb", available: true, name: "128 GB" },
        ],
      },
    };

    render(<VariantSelector {...mockProps} product={productWithEmptyColors} />);

    expect(screen.queryByText(/Color:/)).not.toBeInTheDocument();
  });

  it("should handle empty storage options", () => {
    const productWithEmptyStorage = {
      ...mockProduct,
      variants: {
        color: [
          { label: "Red", value: "red", hex: "#FF0000", available: true, name: "Red" },
        ],
        storage: [],
      },
    };

    render(<VariantSelector {...mockProps} product={productWithEmptyStorage} />);

    expect(screen.queryByText(/Almacenamiento:/)).not.toBeInTheDocument();
  });

  it("should show correct selected color name", () => {
    render(<VariantSelector {...mockProps} selectedColor="blue" />);

    expect(screen.getByText("Color: Blue")).toBeInTheDocument();
  });

  it("should show correct selected storage name", () => {
    render(<VariantSelector {...mockProps} selectedStorage="256gb" />);

    expect(screen.getByText("Almacenamiento:")).toBeInTheDocument();
    expect(screen.getByText("256 GB")).toBeInTheDocument();
  });

  it("should handle unknown selected color", () => {
    render(<VariantSelector {...mockProps} selectedColor="unknown" />);

    expect(screen.getByText("Color:")).toBeInTheDocument();
  });

  it("should handle unknown selected storage", () => {
    render(<VariantSelector {...mockProps} selectedStorage="unknown" />);

    expect(screen.getByText("Almacenamiento:")).toBeInTheDocument();
  });
});