/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, screen, fireEvent } from "@testing-library/react";
import { RelatedProducts } from "@/components/ui/RelatedProducts";
import { Product } from "@/types/product";

// Mock Next.js Image component
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: { src: string; alt: string; width: number; height: number; className: string }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={props.src} alt={props.alt} className={props.className} />;
    },
}));

describe("RelatedProducts", () => {
    const mockProducts: Product[] = [
        {
            id: "1",
            title: "Samsung Galaxy S23",
            description: "Smartphone Samsung",
            price: {
                amount: 899999,
                currency: "ARS",
                originalPrice: 999999,
                discount: 10,
            },
            images: ["/samsung.jpg"],
            rating: { average: 4.5, totalReviews: 100 },
            seller: {
                id: "seller1",
                name: "Samsung Store",
                reputation: 100,
                sales: 5000,
                location: "Capital Federal",
            },
            condition: "new",
            stock: 50,
            shipping: {
                free: true,
                estimatedDays: "2-3",
            },
            paymentMethods: ["credit_card", "debit_card"],
            variants: {},
            brand: "Samsung",
            category: "Celulares",
            model: "S23",
            specifications: {},
        },
        {
            id: "2",
            title: "iPhone 14 Pro",
            description: "Apple iPhone",
            price: {
                amount: 1299999,
                currency: "ARS",
                originalPrice: 1499999,
                discount: 13,
            },
            images: ["/iphone.jpg"],
            rating: { average: 4.8, totalReviews: 200 },
            seller: {
                id: "seller2",
                name: "Apple Store",
                reputation: 100,
                sales: 10000,
                location: "Capital Federal",
            },
            condition: "new",
            stock: 30,
            shipping: {
                free: true,
                estimatedDays: "1-2",
            },
            paymentMethods: ["credit_card"],
            variants: {},
            brand: "Apple",
            category: "Celulares",
            model: "14 Pro",
            specifications: {},
        },
        {
            id: "3",
            title: "Xiaomi Redmi Note 12",
            description: "Smartphone Xiaomi",
            price: {
                amount: 399999,
                currency: "ARS",
            },
            images: ["/xiaomi.jpg"],
            rating: { average: 4.2, totalReviews: 150 },
            seller: {
                id: "seller3",
                name: "Xiaomi Official",
                reputation: 95,
                sales: 3000,
                location: "Buenos Aires",
            },
            condition: "new",
            stock: 100,
            shipping: {
                free: true,
                estimatedDays: "3-4",
            },
            paymentMethods: ["credit_card", "debit_card"],
            variants: {},
            brand: "Xiaomi",
            category: "Celulares",
            model: "Redmi Note 12",
            specifications: {},
        },
        {
            id: "4",
            title: "Motorola Edge 40",
            description: "Motorola smartphone",
            price: {
                amount: 599999,
                currency: "ARS",
                originalPrice: 699999,
                discount: 14,
            },
            images: ["/motorola.jpg"],
            rating: { average: 4.3, totalReviews: 80 },
            seller: {
                id: "seller4",
                name: "Motorola Store",
                reputation: 98,
                sales: 2000,
                location: "CABA",
            },
            condition: "new",
            stock: 40,
            shipping: {
                free: true,
                estimatedDays: "2-3",
            },
            paymentMethods: ["credit_card", "debit_card"],
            variants: {},
            brand: "Motorola",
            category: "Celulares",
            model: "Edge 40",
            specifications: {},
        },
    ];

    describe("Rendering", () => {
        it("should render nothing when products array is empty", () => {
            const { container } = render(<RelatedProducts products={[]} />);
            expect(container.firstChild).toBeNull();
        });

        it("should render with default title", () => {
            render(<RelatedProducts products={mockProducts} />);
            expect(screen.getByText("Quienes vieron este producto también compraron")).toBeInTheDocument();
        });

        it("should render with custom title", () => {
            render(<RelatedProducts products={mockProducts} title="Productos relacionados" />);
            expect(screen.getByText("Productos relacionados")).toBeInTheDocument();
        });

        it("should render all products", () => {
            render(<RelatedProducts products={mockProducts} />);
            expect(screen.getByText("Samsung Galaxy S23")).toBeInTheDocument();
            expect(screen.getByText("iPhone 14 Pro")).toBeInTheDocument();
            expect(screen.getByText("Xiaomi Redmi Note 12")).toBeInTheDocument();
            expect(screen.getByText("Motorola Edge 40")).toBeInTheDocument();
        });
    });

    describe("Images", () => {
        it("should use public images cyclically", () => {
            render(<RelatedProducts products={mockProducts} />);

            const images = screen.getAllByRole("img");

            // Verificar que se usan las imágenes de public/
            expect(images[0]).toHaveAttribute("src", "/1.webp");
            expect(images[1]).toHaveAttribute("src", "/2.webp");
            expect(images[2]).toHaveAttribute("src", "/3.png");
            expect(images[3]).toHaveAttribute("src", "/5.jpeg");
        });

        it("should cycle images when there are more products than images", () => {
            // Crear productos con IDs únicos
            const manyProducts = [
                ...mockProducts,
                ...mockProducts.map((p, i) => ({ ...p, id: `${p.id}-copy-${i}` })),
            ];
            render(<RelatedProducts products={manyProducts} />);

            const images = screen.getAllByRole("img");

            // El 5to producto debería usar la 5ta imagen
            expect(images[4]).toHaveAttribute("src", "/m55.png");
            expect(images[5]).toHaveAttribute("src", "/Edge50.webp");
        });
    });

    describe("Product Information", () => {
        it("should display product prices", () => {
            render(<RelatedProducts products={mockProducts} />);
            expect(screen.getByText("$ 899.999")).toBeInTheDocument();
            expect(screen.getByText("$ 1.299.999")).toBeInTheDocument();
        });

        it("should display discount badges when applicable", () => {
            render(<RelatedProducts products={mockProducts} />);
            expect(screen.getByText("10% OFF")).toBeInTheDocument();
            expect(screen.getByText("13% OFF")).toBeInTheDocument();
            expect(screen.getByText("14% OFF")).toBeInTheDocument();
        });

        it("should display original prices when available", () => {
            render(<RelatedProducts products={mockProducts} />);
            expect(screen.getByText("$ 999.999")).toBeInTheDocument();
            expect(screen.getByText("$ 1.499.999")).toBeInTheDocument();
        });

        it("should display free shipping for all products", () => {
            render(<RelatedProducts products={mockProducts} />);
            const freeShippingTexts = screen.getAllByText("Envío gratis");
            expect(freeShippingTexts).toHaveLength(mockProducts.length);
        });
    });

    describe("Click Behavior", () => {
        it("should not navigate when clicking on products", () => {
            render(<RelatedProducts products={mockProducts} />);

            const productCards = screen.getAllByText("Samsung Galaxy S23")[0].closest("div.group");
            expect(productCards).toBeInTheDocument();

            // Verificar que es un div y no un Link
            expect(productCards?.tagName).toBe("DIV");
        });

        it("should handle click events", () => {
            render(<RelatedProducts products={mockProducts} />);

            const productCard = screen.getByText("Samsung Galaxy S23").closest("div.group");

            // Simular click
            if (productCard) {
                fireEvent.click(productCard);
            }

            // No debería lanzar error y el componente debería seguir renderizado
            expect(screen.getByText("Samsung Galaxy S23")).toBeInTheDocument();
        });

        it("should have cursor-pointer class", () => {
            render(<RelatedProducts products={mockProducts} />);

            const productCard = screen.getByText("Samsung Galaxy S23").closest("div.group");
            expect(productCard).toHaveClass("cursor-pointer");
        });
    });

    describe("Styling", () => {
        it("should apply custom className", () => {
            const { container } = render(
                <RelatedProducts products={mockProducts} className="custom-class" />,
            );
            const mainContainer = container.firstChild as HTMLElement;
            expect(mainContainer).toHaveClass("custom-class");
        });

        it("should have ml-card class on main container", () => {
            const { container } = render(<RelatedProducts products={mockProducts} />);
            const mainContainer = container.firstChild as HTMLElement;
            expect(mainContainer).toHaveClass("ml-card");
        });

        it("should have ml-card class on product cards", () => {
            render(<RelatedProducts products={mockProducts} />);
            const productCard = screen.getByText("Samsung Galaxy S23").closest("div.group");
            expect(productCard).toHaveClass("ml-card", "rounded-lg");
        });

        it("should have grid layout", () => {
            render(<RelatedProducts products={mockProducts} />);
            const grid = screen.getByText("Samsung Galaxy S23").closest("div.grid");
            expect(grid).toHaveClass("grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3");
        });

        it("should have hover effects on cards", () => {
            render(<RelatedProducts products={mockProducts} />);
            const productCard = screen.getByText("Samsung Galaxy S23").closest("div.group");
            expect(productCard).toHaveClass("hover:shadow-lg", "transition-all");
        });

        it("should have hover effect on title", () => {
            render(<RelatedProducts products={mockProducts} />);
            const title = screen.getByText("Samsung Galaxy S23");
            expect(title).toHaveClass("group-hover:text-blue-600", "transition-colors");
        });
    });

    describe("Edge Cases", () => {
        it("should handle products without discount", () => {
            const productsWithoutDiscount = mockProducts.filter(p => !p.price.discount);
            render(<RelatedProducts products={productsWithoutDiscount} />);

            // No debería mostrar badges OFF
            expect(screen.queryByText(/% OFF/)).not.toBeInTheDocument();
        });

        it("should handle products without original price", () => {
            const product = mockProducts.find(p => !p.price.originalPrice);
            if (product) {
                render(<RelatedProducts products={[product]} />);
                expect(screen.getByText(product.title)).toBeInTheDocument();
            }
        });
    });
});

