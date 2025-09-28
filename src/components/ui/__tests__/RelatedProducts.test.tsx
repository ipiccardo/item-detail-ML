import { render, screen } from "@testing-library/react";
import { RelatedProducts } from "../RelatedProducts";
import { Product } from "@/types/product";
import { JSX } from "react";

// Mock next/link
jest.mock("next/link", () => {
    return function MockLink({ children, href }: { children: React.ReactNode; href: string }): JSX.Element {
        return <a href={href}>{children}</a>;
    };
});

// Mock next/image
jest.mock("next/image", () => {
    return function MockImage({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }): JSX.Element {
        return <img src={src} alt={alt} {...props} />;
    };
});

const mockProducts: Product[] = [
    {
        id: "1",
        title: "Samsung Galaxy M55 5G 8/256gb Dual Sim 128gb Azul",
        description: "Test Description 1",
        price: { amount: 421000, currency: "ARS", originalPrice: 479000, discount: 12 },
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
        category: "Test Category",
        brand: "Test Brand",
        model: "Test Model",
    },
    {
        id: "2",
        title: "Motorola Edge 50 Fusion 5G 8/256gb Dual Sim 256gb Negro",
        description: "Test Description 2",
        price: { amount: 419000, currency: "ARS" },
        images: ["image2.jpg"],
        seller: {
            id: "2",
            name: "Test Seller 2",
            reputation: 4.3,
            sales: 200,
            location: "Test Location 2",
        },
        condition: "new",
        stock: 5,
        shipping: { free: true, estimatedDays: "2-3 días" },
        paymentMethods: ["Credit Card"],
        rating: { average: 4.3, totalReviews: 50 },
        specifications: {},
        category: "Test Category",
        brand: "Test Brand 2",
        model: "Test Model 2",
    },
];

describe("RelatedProducts", () => {
    it("should render related products", () => {
        render(<RelatedProducts products={mockProducts} />);

        expect(screen.getByText("Productos relacionados")).toBeInTheDocument();
        expect(screen.getByText("Samsung Galaxy M55 5G 8/256gb Dual Sim 128gb Azul")).toBeInTheDocument();
        expect(screen.getByText("Motorola Edge 50 Fusion 5G 8/256gb Dual Sim 256gb Negro")).toBeInTheDocument();
    });

    it("should not render if products array is empty", () => {
        const { container } = render(<RelatedProducts products={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("should not render if products is undefined", () => {
        const { container } = render(<RelatedProducts products={undefined as unknown as Product[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("should render custom title", () => {
        render(<RelatedProducts products={mockProducts} title="Custom Title" />);

        expect(screen.getByText("Custom Title")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
        const { container } = render(
            <RelatedProducts products={mockProducts} className="custom-class" />,
        );

        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render product prices", () => {
        render(<RelatedProducts products={mockProducts} />);

        expect(screen.getByText("$ 421.000")).toBeInTheDocument();
        expect(screen.getByText("$ 419.000")).toBeInTheDocument();
    });

    it("should render discount information", () => {
        render(<RelatedProducts products={mockProducts} />);

        expect(screen.getByText("12% OFF")).toBeInTheDocument();
    });

    it("should render free shipping text", () => {
        render(<RelatedProducts products={mockProducts} />);

        const freeShippingTexts = screen.getAllByText("Envío gratis");
        expect(freeShippingTexts).toHaveLength(2);
    });

    it("should render product links", () => {
        render(<RelatedProducts products={mockProducts} />);

        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute("href", "/product/1");
        expect(links[1]).toHaveAttribute("href", "/product/2");
    });

    it("should render product images", () => {
        render(<RelatedProducts products={mockProducts} />);

        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute("src", "image1.jpg");
        expect(images[1]).toHaveAttribute("src", "image2.jpg");
    });
});
