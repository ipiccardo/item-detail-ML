import { render, screen, fireEvent } from "@testing-library/react";
import { FooterToggleButton } from "../../../src/components/ui/FooterToggleButton";

describe("FooterToggleButton", () => {
    const mockOnToggle = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render button with correct text", () => {
        render(<FooterToggleButton isOpen={false} onToggle={mockOnToggle} />);

        expect(screen.getByText("Más información")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should call onToggle when clicked", () => {
        render(<FooterToggleButton isOpen={false} onToggle={mockOnToggle} />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it("should show correct aria-expanded when closed", () => {
        render(<FooterToggleButton isOpen={false} onToggle={mockOnToggle} />);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-expanded", "false");
        expect(button).toHaveAttribute("aria-label", "Abrir información del footer");
    });

    it("should show correct aria-expanded when open", () => {
        render(<FooterToggleButton isOpen={true} onToggle={mockOnToggle} />);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-expanded", "true");
        expect(button).toHaveAttribute("aria-label", "Cerrar información del footer");
    });

    it("should rotate icon when open", () => {
        render(<FooterToggleButton isOpen={true} onToggle={mockOnToggle} />);

        const icon = screen.getByRole("button").querySelector("svg");
        expect(icon).toHaveClass("rotate-180");
    });

    it("should not rotate icon when closed", () => {
        render(<FooterToggleButton isOpen={false} onToggle={mockOnToggle} />);

        const icon = screen.getByRole("button").querySelector("svg");
        expect(icon).not.toHaveClass("rotate-180");
    });

    it("should apply custom className", () => {
        render(<FooterToggleButton isOpen={false} onToggle={mockOnToggle} className="custom-class" />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("custom-class");
    });

    it("should have hover styles", () => {
        render(<FooterToggleButton isOpen={false} onToggle={mockOnToggle} />);

        const button = screen.getByRole("button");
        expect(button).toHaveClass("hover:bg-gray-200");
        expect(button).toHaveClass("transition-colors");
    });
});
