/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { Product } from "../../src/types/product";

const mockProduct: Product = {
    id: "1",
    title: "Samsung Galaxy S24 Ultra 256GB",
    condition: "new",
    rating: {
        average: 4.5,
        totalReviews: 150,
    },
    price: {
        amount: 1200000,
        currency: "ARS",
    },
    seller: {
        id: "seller1",
        name: "TechStore",
        reputation: 4.8,
        sales: 1000,
        location: "Buenos Aires",
    },
    images: ["/images/test1.jpg", "/images/test2.jpg"],
    description: "Test description",
    keyFeatures: ["Feature 1", "Feature 2"],
    specifications: {},
    variants: {
        color: [
            {
                name: "Negro", value: "black",
                available: false,
            },
        ],
    },
    breadcrumbs: [],
    paymentMethods: [],
    stock: 10,
    shipping: {
        free: true,
        estimatedDays: "1",
    },
    brand: "Samsung",
    category: "Electronics",
    model: "Galaxy S24 Ultra",
};

// Mock child components
jest.mock("../../src/components/ui/ImageGallery", () => ({
    __esModule: true,
    default: () => <div data-testid="image-gallery">Image Gallery Mock</div>,
}));

jest.mock("../../src/components/ui/ProductPrice", () => ({
    __esModule: true,
    default: () => <div data-testid="product-price">Product Price Mock</div>,
}));

jest.mock("../../src/components/ui/VariantSelector", () => ({
    VariantSelector: () => <div data-testid="variant-selector">Variant Selector Mock</div>,
}));

jest.mock("../../src/components/ui/KeyFeatures", () => ({
    KeyFeatures: () => <div data-testid="key-features">Key Features Mock</div>,
}));

jest.mock("../../src/components/ui/TradeInPlan", () => ({
    __esModule: true,
    default: () => <div data-testid="trade-in-plan">Trade In Plan Mock</div>,
}));

jest.mock("../../src/components/ui/ProductHeader", () => ({
    ProductHeader: () => <div data-testid="product-header">Product Header Mock</div>,
}));

jest.mock("../../src/components/ui/ProductMobileActions", () => ({
    ProductMobileActions: () => <div data-testid="product-mobile-actions">Product Mobile Actions Mock</div>,
}));

jest.mock("../../src/components/ui/ProductSidebar", () => ({
    ProductSidebar: () => <div data-testid="product-sidebar">Product Sidebar Mock</div>,
}));

jest.mock("../../src/components/ui/ProductMobileSections", () => ({
    ProductMobileSections: () => <div data-testid="product-mobile-sections">Product Mobile Sections Mock</div>,
}));

jest.mock("../../src/components/ui/ProductMainContent", () => ({
    ProductMainContent: () => <div data-testid="product-main-content">Product Main Content Mock</div>,
}));

// Mock hooks
jest.mock("../../src/hooks", () => ({
    useQuantity: () => ({
        quantity: 1,
        increment: jest.fn(),
        decrement: jest.fn(),
    }),
    useVariants: () => ({
        selectedVariants: { color: "black", storage: "256gb" },
        selectColor: jest.fn(),
        selectStorage: jest.fn(),
        getSelectedColor: jest.fn(),
        getSelectedStorage: jest.fn(),
        getCurrentPrice: jest.fn().mockReturnValue(1200000),
        getCurrentImage: jest.fn().mockReturnValue("/images/test.jpg"),
    }),
    useRelatedProductsService: () => ({
        relatedProducts: [],
        isLoading: false,
    }),
    useProductActions: () => ({
        handleBuyNow: jest.fn(),
        handleAddToCart: jest.fn(),
    }),
    useProductWithVariants: jest.fn(() => ({
        updatedProduct: {
            id: "1",
            title: "Samsung Galaxy S24 Ultra 256GB",
            condition: "new",
            sales: 1000,
            rating: { average: 4.5, totalReviews: 150 },
            price: { amount: 1200000, currency: "ARS", decimals: 2 },
            freeShipping: true,
            fullShipping: true,
            seller: { name: "TechStore", link: "#", rating: 4.8, sales: 1000 },
            returns: "Devolución gratis",
            guarantees: [],
            images: ["/images/test.jpg", "/images/test1.jpg", "/images/test2.jpg"],
            description: "Test description",
            keyFeatures: ["Feature 1", "Feature 2"],
            specifications: {},
            variants: [{ type: "color", name: "Color", options: [{ label: "Negro", value: "black", hex: "#000000" }] }],
            breadcrumbs: [],
            paymentMethods: [],
            relatedProducts: [],
            stock: 10,
            shipping: { method: "Envío gratis", time: "Llega mañana" },
        },
    })),
}));

