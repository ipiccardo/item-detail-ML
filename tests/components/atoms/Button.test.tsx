import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../src/components/atoms/Button";

describe("Button", () => {
    it("should render with default props", () => {
        render(<Button>Click me</Button>);
        
        const button = screen.getByRole("button", { name: "Click me" });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("bg-blue-600", "text-white", "hover:bg-blue-700");
    });

    it("should render with primary variant", () => {
        render(<Button variant="primary">Primary Button</Button>);
        
        const button = screen.getByRole("button", { name: "Primary Button" });
        expect(button).toHaveClass("bg-blue-600", "text-white", "hover:bg-blue-700");
    });

    it("should render with secondary variant", () => {
        render(<Button variant="secondary">Secondary Button</Button>);
        
        const button = screen.getByRole("button", { name: "Secondary Button" });
        expect(button).toHaveClass("bg-blue-100", "text-blue-600", "hover:bg-blue-200");
    });

    it("should render with outline variant", () => {
        render(<Button variant="outline">Outline Button</Button>);
        
        const button = screen.getByRole("button", { name: "Outline Button" });
        expect(button).toHaveClass("bg-white", "border", "border-gray-300", "text-gray-700", "hover:bg-gray-50");
    });

    it("should render with small size", () => {
        render(<Button size="sm">Small Button</Button>);
        
        const button = screen.getByRole("button", { name: "Small Button" });
        expect(button).toHaveClass("text-xs", "py-1.5", "px-3");
    });

    it("should render with medium size", () => {
        render(<Button size="md">Medium Button</Button>);
        
        const button = screen.getByRole("button", { name: "Medium Button" });
        expect(button).toHaveClass("text-sm", "py-2.5", "px-4");
    });

    it("should render with large size", () => {
        render(<Button size="lg">Large Button</Button>);
        
        const button = screen.getByRole("button", { name: "Large Button" });
        expect(button).toHaveClass("text-base", "py-3", "px-6");
    });

    it("should apply custom className", () => {
        render(<Button className="custom-class">Custom Button</Button>);
        
        const button = screen.getByRole("button", { name: "Custom Button" });
        expect(button).toHaveClass("custom-class");
    });

    it("should handle click events", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Clickable Button</Button>);
        
        const button = screen.getByRole("button", { name: "Clickable Button" });
        fireEvent.click(button);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should be disabled when disabled prop is true", () => {
        render(<Button disabled>Disabled Button</Button>);
        
        const button = screen.getByRole("button", { name: "Disabled Button" });
        expect(button).toBeDisabled();
    });

    it("should have proper focus styles", () => {
        render(<Button>Focusable Button</Button>);
        
        const button = screen.getByRole("button", { name: "Focusable Button" });
        expect(button).toHaveClass("focus:outline-none", "focus:ring-2", "focus:ring-blue-500");
    });

    it("should render with all base styles", () => {
        render(<Button>Base Styles Button</Button>);
        
        const button = screen.getByRole("button", { name: "Base Styles Button" });
        expect(button).toHaveClass("font-medium", "rounded-md", "transition-colors");
    });
});
