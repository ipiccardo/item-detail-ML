import { render, screen } from "@testing-library/react";
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
        seller: { name: "Test Seller", link: "#", rating: 4.8 },
        returns: "Free returns",
        guarantees: [],
        images: ["/images/related1.jpg"],
        description: "Test description",
        keyFeatures: [],
        specifications: [],
        variants: [],
        breadcrumbs: [],
        paymentMethods: [],
        relatedProducts: [],
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
        seller: { name: "Test Seller 2", link: "#", rating: 4.6 },
        returns: "Free returns",
        guarantees: [],
        images: ["/images/related2.jpg"],
        description: "Test description 2",
        keyFeatures: [],
        specifications: [],
        variants: [],
        breadcrumbs: [],
        paymentMethods: [],
        relatedProducts: [],
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
});
