/* eslint-disable comma-dangle */
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileMenu } from "@/components/ui/MobileMenu";

describe("MobileMenu", () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        mockOnClose.mockClear();
    });

    describe("Rendering", () => {
        it("should not render when isOpen is false", () => {
            const { container } = render(
                <MobileMenu isOpen={false} onClose={mockOnClose} />
            );
            expect(container.firstChild).toBeNull();
        });

        it("should render when isOpen is true", () => {
            render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
            expect(screen.getByAltText("MercadoLibre")).toBeInTheDocument();
        });
    });

    describe("Header Section", () => {
        beforeEach(() => {
            render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
        });

        it("should render logo", () => {
            const logo = screen.getByAltText("MercadoLibre");
            expect(logo).toBeInTheDocument();
            expect(logo).toHaveAttribute("src", expect.stringContaining("mercadolibre"));
        });

        it("should render close button", () => {
            const closeButton = screen.getByRole("button", { name: "" });
            expect(closeButton).toBeInTheDocument();
        });

        it("should call onClose when close button is clicked", () => {
            const closeButtons = screen.getAllByRole("button");
            const closeButton = closeButtons[0]; // First button is the close button
            fireEvent.click(closeButton);
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });

        it("should render search input", () => {
            const searchInput = screen.getByPlaceholderText("Estoy buscando...");
            expect(searchInput).toBeInTheDocument();
            expect(searchInput).toHaveAttribute("type", "text");
        });

        it("should render location text", () => {
            expect(screen.getByText("Enviar a Capital Federal")).toBeInTheDocument();
        });

        it("should render welcome message", () => {
            expect(screen.getByText("Bienvenido")).toBeInTheDocument();
            expect(
                screen.getByText(/Ingresa a tu cuenta para ver tus compras, favoritos, etc./)
            ).toBeInTheDocument();
        });

        it("should render action buttons", () => {
            expect(screen.getByText("Ingresá")).toBeInTheDocument();
            expect(screen.getByText("Creá tu cuenta")).toBeInTheDocument();
        });
    });

    describe("Navigation Menu", () => {
        beforeEach(() => {
            render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
        });

        it("should render first group navigation items", () => {
            expect(screen.getByText("Inicio")).toBeInTheDocument();
            expect(screen.getByText("Ofertas")).toBeInTheDocument();
            expect(screen.getByText("Mercado Play")).toBeInTheDocument();
            expect(screen.getByText("Historial")).toBeInTheDocument();
            expect(screen.getByText("Ayuda")).toBeInTheDocument();
        });

        it("should render GRATIS badge for Mercado Play", () => {
            expect(screen.getByText("GRATIS")).toBeInTheDocument();
            const gratisTag = screen.getByText("GRATIS");
            expect(gratisTag).toHaveClass("bg-green-500");
        });

        it("should render second group navigation items", () => {
            expect(screen.getByText("Supermercado")).toBeInTheDocument();
            expect(screen.getByText("Moda")).toBeInTheDocument();
            expect(screen.getByText("Más vendidos")).toBeInTheDocument();
            expect(screen.getByText("Tiendas oficiales")).toBeInTheDocument();
            expect(screen.getByText("Categorías")).toBeInTheDocument();
        });

        it("should render NUEVO badge for Más vendidos", () => {
            expect(screen.getByText("NUEVO")).toBeInTheDocument();
            const nuevoTag = screen.getByText("NUEVO");
            expect(nuevoTag).toHaveClass("bg-blue-500");
        });

        it("should render third group navigation items", () => {
            expect(screen.getByText("Resumen")).toBeInTheDocument();
            expect(screen.getByText("Vender")).toBeInTheDocument();
        });
    });

    describe("Styling", () => {
        it("should have correct container classes", () => {
            const { container } = render(
                <MobileMenu isOpen={true} onClose={mockOnClose} />
            );
            const mainContainer = container.firstChild as HTMLElement;
            expect(mainContainer).toHaveClass("w-full", "bg-white");
        });

        it("should have yellow header section", () => {
            const { container } = render(
                <MobileMenu isOpen={true} onClose={mockOnClose} />
            );
            const yellowSection = container.querySelector(".bg-yellow-400");
            expect(yellowSection).toBeInTheDocument();
        });

        it("should render navigation buttons with hover effect", () => {
            render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
            const inicioButton = screen.getByText("Inicio").closest("button");
            expect(inicioButton).toHaveClass("hover:bg-gray-50");
        });
    });

    describe("Responsive Behavior", () => {
        it("should be full width", () => {
            const { container } = render(
                <MobileMenu isOpen={true} onClose={mockOnClose} />
            );
            const mainContainer = container.firstChild as HTMLElement;
            expect(mainContainer).toHaveClass("w-full");
        });

        it("should render all buttons as full width", () => {
            render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
            const inicioButton = screen.getByText("Inicio").closest("button");
            expect(inicioButton).toHaveClass("w-full");
        });
    });

    describe("Interactions", () => {
        it("should allow typing in search input", () => {
            render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
            const searchInput = screen.getByPlaceholderText(
                "Estoy buscando..."
            ) as HTMLInputElement;

            fireEvent.change(searchInput, { target: { value: "iPhone" } });
            expect(searchInput.value).toBe("iPhone");
        });

        it("should have clickable navigation buttons", () => {
            render(<MobileMenu isOpen={true} onClose={mockOnClose} />);
            const buttons = screen.getAllByRole("button");

            // Should have multiple clickable buttons
            expect(buttons.length).toBeGreaterThan(5);

            // Each button should be clickable
            buttons.forEach((button) => {
                expect(button).not.toBeDisabled();
            });
        });
    });
});

