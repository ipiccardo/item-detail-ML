import { render, screen } from "@testing-library/react";
import PriceDisplay from "../../../src/components/molecules/PriceDisplay";

// Mock the formatPrice utility
jest.mock("../../../src/lib/utils", () => ({
    formatPrice: (amount: number) => `$${amount.toLocaleString('es-AR')}`,
}));

describe("PriceDisplay", () => {
    it("should render basic price", () => {
        render(<PriceDisplay amount={1200000} />);

        expect(screen.getByText("$1.200.000")).toBeInTheDocument();
    });

    it("should render price with original price", () => {
        render(<PriceDisplay amount={1200000} originalPrice={1500000} />);

        expect(screen.getByText("$1.200.000")).toBeInTheDocument();
        expect(screen.getByText("$1.500.000")).toBeInTheDocument();
    });

    it("should render price with discount", () => {
        render(<PriceDisplay amount={1200000} discount={20} />);

        expect(screen.getByText("$1.200.000")).toBeInTheDocument();
        expect(screen.getByText("20% OFF")).toBeInTheDocument();
    });

    it("should render price with all props", () => {
        render(<PriceDisplay amount={1200000} originalPrice={1500000} discount={20} />);

        expect(screen.getByText("$1.200.000")).toBeInTheDocument();
        expect(screen.getByText("$1.500.000")).toBeInTheDocument();
        expect(screen.getByText("20% OFF")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
        render(<PriceDisplay amount={1200000} className="custom-class" />);

        const container = screen.getByText("$1.200.000").closest("div").parentElement;
        expect(container).toHaveClass("custom-class");
    });

    it("should render original price with proper styling", () => {
        render(<PriceDisplay amount={1200000} originalPrice={1500000} />);

        const originalPrice = screen.getByText("$1.500.000");
        expect(originalPrice).toHaveClass("text-sm", "lg:text-base", "ml-text-secondary", "line-through");
    });

    it("should render main price with proper styling", () => {
        render(<PriceDisplay amount={1200000} />);

        const mainPrice = screen.getByText("$1.200.000");
        expect(mainPrice).toHaveClass("text-xl", "lg:text-[32px]", "font-light", "ml-text-primary", "leading-none");
    });

    it("should render discount with proper styling", () => {
        render(<PriceDisplay amount={1200000} discount={15} />);

        const discount = screen.getByText("15% OFF");
        expect(discount).toHaveClass("text-[13px]", "font-semibold", "ml-ui-pdp-color--GREEN");
    });

    it("should render price container with proper styling", () => {
        render(<PriceDisplay amount={1200000} discount={10} />);

        const priceContainer = screen.getByText("$1.200.000").closest("div");
        expect(priceContainer).toHaveClass("flex", "items-center", "gap-2", "flex-wrap");
    });

    it("should handle zero discount", () => {
        render(<PriceDisplay amount={1200000} discount={0} />);

        expect(screen.getByText("$1.200.000")).toBeInTheDocument();
        expect(screen.queryByText("0% OFF")).not.toBeInTheDocument();
    });

    it("should handle negative discount", () => {
        render(<PriceDisplay amount={1200000} discount={-5} />);

        expect(screen.getByText("$1.200.000")).toBeInTheDocument();
        expect(screen.queryByText(/-5% OFF/)).not.toBeInTheDocument();
    });

    it("should handle zero amount", () => {
        render(<PriceDisplay amount={0} />);

        expect(screen.getByText("$0")).toBeInTheDocument();
    });

    it("should handle decimal amounts", () => {
        render(<PriceDisplay amount={1234.56} />);

        expect(screen.getByText("$1.234,56")).toBeInTheDocument();
    });

    it("should render original price container with proper styling", () => {
        render(<PriceDisplay amount={1200000} originalPrice={1500000} />);

        const originalPriceContainer = screen.getByText("$1.500.000").closest("div");
        expect(originalPriceContainer).toHaveClass("mb-1");
    });

    it("should not render original price when not provided", () => {
        render(<PriceDisplay amount={1200000} />);

        expect(screen.getByText("$1.200.000")).toBeInTheDocument();
        expect(screen.queryByText(/\$1.500.000/)).not.toBeInTheDocument();
    });

    it("should not render discount when not provided", () => {
        render(<PriceDisplay amount={1200000} />);

        expect(screen.getByText("$1.200.000")).toBeInTheDocument();
        expect(screen.queryByText(/% OFF/)).not.toBeInTheDocument();
    });
});
