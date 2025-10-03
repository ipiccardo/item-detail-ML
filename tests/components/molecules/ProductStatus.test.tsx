import { render, screen } from "@testing-library/react";
import ProductStatus from "../../../src/components/molecules/ProductStatus";

// Mock the formatNumber utility
jest.mock("../../../src/lib/utils", () => ({
    formatNumber: (num: number) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    },
}));

describe("ProductStatus", () => {
    it("should render new condition with sales", () => {
        render(<ProductStatus condition="new" salesCount={1500} />);

        expect(screen.getByText("Nuevo")).toBeInTheDocument();
        expect(screen.getByText("+1.5K vendidos")).toBeInTheDocument();
    });

    it("should render used condition with sales", () => {
        render(<ProductStatus condition="used" salesCount={500} />);

        expect(screen.getByText("Usado")).toBeInTheDocument();
        expect(screen.getByText("+500 vendidos")).toBeInTheDocument();
    });

    it("should render with zero sales", () => {
        render(<ProductStatus condition="new" salesCount={0} />);

        expect(screen.getByText("Nuevo")).toBeInTheDocument();
        expect(screen.queryByText("+0 vendidos")).not.toBeInTheDocument();
    });

    it("should render with large sales numbers", () => {
        render(<ProductStatus condition="new" salesCount={1500000} />);

        expect(screen.getByText("Nuevo")).toBeInTheDocument();
        expect(screen.getByText("+1.5M vendidos")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
        render(<ProductStatus condition="new" salesCount={1000} className="custom-class" />);

        const container = screen.getByText("Nuevo").closest("div");
        expect(container).toHaveClass("custom-class");
    });

    it("should have proper container structure", () => {
        render(<ProductStatus condition="new" salesCount={1000} />);

        const container = screen.getByText("Nuevo").closest("div");
        expect(container).toHaveClass("flex", "items-center", "gap-1.5", "text-xs", "text-gray-600");
    });

    it("should render separator between condition and sales", () => {
        render(<ProductStatus condition="new" salesCount={1000} />);

        expect(screen.getByText("|")).toBeInTheDocument();
    });

    it("should render with empty className", () => {
        render(<ProductStatus condition="new" salesCount={1000} className="" />);

        const container = screen.getByText("Nuevo").closest("div");
        expect(container).toHaveClass("flex", "items-center", "gap-1.5", "text-xs", "text-gray-600");
    });

    it("should render with undefined className", () => {
        render(<ProductStatus condition="new" salesCount={1000} className={undefined} />);

        const container = screen.getByText("Nuevo").closest("div");
        expect(container).toHaveClass("flex", "items-center", "gap-1.5", "text-xs", "text-gray-600");
    });

    it("should handle very large sales numbers", () => {
        render(<ProductStatus condition="new" salesCount={2500000} />);

        expect(screen.getByText("Nuevo")).toBeInTheDocument();
        expect(screen.getByText("+2.5M vendidos")).toBeInTheDocument();
    });

    it("should handle medium sales numbers", () => {
        render(<ProductStatus condition="used" salesCount={2500} />);

        expect(screen.getByText("Usado")).toBeInTheDocument();
        expect(screen.getByText("+2.5K vendidos")).toBeInTheDocument();
    });

    it("should render condition text correctly", () => {
        render(<ProductStatus condition="new" salesCount={100} />);

        const conditionText = screen.getByText("Nuevo");
        expect(conditionText).toBeInTheDocument();
    });

    it("should render sales text with proper formatting", () => {
        render(<ProductStatus condition="new" salesCount={1234} />);

        const salesText = screen.getByText("+1.2K vendidos");
        expect(salesText).toBeInTheDocument();
    });

    it("should render all elements in correct order", () => {
        render(<ProductStatus condition="new" salesCount={1000} />);

        expect(screen.getByText("Nuevo")).toBeInTheDocument();
        expect(screen.getByText("|")).toBeInTheDocument();
        expect(screen.getByText("+1.0K vendidos")).toBeInTheDocument();
    });
});
