import { render, screen } from "@testing-library/react";
import ProductPrice from "../ProductPrice";
import { Product } from "@/types/product";

const mockProduct: Product = {
    id: "1",
    title: "Test Product",
    description: "Test Description",
    price: {
        amount: 299999,
        currency: "ARS",
        originalPrice: 349999,
        discount: 14,
    },
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
};

describe("ProductPrice", () => {
    it("should render current price", () => {
        render(<ProductPrice product={mockProduct} />);

        expect(screen.getByText("$ 299.999")).toBeInTheDocument();
    });

    it("should render original price when available", () => {
        render(<ProductPrice product={mockProduct} />);

        expect(screen.getByText("$ 349.999")).toBeInTheDocument();
    });

    it("should render discount percentage when available", () => {
        render(<ProductPrice product={mockProduct} />);

        expect(screen.getByText("14% OFF")).toBeInTheDocument();
    });

    it("should render installment information when original price is available", () => {
        render(<ProductPrice product={mockProduct} />);

        expect(screen.getByText(/En 12 cuotas sin interés de/)).toBeInTheDocument();
    });

    it("should not render original price when not available", () => {
        const productWithoutOriginalPrice = {
            ...mockProduct,
            price: { amount: 299999, currency: "ARS" },
        };

        render(<ProductPrice product={productWithoutOriginalPrice} />);

        expect(screen.queryByText("$349.999")).not.toBeInTheDocument();
        expect(screen.queryByText("14% OFF")).not.toBeInTheDocument();
    });

    it("should not render installment information when original price is not available", () => {
        const productWithoutOriginalPrice = {
            ...mockProduct,
            price: { amount: 299999, currency: "ARS" },
        };

        render(<ProductPrice product={productWithoutOriginalPrice} />);

        expect(screen.queryByText(/En 12 cuotas sin interés de/)).not.toBeInTheDocument();
    });
});
