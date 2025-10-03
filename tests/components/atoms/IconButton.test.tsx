import { render, screen, fireEvent } from "@testing-library/react";
import { Heart, Share2 } from "lucide-react";
import IconButton from "../../../src/components/atoms/IconButton";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Heart: (props: any) => <svg {...props} data-testid="heart-icon" />,
    Share2: (props: any) => <svg {...props} data-testid="share-icon" />,
}));

describe("IconButton", () => {
    it("should render with default props", () => {
        render(<IconButton icon={Heart} label="Add to favorites" />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-label", "Add to favorites");
        expect(button).toHaveClass("hover:bg-gray-100", "rounded");
    });

    it("should render with circular variant", () => {
        render(<IconButton icon={Heart} label="Circular Button" variant="circular" />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("bg-white", "rounded-full", "shadow-lg", "hover:bg-gray-50", "border", "border-gray-200");
    });

    it("should render with small size", () => {
        render(<IconButton icon={Heart} label="Small Button" size="sm" />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("w-8", "h-8");
    });

    it("should render with medium size", () => {
        render(<IconButton icon={Heart} label="Medium Button" size="md" />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("w-9", "h-9");
    });

    it("should render with large size", () => {
        render(<IconButton icon={Heart} label="Large Button" size="lg" />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("w-10", "h-10");
    });

    it("should apply custom className", () => {
        render(<IconButton icon={Heart} label="Custom Button" className="custom-class" />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("custom-class");
    });

    it("should render icon", () => {
        render(<IconButton icon={Heart} label="Custom Icon" />);

        const button = screen.getByRole("button", { name: "Custom Icon" });
        expect(button).toBeInTheDocument();
        expect(button).toContainHTML("<svg");
    });

    it("should handle click events", () => {
        const handleClick = jest.fn();
        render(<IconButton icon={Heart} label="Clickable Button" onClick={handleClick} />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should be disabled when disabled prop is true", () => {
        render(<IconButton icon={Heart} label="Disabled Button" disabled />);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });

    it("should have proper focus styles", () => {
        render(<IconButton icon={Heart} label="Focusable Button" />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("focus:outline-none");
    });

    it("should render with all base styles", () => {
        render(<IconButton icon={Heart} label="Base Styles Button" />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("flex", "items-center", "justify-center", "transition-colors");
    });

    it("should render different icons", () => {
        render(<IconButton icon={Share2} label="Share Button" />);

        const button = screen.getByRole("button", { name: "Share Button" });
        expect(button).toBeInTheDocument();
        expect(button).toContainHTML("<svg");
    });
});
