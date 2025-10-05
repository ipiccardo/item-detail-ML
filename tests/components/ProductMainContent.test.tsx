import { render, screen, fireEvent } from "@testing-library/react";
import { ProductMainContent } from "../../src/components/ui/ProductMainContent";

const mockRelatedProducts = [
    {
        id: "1",
        title: "Related Product 1",
        condition: "new" as const,
        sales: 100,
        rating: { average: 4.5, totalReviews: 50 },
        price: { amount: 100000, currency: "ARS", decimals: 2 },
        freeShipping: true,
        fullShipping: true,
        seller: { id: "1", name: "Test Seller", reputation: 4.8, sales: 100, location: "Buenos Aires" },
        returns: "Free returns",
        guarantees: [],
        images: ["/images/related1.jpg"],
        description: "Test description",
        keyFeatures: [],
        specifications: {},
        variants: {},
        breadcrumbs: [],
        paymentMethods: [],
        relatedProducts: [],
        stock: 10,
        shipping: { free: true, estimatedDays: "1-2 días" },
        category: "Test Category",
        brand: "Test Brand",
        model: "Test Model",
    },
    {
        id: "2",
        title: "Related Product 2",
        condition: "new" as const,
        sales: 200,
        rating: { average: 4.3, totalReviews: 30 },
        price: { amount: 200000, currency: "ARS", decimals: 2 },
        freeShipping: true,
        fullShipping: true,
        seller: { id: "2", name: "Test Seller 2", reputation: 4.6, sales: 200, location: "Córdoba" },
        returns: "Free returns",
        guarantees: [],
        images: ["/images/related2.jpg"],
        description: "Test description 2",
        keyFeatures: [],
        specifications: {},
        variants: {},
        breadcrumbs: [],
        paymentMethods: [],
        relatedProducts: [],
        stock: 5,
        shipping: { free: true, estimatedDays: "1-2 días" },
        category: "Test Category 2",
        brand: "Test Brand 2",
        model: "Test Model 2",
    },
];

describe("ProductMainContent", () => {
    it("should render main content", () => {
        render(<ProductMainContent relatedProducts={mockRelatedProducts} isLoadingRelated={false} />);

        expect(screen.getByText("Características del producto")).toBeInTheDocument();
        expect(screen.getByText("Descripción")).toBeInTheDocument();
    });

    it("should render with related products", () => {
        render(<ProductMainContent relatedProducts={mockRelatedProducts} isLoadingRelated={false} />);

        expect(screen.getByText("Características del producto")).toBeInTheDocument();
        expect(screen.getByText("Related Product 1")).toBeInTheDocument();
    });

    it("should render with empty related products", () => {
        render(<ProductMainContent relatedProducts={[]} isLoadingRelated={false} />);

        expect(screen.getByText("Características del producto")).toBeInTheDocument();
        expect(screen.queryByText("Related Product 1")).not.toBeInTheDocument();
    });

    it("should render while loading related products", () => {
        render(<ProductMainContent relatedProducts={[]} isLoadingRelated={true} />);

        expect(screen.getByText("Características del producto")).toBeInTheDocument();
        expect(screen.queryByText("Related Product 1")).not.toBeInTheDocument();
    });

    it("should have proper container structure", () => {
        render(<ProductMainContent relatedProducts={mockRelatedProducts} isLoadingRelated={false} />);

        expect(screen.getByText("Características del producto")).toBeInTheDocument();
        expect(screen.getByText("Descripción")).toBeInTheDocument();
    });

    it("should handle undefined related products", () => {
        render(<ProductMainContent relatedProducts={undefined} isLoadingRelated={false} />);

        expect(screen.getByText("Características del producto")).toBeInTheDocument();
        expect(screen.queryByText("Related Product 1")).not.toBeInTheDocument();
    });

    it("should render all main sections", () => {
        render(<ProductMainContent relatedProducts={mockRelatedProducts} isLoadingRelated={false} />);

        expect(screen.getByText("Características del producto")).toBeInTheDocument();
        expect(screen.getByText("Descripción")).toBeInTheDocument();
        expect(screen.getByText("Related Product 1")).toBeInTheDocument();
    });

    it("should render expand button initially", () => {
        render(<ProductMainContent relatedProducts={[]} isLoadingRelated={false} />);

        expect(screen.getByText("Ver descripción completa")).toBeInTheDocument();
    });

    it("should expand description when button is clicked", () => {
        render(<ProductMainContent relatedProducts={[]} isLoadingRelated={false} />);

        const expandButton = screen.getByText("Ver descripción completa");
        fireEvent.click(expandButton);

        expect(screen.getByText("Ver menos")).toBeInTheDocument();
        expect(screen.queryByText("Ver descripción completa")).not.toBeInTheDocument();
    });

    it("should collapse description when 'Ver menos' is clicked", () => {
        render(<ProductMainContent relatedProducts={[]} isLoadingRelated={false} />);

        // First expand
        const expandButton = screen.getByText("Ver descripción completa");
        fireEvent.click(expandButton);

        // Then collapse
        const collapseButton = screen.getByText("Ver menos");
        fireEvent.click(collapseButton);

        expect(screen.getByText("Ver descripción completa")).toBeInTheDocument();
        expect(screen.queryByText("Ver menos")).not.toBeInTheDocument();
    });

    it("should have description content visible", () => {
        render(<ProductMainContent relatedProducts={[]} isLoadingRelated={false} />);

        expect(screen.getByText(/Dale a tu estilo una ventaja con el Galaxy A26 5G/)).toBeInTheDocument();
    });
});
