import { render, screen } from "@testing-library/react";
import StockInfo from "../../../src/components/molecules/StockInfo";

describe("StockInfo", () => {
    it("should render with basic props", () => {
        render(<StockInfo quantity={1} stock={10} />);

        expect(screen.getByText("Cantidad: 1")).toBeInTheDocument();
        expect(screen.getByText("(10 disponibles)")).toBeInTheDocument();
    });

    it("should render with different quantities", () => {
        render(<StockInfo quantity={5} stock={20} />);

        expect(screen.getByText("Cantidad: 5")).toBeInTheDocument();
        expect(screen.getByText("(20 disponibles)")).toBeInTheDocument();
    });

    it("should render with zero quantity", () => {
        render(<StockInfo quantity={0} stock={5} />);

        expect(screen.getByText("Cantidad: 0")).toBeInTheDocument();
        expect(screen.getByText("(5 disponibles)")).toBeInTheDocument();
    });

    it("should render with zero stock", () => {
        render(<StockInfo quantity={1} stock={0} />);

        expect(screen.getByText("Cantidad: 1")).toBeInTheDocument();
        expect(screen.getByText("(0 disponibles)")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
        render(<StockInfo quantity={2} stock={15} className="custom-class" />);

        const container = screen.getByText("Stock disponible").closest("div");
        expect(container).toHaveClass("mb-4", "pb-4", "border-b", "border-gray-200", "custom-class");
    });

    it("should have proper container structure", () => {
        render(<StockInfo quantity={3} stock={25} />);

        const container = screen.getByText("Stock disponible").closest("div");
        expect(container).toHaveClass("mb-4", "pb-4", "border-b", "border-gray-200");
    });

    it("should render quantity with proper styling", () => {
        render(<StockInfo quantity={4} stock={30} />);

        const quantity = screen.getByText("Cantidad: 4");
        expect(quantity).toHaveClass("text-sm", "text-gray-600");
    });

    it("should render stock with proper styling", () => {
        render(<StockInfo quantity={1} stock={40} />);

        const stock = screen.getByText("(40 disponibles)");
        expect(stock).toHaveClass("text-xs", "text-gray-500");
    });

    it("should handle large numbers", () => {
        render(<StockInfo quantity={100} stock={1000} />);

        expect(screen.getByText("Cantidad: 100")).toBeInTheDocument();
        expect(screen.getByText("(1000 disponibles)")).toBeInTheDocument();
    });

    it("should handle single item", () => {
        render(<StockInfo quantity={1} stock={1} />);

        expect(screen.getByText("Cantidad: 1")).toBeInTheDocument();
        expect(screen.getByText("(1 disponibles)")).toBeInTheDocument();
    });

    it("should render with empty className", () => {
        render(<StockInfo quantity={2} stock={8} className="" />);

        const container = screen.getByText("Cantidad: 2").closest("div");
        expect(container).toHaveClass("flex", "items-center", "justify-between");
    });

    it("should render with undefined className", () => {
        render(<StockInfo quantity={1} stock={5} className={undefined} />);

        const container = screen.getByText("Cantidad: 1").closest("div");
        expect(container).toHaveClass("flex", "items-center", "justify-between");
    });
});
