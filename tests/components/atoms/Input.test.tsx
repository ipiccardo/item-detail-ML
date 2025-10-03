import { render, screen, fireEvent } from "@testing-library/react";
import { Search, Eye } from "lucide-react";
import Input from "../../../src/components/atoms/Input";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Search: (props: any) => <svg {...props} data-testid="search-icon" />,
    Eye: (props: any) => <svg {...props} data-testid="eye-icon" />,
}));

describe("Input", () => {
    it("should render with basic props", () => {
        render(<Input id="test-input" placeholder="Enter text" />);
        
        const input = screen.getByPlaceholderText("Enter text");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("id", "test-input");
    });

    it("should render with label", () => {
        render(<Input id="test-input" label="Test Label" />);
        
        const label = screen.getByText("Test Label");
        expect(label).toBeInTheDocument();
        
        const input = screen.getByLabelText("Test Label");
        expect(input).toBeInTheDocument();
    });

    it("should render with left icon", () => {
        render(<Input id="test-input" icon={Search} iconPosition="left" placeholder="Search" />);
        
        const input = screen.getByPlaceholderText("Search");
        expect(input).toHaveClass("pl-10");
        
        expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    });

    it("should render with right icon", () => {
        render(<Input id="test-input" icon={Eye} iconPosition="right" placeholder="Password" />);
        
        const input = screen.getByPlaceholderText("Password");
        expect(input).toHaveClass("pr-10");
        
        expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
    });

    it("should render with default right icon", () => {
        render(<Input id="test-input" icon={Eye} placeholder="Password" />);
        
        const input = screen.getByPlaceholderText("Password");
        expect(input).toHaveClass("pr-10");
        
        expect(screen.getByTestId("eye-icon")).toBeInTheDocument();
    });

    it("should render with error message", () => {
        render(<Input id="test-input" error="This field is required" />);
        
        const errorMessage = screen.getByText("This field is required");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveClass("text-red-600");
        
        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("border-red-500");
    });

    it("should apply custom className", () => {
        render(<Input id="test-input" className="custom-class" />);
        
        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("custom-class");
    });

    it("should apply custom input className", () => {
        render(<Input id="test-input" className="custom-input-class" />);
        
        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("custom-input-class");
    });

    it("should handle input events", () => {
        const handleChange = jest.fn();
        render(<Input id="test-input" onChange={handleChange} />);
        
        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "test value" } });
        
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("should have proper focus styles", () => {
        render(<Input id="test-input" />);
        
        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500");
    });

    it("should have proper base styles", () => {
        render(<Input id="test-input" />);
        
        const input = screen.getByRole("textbox");
        expect(input).toHaveClass("w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "text-sm");
    });

    it("should render with different input types", () => {
        render(<Input id="test-input" type="password" />);
        
        const input = screen.getByDisplayValue("");
        expect(input).toHaveAttribute("type", "password");
    });

    it("should be disabled when disabled prop is true", () => {
        render(<Input id="test-input" disabled />);
        
        const input = screen.getByDisplayValue("");
        expect(input).toBeDisabled();
    });

    it("should have proper error focus styles", () => {
        render(<Input id="test-input" error="Error message" />);
        
        const input = screen.getByDisplayValue("");
        expect(input).toHaveClass("focus:ring-red-500");
    });
});
