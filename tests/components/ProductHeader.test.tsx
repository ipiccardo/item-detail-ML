/* eslint-disable max-len */
import { render, screen } from "@testing-library/react";
import { ProductHeader } from "../../src/components/ui/ProductHeader";

const mockRating = {
    average: 4.5,
    totalReviews: 150,
};

describe("ProductHeader", () => {
    it("should render product title", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={1000} />);

        expect(screen.getAllByText("Test Product")).toHaveLength(2); // Mobile and desktop versions
    });

    it("should render rating information", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={1000} />);

        expect(screen.getAllByText("4.5")).toHaveLength(2); // Mobile and desktop versions
        expect(screen.getAllByText("(150)")).toHaveLength(2); // Mobile and desktop versions
    });

    it("should render sales information", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={1000} />);

        expect(screen.getAllByText("+1.000 vendidos")).toHaveLength(2); // Mobile and desktop versions
    });

    it("should have proper container structure", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={1000} />);

        const containers = screen.getAllByText("Test Product");
        expect(containers[0]).toBeInTheDocument();
        expect(containers[1]).toBeInTheDocument();
    });

    it("should render title with proper styling", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={1000} />);

        const titles = screen.getAllByText("Test Product");
        expect(titles[0]).toHaveClass("lg:hidden", "text-sm", "font-normal", "ml-text-primary", "leading-tight", "mb-2");
        expect(titles[1]).toHaveClass("hidden", "lg:block", "text-xl", "font-semibold", "ml-text-primary", "leading-snug");
    });

    it("should render rating with proper styling", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={1000} />);

        const ratingElements = screen.getAllByText("4.5");
        expect(ratingElements[0]).toHaveClass("text-sm", "font-semibold", "ml-text-primary");
        expect(ratingElements[1]).toHaveClass("text-sm", "ml-text-primary");
    });

    it("should render sales with proper styling", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={1000} />);

        const salesElements = screen.getAllByText("+1.000 vendidos");
        // Both mobile and desktop versions should be present
        expect(salesElements).toHaveLength(2);
        expect(salesElements[0]).toBeInTheDocument();
        expect(salesElements[1]).toBeInTheDocument();
    });

    it("should handle zero sales", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={0} />);

        expect(screen.getAllByText("+0 vendidos")).toHaveLength(2); // Mobile and desktop versions
    });

    it("should handle zero rating", () => {
        const zeroRating = { average: 0, totalReviews: 0 };
        render(<ProductHeader title="Test Product" rating={zeroRating} sales={1000} />);

        expect(screen.getAllByText("0")).toHaveLength(2); // Mobile and desktop versions
        expect(screen.getAllByText("(0)")).toHaveLength(2); // Mobile and desktop versions
    });

    it("should handle long product title", () => {
        const longTitle = "This is a very long product title that should be handled properly by the component";
        render(<ProductHeader title={longTitle} rating={mockRating} sales={1000} />);

        expect(screen.getAllByText(longTitle)).toHaveLength(2); // Mobile and desktop versions
    });

    it("should render all elements in correct order", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={1000} />);

        // Check that all main elements are present
        expect(screen.getAllByText("Test Product")).toHaveLength(2);
        expect(screen.getAllByText("4.5")).toHaveLength(2);
        expect(screen.getAllByText("(150)")).toHaveLength(2);
        expect(screen.getAllByText("+1.000 vendidos")).toHaveLength(2);
    });

    it("should handle high sales numbers", () => {
        render(<ProductHeader title="Test Product" rating={mockRating} sales={999999} />);

        expect(screen.getAllByText("+999.999 vendidos")).toHaveLength(2); // Mobile and desktop versions
    });

    it("should handle high rating", () => {
        const highRating = { average: 5.0, totalReviews: 9999 };
        render(<ProductHeader title="Test Product" rating={highRating} sales={1000} />);

        expect(screen.getAllByText("5")).toHaveLength(2); // Mobile and desktop versions
        expect(screen.getAllByText("(9.999)")).toHaveLength(2); // Mobile and desktop versions
    });
});