describe("ProductDetail", () => {
    it("should render product detail page", () => {
        render(<ProductDetail product={mockProduct} />);

        expect(screen.getByTestId("image-gallery")).toBeInTheDocument();
        expect(screen.getByTestId("product-header")).toBeInTheDocument();
        expect(screen.getByTestId("product-price")).toBeInTheDocument();
        expect(screen.getByTestId("product-mobile-actions")).toBeInTheDocument();
        expect(screen.getByTestId("variant-selector")).toBeInTheDocument();
        expect(screen.getByTestId("trade-in-plan")).toBeInTheDocument();
        expect(screen.getByTestId("key-features")).toBeInTheDocument();
        expect(screen.getByTestId("product-sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("product-mobile-sections")).toBeInTheDocument();
        expect(screen.getByTestId("product-main-content")).toBeInTheDocument();
    });

    it("should have proper container structure", () => {
        const { container } = render(<ProductDetail product={mockProduct} />);

        const mainContainer = container.firstChild;
        expect(mainContainer).toHaveClass("min-h-screen", "bg-white");
    });

    it("should render with product data", () => {
        render(<ProductDetail product={mockProduct} />);

        // The component should render without errors
        expect(screen.getByTestId("image-gallery")).toBeInTheDocument();
        expect(screen.getByTestId("product-price")).toBeInTheDocument();
    });

    it("should handle product without images", () => {
        const productWithoutImages = { ...mockProduct, images: [] };
        render(<ProductDetail product={productWithoutImages} />);

        expect(screen.getByTestId("image-gallery")).toBeInTheDocument();
        expect(screen.getByTestId("product-main-content")).toBeInTheDocument();
    });

    it("should handle product without variants", () => {
        const productWithoutVariants = { ...mockProduct, variants: {} };
        render(<ProductDetail product={productWithoutVariants} />);

        expect(screen.getByTestId("variant-selector")).toBeInTheDocument();
        expect(screen.getByTestId("product-main-content")).toBeInTheDocument();
    });

    it("should handle product without specifications", () => {
        const productWithoutSpecs = { ...mockProduct, specifications: {} };
        render(<ProductDetail product={productWithoutSpecs} />);

        expect(screen.getByTestId("product-main-content")).toBeInTheDocument();
    });

    it("should render all main sections", () => {
        render(<ProductDetail product={mockProduct} />);

        // Check that all main sections are present
        expect(screen.getByTestId("image-gallery")).toBeInTheDocument();
        expect(screen.getByTestId("product-header")).toBeInTheDocument();
        expect(screen.getByTestId("product-price")).toBeInTheDocument();
        expect(screen.getByTestId("product-mobile-actions")).toBeInTheDocument();
        expect(screen.getByTestId("variant-selector")).toBeInTheDocument();
        expect(screen.getByTestId("trade-in-plan")).toBeInTheDocument();
        expect(screen.getByTestId("key-features")).toBeInTheDocument();
        expect(screen.getByTestId("product-sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("product-mobile-sections")).toBeInTheDocument();
        expect(screen.getByTestId("product-main-content")).toBeInTheDocument();
    });

    it("should have proper responsive layout", () => {
        const { container } = render(<ProductDetail product={mockProduct} />);

        const mainContainer = container.firstChild;
        expect(mainContainer).toHaveClass("min-h-screen", "bg-white");
    });

    it("should handle product with minimal data", () => {
        const minimalProduct = {
            id: "1",
            title: "Test Product",
            description: "",
            condition: "new" as const,
            price: { amount: 0, currency: "ARS" },
            images: [],
            rating: { average: 0, totalReviews: 0 },
            stock: 0,
            seller: { id: "seller1", name: "Test", reputation: 0, sales: 0, location: "Buenos Aires" },
            shipping: { free: false, estimatedDays: "1" },
            paymentMethods: [],
            brand: "Test Brand",
            category: "Electronics",
            model: "Test Model",
            specifications: {},
            variants: {},
        };

        render(<ProductDetail product={minimalProduct} />);

        expect(screen.getByTestId("image-gallery")).toBeInTheDocument();
        expect(screen.getByTestId("product-main-content")).toBeInTheDocument();
    });

    it("should render key features when available", () => {
        const productWithFeatures = {
            ...mockProduct,
            keyFeatures: ["Feature 1", "Feature 2"],
        };

        render(<ProductDetail product={productWithFeatures} />);

        expect(screen.getByTestId("key-features")).toBeInTheDocument();
    });

    it("should not render key features when empty", () => {
        const productWithoutFeatures = {
            ...mockProduct,
            keyFeatures: [],
        };

        render(<ProductDetail product={productWithoutFeatures} />);

        expect(screen.queryByTestId("key-features")).not.toBeInTheDocument();
    });
});
