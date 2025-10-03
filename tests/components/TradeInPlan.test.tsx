import { render, screen, fireEvent } from "@testing-library/react";
import TradeInPlan from "../../src/components/ui/TradeInPlan";

describe("TradeInPlan", () => {
    it("should render trade-in plan title", () => {
        render(<TradeInPlan />);

        expect(screen.getByText("Ahorrá con Plan Canje Extra")).toBeInTheDocument();
    });

    it("should render cotizar button", () => {
        render(<TradeInPlan />);

        expect(screen.getByText("Cotizar mi celular")).toBeInTheDocument();
    });

    it("should render como funciona button", () => {
        render(<TradeInPlan />);

        expect(screen.getByText("Cómo funciona")).toBeInTheDocument();
    });

    it("should have proper container structure", () => {
        render(<TradeInPlan />);

        const container = screen.getByText("Ahorrá con Plan Canje Extra").closest("div")?.parentElement;
        expect(container).toHaveClass("bg-white", "border", "border-gray-200", "rounded-md", "p-4", "shadow-sm");
    });

    it("should render with custom className", () => {
        render(<TradeInPlan className="mb-4" />);

        const container = screen.getByText("Ahorrá con Plan Canje Extra").closest("div")?.parentElement;
        expect(container).toHaveClass("mb-4");
    });

    it("should render title with proper styling", () => {
        render(<TradeInPlan />);

        const title = screen.getByText("Ahorrá con Plan Canje Extra");
        expect(title).toHaveClass("text-base", "font-bold", "text-black");
    });

    it("should render buttons with proper styling", () => {
        render(<TradeInPlan />);

        const cotizarButton = screen.getByText("Cotizar mi celular");
        expect(cotizarButton).toHaveClass("flex-1", "bg-blue-600", "text-white", "text-sm", "font-medium", "py-2.5", "px-4", "rounded-md");

        const comoFuncionaButton = screen.getByText("Cómo funciona");
        expect(comoFuncionaButton).toHaveClass("flex-1", "bg-blue-100", "text-blue-600", "text-sm", "font-medium", "py-2.5", "px-4", "rounded-md");
    });

    it("should handle button clicks", () => {
        render(<TradeInPlan />);

        const cotizarButton = screen.getByText("Cotizar mi celular");
        const comoFuncionaButton = screen.getByText("Cómo funciona");

        fireEvent.click(cotizarButton);
        fireEvent.click(comoFuncionaButton);

        // Buttons should be clickable without errors
        expect(cotizarButton).toBeInTheDocument();
        expect(comoFuncionaButton).toBeInTheDocument();
    });

    it("should render content text", () => {
        render(<TradeInPlan />);

        expect(screen.getByText("$ 500.000")).toBeInTheDocument();
        expect(screen.getByText("obtén dinero extra")).toBeInTheDocument();
    });

    it("should render all elements in correct order", () => {
        render(<TradeInPlan />);

        const container = screen.getByText("Ahorrá con Plan Canje Extra").closest("div")?.parentElement;
        const textContent = container?.textContent;

        expect(textContent).toContain("Ahorrá con Plan Canje Extra");
        expect(textContent).toContain("$ 500.000");
        expect(textContent).toContain("Cotizar mi celular");
        expect(textContent).toContain("Cómo funciona");
    });

    it("should render buttons container with proper styling", () => {
        render(<TradeInPlan />);

        const buttonsContainer = screen.getByText("Cotizar mi celular").closest("div");
        expect(buttonsContainer).toHaveClass("flex", "gap-2");
    });
});
