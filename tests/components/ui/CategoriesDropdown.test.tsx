/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import { render, screen, fireEvent } from "@testing-library/react";
import { CategoriesDropdown } from "../../../src/components/ui/CategoriesDropdown";
import { JSX } from "react";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    ChevronRight: (props: React.SVGProps<SVGSVGElement>): JSX.Element => <svg {...props} data-testid="chevron-right-icon" />,
}));

describe("CategoriesDropdown", () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should not render when isOpen is false", () => {
        const { container } = render(
            <CategoriesDropdown isOpen={false} onClose={mockOnClose} />
        );

        expect(container.firstChild).toBeNull();
    });

    it("should render when isOpen is true", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        expect(screen.getByText("Vehículos")).toBeInTheDocument();
        expect(screen.getByText("Inmuebles")).toBeInTheDocument();
        expect(screen.getByText("Supermercado")).toBeInTheDocument();
        expect(screen.getByText("Tecnología")).toBeInTheDocument();
    });

    it("should render all categories", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const categories = [
            "Vehículos",
            "Inmuebles",
            "Supermercado",
            "Tecnología",
            "Farmacia",
            "Compra Internacional",
            "Hogar y Muebles",
            "Electrodomésticos",
            "Herramientas",
            "Construcción",
            "Deportes y Fitness",
            "Accesorios para Vehículos",
            "Para tu Negocio",
            "Mascotas",
            "Moda",
            "Juegos y Juguetes",
            "Bebés",
            "Belleza y Cuidado Personal",
            "Salud y Equipamiento Médico",
            "Industrias y Oficinas",
            "Agro",
            "Productos Sustentables",
        ];

        categories.forEach(category => {
            expect(screen.getByText(category)).toBeInTheDocument();
        });
    });

    it("should show chevron icon for Tecnología category", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const tecnologiaButton = screen.getByText("Tecnología").closest("button");
        const chevronIcon = screen.getByTestId("chevron-right-icon");

        expect(tecnologiaButton).toContainElement(chevronIcon);
    });

    it("should not show chevron icon for other categories", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const vehiculosButton = screen.getByText("Vehículos").closest("button");
        const chevronIcons = screen.getAllByTestId("chevron-right-icon");

        expect(chevronIcons).toHaveLength(1); // Only one chevron for Tecnología
        expect(vehiculosButton).not.toContainElement(chevronIcons[0]);
    });

    it("should call onClose when backdrop is clicked", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const backdrop = screen.getByText("Vehículos").closest("div")?.parentElement?.previousElementSibling;
        fireEvent.click(backdrop!);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when a category is clicked", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const vehiculosButton = screen.getByText("Vehículos");
        fireEvent.click(vehiculosButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should have proper dropdown styling", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const dropdown = screen.getByText("Vehículos").closest(".bg-gray-800");
        expect(dropdown).toHaveClass("absolute", "top-full", "left-0", "z-50", "w-80", "bg-gray-800", "text-white", "shadow-lg");
    });

    it("should have proper backdrop styling", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const backdrop = screen.getByText("Vehículos").closest("div")?.parentElement?.previousElementSibling;
        expect(backdrop).toHaveClass("fixed", "inset-0", "z-40", "bg-black", "bg-opacity-50");
    });

    it("should have hover effects on category buttons", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const vehiculosButton = screen.getByText("Vehículos");
        expect(vehiculosButton).toHaveClass("hover:bg-gray-700");
    });

    it("should render submenu for Tecnología on hover", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const tecnologiaButton = screen.getByText("Tecnología").closest("div");
        expect(tecnologiaButton).toHaveClass("group");
    });

    it("should have proper submenu styling", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const submenu = screen.getByText("Celulares y Teléfonos").closest("div");
        expect(submenu).toHaveClass("absolute", "left-full", "top-0", "w-80", "bg-gray-800", "text-white", "shadow-lg");
    });

    it("should render all submenu items for Tecnología", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const submenuItems = [
            "Celulares y Teléfonos",
            "Computación",
            "Cámaras y Accesorios",
            "Audio y Video",
            "Gaming",
            "Smart Home",
        ];

        submenuItems.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    it("should have hover effects on submenu items", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const celularesButton = screen.getByText("Celulares y Teléfonos");
        expect(celularesButton).toHaveClass("hover:bg-gray-700");
    });

    it("should call onClose when submenu item is clicked", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const celularesButton = screen.getByText("Celulares y Teléfonos");
        fireEvent.click(celularesButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should have proper text styling for categories", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const vehiculosText = screen.getByText("Vehículos");
        expect(vehiculosText).toHaveClass("text-sm");
    });

    it("should have proper text styling for submenu items", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const celularesText = screen.getByText("Celulares y Teléfonos");
        expect(celularesText).toHaveClass("text-sm");
    });

    it("should have proper button styling", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const vehiculosButton = screen.getByText("Vehículos");
        expect(vehiculosButton).toHaveClass("w-full", "px-4", "py-3", "text-left", "hover:bg-gray-700", "flex", "items-center", "justify-between");
    });

    it("should have proper submenu button styling", () => {
        render(
            <CategoriesDropdown isOpen={true} onClose={mockOnClose} />
        );

        const celularesButton = screen.getByText("Celulares y Teléfonos");
        expect(celularesButton).toHaveClass("w-full", "px-4", "py-3", "text-left", "hover:bg-gray-700", "text-sm");
    });
});
