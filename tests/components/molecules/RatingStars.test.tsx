import { render, screen } from "@testing-library/react";
import RatingStars from "../../../src/components/molecules/RatingStars";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Star: (props: any) => <svg {...props} data-testid="star-icon" />,
}));

describe("RatingStars", () => {
    it("should render with default props", () => {
        render(<RatingStars rating={4.5} />);

        // With half star, we get 6 SVGs (5 normal + 1 partial)
        expect(screen.getAllByTestId("star-icon")).toHaveLength(6);
    });

    it("should render with total reviews", () => {
        render(<RatingStars rating={4.2} totalReviews={150} />);

        expect(screen.getByText("(150)")).toBeInTheDocument();
    });

    it("should render with small size", () => {
        render(<RatingStars rating={3.8} size="sm" />);

        const stars = screen.getAllByTestId("star-icon");
        stars.forEach(star => {
            expect(star).toHaveClass("w-3", "h-3");
        });
    });

    it("should render with medium size", () => {
        render(<RatingStars rating={4.0} size="md" />);

        const stars = screen.getAllByTestId("star-icon");
        stars.forEach(star => {
            expect(star).toHaveClass("w-4", "h-4");
        });
    });

    it("should render with large size", () => {
        render(<RatingStars rating={4.7} size="lg" />);

        const stars = screen.getAllByTestId("star-icon");
        stars.forEach(star => {
            expect(star).toHaveClass("w-5", "h-5");
        });
    });

    it("should apply custom className", () => {
        render(<RatingStars rating={4.3} className="custom-class" />);

        const container = screen.getAllByTestId("star-icon")[0].closest("div").parentElement.parentElement;
        expect(container).toHaveClass("flex", "items-center", "gap-2", "custom-class");
    });

    it("should render perfect rating", () => {
        render(<RatingStars rating={5.0} />);

        expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
    });

    it("should render zero rating", () => {
        render(<RatingStars rating={0} />);

        expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
    });

    it("should render decimal rating", () => {
        render(<RatingStars rating={3.7} />);

        // With half star, we get 6 SVGs (5 normal + 1 partial)
        expect(screen.getAllByTestId("star-icon")).toHaveLength(6);
    });

    it("should render with proper container structure", () => {
        render(<RatingStars rating={4.1} totalReviews={89} />);

        const starIcon = screen.getAllByTestId("star-icon")[0];
        const container = starIcon?.closest("div")?.parentElement?.parentElement;
        expect(container).not.toBeNull();
        expect(container).toHaveClass("flex", "items-center", "gap-2");
    });

    it("should render stars container with proper classes", () => {
        render(<RatingStars rating={4.5} />);

        const starIcon = screen.getAllByTestId("star-icon")[0];
        const starsContainer = starIcon?.closest("div")?.parentElement;
        expect(starsContainer).not.toBeNull();
        expect(starsContainer).toHaveClass("flex", "items-center", "gap-0.5");
    });

    it("should handle rating above 5", () => {
        render(<RatingStars rating={6.0} />);

        expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
    });

    it("should handle negative rating", () => {
        render(<RatingStars rating={-1.0} />);

        expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
    });

    it("should render without total reviews", () => {
        render(<RatingStars rating={4.2} />);

        expect(screen.getAllByTestId("star-icon")).toHaveLength(6);
        expect(screen.queryByText(/\(/)).not.toBeInTheDocument();
    });

    it("should render with zero total reviews", () => {
        render(<RatingStars rating={4.0} totalReviews={0} />);

        expect(screen.getAllByTestId("star-icon")).toHaveLength(5);
        expect(screen.getByText("(0)")).toBeInTheDocument();
    });
});
