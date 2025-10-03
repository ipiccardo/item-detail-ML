import { render, screen } from "@testing-library/react";
import GuaranteesList from "../../../src/components/molecules/GuaranteesList";
import { GuaranteeItem } from "../../../src/lib/guarantees";

// Mock icons
const mockIcon1 = <svg data-testid="icon-1" />;
const mockIcon2 = <svg data-testid="icon-2" />;

describe("GuaranteesList", () => {
    const mockGuarantees: GuaranteeItem[] = [
        {
            icon: mockIcon1,
            text: "Devolución gratis. Tenés 30 días desde que lo recibís.",
        },
        {
            icon: mockIcon2,
            text: "Compra Protegida, recibí el producto que esperabas o te devolvemos tu dinero.",
        },
    ];

    it("should render with guarantees", () => {
        render(<GuaranteesList guarantees={mockGuarantees} />);

        expect(screen.getByText("Devolución gratis. Tenés 30 días desde que lo recibís.")).toBeInTheDocument();
        expect(screen.getByText("Compra Protegida, recibí el producto que esperabas o te devolvemos tu dinero.")).toBeInTheDocument();
        expect(screen.getByTestId("icon-1")).toBeInTheDocument();
        expect(screen.getByTestId("icon-2")).toBeInTheDocument();
    });

    it("should render with single guarantee", () => {
        const singleGuarantee = [mockGuarantees[0]];
        render(<GuaranteesList guarantees={singleGuarantee} />);

        expect(screen.getByText("Devolución gratis. Tenés 30 días desde que lo recibís.")).toBeInTheDocument();
        expect(screen.getByTestId("icon-1")).toBeInTheDocument();
        expect(screen.queryByTestId("icon-2")).not.toBeInTheDocument();
    });

    it("should not render when guarantees array is empty", () => {
        const { container } = render(<GuaranteesList guarantees={[]} />);

        expect(container.firstChild).toBeNull();
    });

    it("should not render when guarantees is null", () => {
        const { container } = render(<GuaranteesList guarantees={null as any} />);

        expect(container.firstChild).toBeNull();
    });

    it("should not render when guarantees is undefined", () => {
        const { container } = render(<GuaranteesList guarantees={undefined as any} />);

        expect(container.firstChild).toBeNull();
    });

    it("should apply custom className", () => {
        render(<GuaranteesList guarantees={mockGuarantees} className="custom-class" />);

        const container = screen.getByTestId("guarantees-container");
        expect(container).toHaveClass("custom-class");
    });

    it("should have proper container structure", () => {
        render(<GuaranteesList guarantees={mockGuarantees} />);

        const container = screen.getByTestId("guarantees-container");
        expect(container).toHaveClass("space-y-2");
    });

    it("should render each guarantee with proper structure", () => {
        render(<GuaranteesList guarantees={mockGuarantees} />);

        const guaranteeItems = screen.getAllByText(/Devolución gratis|Compra Protegida/);
        guaranteeItems.forEach(item => {
            const guaranteeContainer = item.closest("div");
            expect(guaranteeContainer).toHaveClass("flex", "items-center", "gap-2", "text-xs", "text-gray-600");
        });
    });

    it("should render icons with proper structure", () => {
        render(<GuaranteesList guarantees={mockGuarantees} />);

        const icons = screen.getAllByTestId(/icon-/);
        icons.forEach(icon => {
            expect(icon).toBeInTheDocument();
        });
    });

    it("should render with empty className", () => {
        render(<GuaranteesList guarantees={mockGuarantees} className="" />);

        const container = screen.getByTestId("guarantees-container");
        expect(container).toHaveClass("space-y-2");
    });

    it("should render with undefined className", () => {
        render(<GuaranteesList guarantees={mockGuarantees} className={undefined} />);

        const container = screen.getByTestId("guarantees-container");
        expect(container).toHaveClass("space-y-2");
    });

    it("should handle guarantees with empty text", () => {
        const guaranteesWithEmptyText: GuaranteeItem[] = [
            {
                icon: mockIcon1,
                text: "",
            },
        ];

        render(<GuaranteesList guarantees={guaranteesWithEmptyText} />);

        const container = screen.getByTestId("icon-1").closest("div");
        expect(container).toBeInTheDocument();
    });

    it("should handle guarantees with long text", () => {
        const guaranteesWithLongText: GuaranteeItem[] = [
            {
                icon: mockIcon1,
                text: "This is a very long guarantee text that should still be rendered properly without any issues or truncation.",
            },
        ];

        render(<GuaranteesList guarantees={guaranteesWithLongText} />);

        expect(screen.getByText("This is a very long guarantee text that should still be rendered properly without any issues or truncation.")).toBeInTheDocument();
    });
});
