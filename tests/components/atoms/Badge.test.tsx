import { render, screen } from "@testing-library/react";
import Badge from "../../../src/components/atoms/Badge";

describe("Badge", () => {
    it("should render with default props", () => {
        render(<Badge>Default Badge</Badge>);
        
        const badge = screen.getByText("Default Badge");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-blue-100", "text-blue-700");
    });

    it("should render with primary variant", () => {
        render(<Badge variant="primary">Primary Badge</Badge>);
        
        const badge = screen.getByText("Primary Badge");
        expect(badge).toHaveClass("bg-blue-100", "text-blue-700");
    });

    it("should render with warning variant", () => {
        render(<Badge variant="warning">Warning Badge</Badge>);
        
        const badge = screen.getByText("Warning Badge");
        expect(badge).toHaveClass("bg-orange-100", "text-orange-700");
    });

    it("should render with danger variant", () => {
        render(<Badge variant="danger">Danger Badge</Badge>);
        
        const badge = screen.getByText("Danger Badge");
        expect(badge).toHaveClass("bg-red-100", "text-red-700");
    });

    it("should render with info variant", () => {
        render(<Badge variant="info">Info Badge</Badge>);
        
        const badge = screen.getByText("Info Badge");
        expect(badge).toHaveClass("bg-gray-100", "text-gray-700");
    });

    it("should render with small size", () => {
        render(<Badge size="sm">Small Badge</Badge>);
        
        const badge = screen.getByText("Small Badge");
        expect(badge).toHaveClass("text-[10px]", "px-2", "py-0.5");
    });

    it("should render with medium size", () => {
        render(<Badge size="md">Medium Badge</Badge>);
        
        const badge = screen.getByText("Medium Badge");
        expect(badge).toHaveClass("text-xs", "px-3", "py-1");
    });

    it("should apply custom className", () => {
        render(<Badge className="custom-class">Custom Badge</Badge>);
        
        const badge = screen.getByText("Custom Badge");
        expect(badge).toHaveClass("custom-class");
    });

    it("should render with all base styles", () => {
        render(<Badge>Base Styles Badge</Badge>);
        
        const badge = screen.getByText("Base Styles Badge");
        expect(badge).toHaveClass("inline-flex", "items-center", "rounded-full", "font-semibold");
    });

    it("should render children correctly", () => {
        render(<Badge>Test Content</Badge>);
        
        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
});
