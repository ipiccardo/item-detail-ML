/* eslint-disable max-len */
import { render, screen } from "@testing-library/react";
import { MercadoLibreHeader } from "../../../src/components/ui/MercadoLibreHeader";
import { JSX } from "react";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Search: (props: React.SVGProps<SVGSVGElement>): JSX.Element => <svg {...props} data-testid="search-icon" />,
    MapPin: (props: React.SVGProps<SVGSVGElement>): JSX.Element => <svg {...props} data-testid="map-pin-icon" />,
    ShoppingCart: (props: React.SVGProps<SVGSVGElement>): JSX.Element => <svg {...props} data-testid="shopping-cart-icon" />,
    Menu: (props: React.SVGProps<SVGSVGElement>): JSX.Element => <svg {...props} data-testid="menu-icon" />,
    ChevronDown: (props: React.SVGProps<SVGSVGElement>): JSX.Element => <svg {...props} data-testid="chevron-down-icon" />,
}));

describe("MercadoLibreHeader", () => {
    it("should render header with all main elements", () => {
        render(<MercadoLibreHeader />);

        expect(screen.getByText("ENVÍO GRATIS EN TU PRIMERA COMPRA EXCLUSIVO EN APP")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Buscar productos, marcas...")).toBeInTheDocument();
        expect(screen.getAllByText("Enviar a Capital Federal")).toHaveLength(2); // Mobile and desktop versions
    });

    it("should render MercadoLibre logo", () => {
        render(<MercadoLibreHeader />);

        const logos = screen.getAllByAltText("MercadoLibre");
        expect(logos).toHaveLength(2); // Mobile and desktop versions
        expect(logos[0]).toHaveAttribute("src", "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.150/mercadolibre/logo_large_plus@2x.webp");
    });

    it("should render search bar with search icon", () => {
        render(<MercadoLibreHeader />);

        const searchInput = screen.getByPlaceholderText("Buscar productos, marcas...");
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveClass("w-full", "h-9", "lg:h-10");

        const searchIcon = screen.getByTestId("search-icon");
        expect(searchIcon).toBeInTheDocument();
    });

    it("should render mobile menu button", () => {
        render(<MercadoLibreHeader />);

        const menuIcon = screen.getAllByTestId("menu-icon");
        expect(menuIcon).toHaveLength(2); // Mobile menu and desktop categories
    });

    it("should render shopping cart icons", () => {
        render(<MercadoLibreHeader />);

        const cartIcons = screen.getAllByTestId("shopping-cart-icon");
        expect(cartIcons).toHaveLength(2); // Mobile and desktop versions
    });

    it("should render location information", () => {
        render(<MercadoLibreHeader />);

        const locationTexts = screen.getAllByText("Enviar a Capital Federal");
        expect(locationTexts).toHaveLength(2); // Mobile and desktop versions

        const mapPinIcons = screen.getAllByTestId("map-pin-icon");
        expect(mapPinIcons).toHaveLength(2);
    });

    it("should render desktop navigation links", () => {
        render(<MercadoLibreHeader />);

        expect(screen.getByText("Categorías")).toBeInTheDocument();
        expect(screen.getByText("Ofertas")).toBeInTheDocument();
        expect(screen.getByText("Cupones")).toBeInTheDocument();
        expect(screen.getByText("Supermercado")).toBeInTheDocument();
        expect(screen.getByText("Moda")).toBeInTheDocument();
        expect(screen.getByText("Mercado Play")).toBeInTheDocument();
        expect(screen.getByText("Vender")).toBeInTheDocument();
        expect(screen.getByText("Ayuda")).toBeInTheDocument();
    });

    it("should render user account links", () => {
        render(<MercadoLibreHeader />);

        expect(screen.getByText("Creá tu cuenta")).toBeInTheDocument();
        expect(screen.getByText("Ingresá")).toBeInTheDocument();
        expect(screen.getByText("Mis compras")).toBeInTheDocument();
    });

    it("should render Mercado Play with FREE badge", () => {
        render(<MercadoLibreHeader />);

        expect(screen.getByText("GRATIS")).toBeInTheDocument();
        const gratisBadge = screen.getByText("GRATIS");
        expect(gratisBadge).toHaveClass("bg-green-500", "text-white", "text-xs", "px-1", "rounded");
    });

    it("should render chevron down icon for categories", () => {
        render(<MercadoLibreHeader />);

        const chevronIcon = screen.getByTestId("chevron-down-icon");
        expect(chevronIcon).toBeInTheDocument();
    });

    it("should apply correct responsive classes", () => {
        render(<MercadoLibreHeader />);

        // Check top banner is hidden on mobile
        const topBanner = screen.getByText("ENVÍO GRATIS EN TU PRIMERA COMPRA EXCLUSIVO EN APP");
        expect(topBanner).toHaveClass("hidden", "lg:block");

        // Check mobile menu container is hidden on desktop
        const mobileMenuContainer = screen.getAllByTestId("menu-icon")[0].closest("div");
        expect(mobileMenuContainer).toHaveClass("lg:hidden");

        // Check desktop logo is hidden on mobile
        const desktopLogo = screen.getAllByAltText("MercadoLibre")[1].closest("div");
        expect(desktopLogo).toHaveClass("hidden", "lg:flex");
    });

    it("should render proper header structure", () => {
        render(<MercadoLibreHeader />);

        const header = screen.getByText("ENVÍO GRATIS EN TU PRIMERA COMPRA EXCLUSIVO EN APP").closest(".ml-header");
        expect(header).toBeInTheDocument();
    });

    it("should render search bar with proper styling", () => {
        render(<MercadoLibreHeader />);

        const searchInput = screen.getByPlaceholderText("Buscar productos, marcas...");
        expect(searchInput).toHaveClass(
            "w-full",
            "h-9",
            "lg:h-10",
            "px-3",
            "lg:px-4",
            "pr-10",
            "lg:pr-12",
            "border",
            "border-gray-300",
            "rounded-md",
            "text-sm",
            "focus:outline-none",
            "focus:ring-2",
            "focus:ring-blue-500",
        );
    });

    it("should render navigation links with hover effects", () => {
        render(<MercadoLibreHeader />);

        const ofertasLink = screen.getByText("Ofertas");
        expect(ofertasLink).toHaveClass("text-gray-600", "hover:text-blue-600");

        const cuponesLink = screen.getByText("Cupones");
        expect(cuponesLink).toHaveClass("text-gray-600", "hover:text-blue-600");
    });

    it("should render categories button with proper styling", () => {
        render(<MercadoLibreHeader />);

        const categoriesButton = screen.getByText("Categorías").closest("button");
        expect(categoriesButton).toHaveClass(
            "flex",
            "items-center",
            "gap-1",
            "text-gray-600",
            "hover:text-blue-600",
        );
    });
});
