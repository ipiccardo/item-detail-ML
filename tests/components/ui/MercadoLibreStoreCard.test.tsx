import { render, screen } from "@testing-library/react";
import { MercadoLibreStoreCard } from "../../../src/components/ui/MercadoLibreStoreCard";

describe("MercadoLibreStoreCard", () => {
    it("should render store card with all elements", () => {
        render(<MercadoLibreStoreCard />);

        expect(screen.getByText("Mercado Libre")).toBeInTheDocument();
        expect(screen.getByText("Seguir")).toBeInTheDocument();
        expect(screen.getByText("Tienda oficial de Mercado Libre")).toBeInTheDocument();
        expect(screen.getByText("+10mil")).toBeInTheDocument();
        expect(screen.getByText(/Seguidores/)).toBeInTheDocument();
        expect(screen.getByText("+1000")).toBeInTheDocument();
        expect(screen.getByText(/Productos/)).toBeInTheDocument();
    });

    it("should render store banner image", () => {
        render(<MercadoLibreStoreCard />);

        const bannerImg = screen.getByAltText("Mercado Libre");
        expect(bannerImg).toBeInTheDocument();
        expect(bannerImg).toHaveAttribute("src", "/ml-store-banner.png");
        expect(bannerImg).toHaveClass("w-full", "h-24", "object-cover", "rounded-md", "mb-3");
    });

    it("should handle banner image error", () => {
        render(<MercadoLibreStoreCard />);

        const bannerImg = screen.getByAltText("Mercado Libre");

        // Simulate image error
        const errorEvent = new Event("error");
        Object.defineProperty(errorEvent, "currentTarget", {
            value: bannerImg,
            writable: false,
        });

        bannerImg.dispatchEvent(errorEvent);

        // The onError handler should hide the image
        expect(bannerImg).toHaveStyle("display: none");
    });

    it("should render follow button with correct styling", () => {
        render(<MercadoLibreStoreCard />);

        const followButton = screen.getByText("Seguir");
        expect(followButton).toHaveClass(
            "text-xs",
            "text-blue-600",
            "border",
            "border-blue-600",
            "px-3",
            "py-1",
            "rounded-md",
            "hover:bg-blue-50",
        );
    });

    it("should render official store badge with checkmark", () => {
        render(<MercadoLibreStoreCard />);

        const officialText = screen.getByText("Tienda oficial de Mercado Libre");
        expect(officialText).toBeInTheDocument();

        const checkmark = officialText.querySelector("svg");
        expect(checkmark).toBeInTheDocument();
    });

    it("should render MercadoLíder Platinum badge", () => {
        render(<MercadoLibreStoreCard />);

        expect(screen.getByText("MercadoLíder Platinum")).toBeInTheDocument();
        expect(screen.getByText("¡Uno de los mejores del sitio!")).toBeInTheDocument();
    });

    it("should render stats grid with sales, attention, and delivery", () => {
        render(<MercadoLibreStoreCard />);

        expect(screen.getByText("+1 M")).toBeInTheDocument();
        expect(screen.getByText("Ventas")).toBeInTheDocument();
        expect(screen.getByText("Buena atención")).toBeInTheDocument();
        expect(screen.getByText("Entrega a tiempo")).toBeInTheDocument();
    });

    it("should render stats icons", () => {
        render(<MercadoLibreStoreCard />);

        const statsSection = screen.getByText("Ventas").closest(".grid");
        const icons = statsSection?.querySelectorAll("svg");

        expect(icons).toHaveLength(2); // Checkmark and lock icons for "Buena atención" and "Entrega a tiempo"
    });

    it("should render go to store button", () => {
        render(<MercadoLibreStoreCard />);

        const goToStoreButton = screen.getByText("Ir a la tienda oficial");
        expect(goToStoreButton).toHaveClass(
            "w-full",
            "text-sm",
            "text-blue-600",
            "hover:underline",
            "mb-3",
        );
    });

    it("should render other purchase options section", () => {
        render(<MercadoLibreStoreCard />);

        expect(screen.getByText("Otras opciones de compra")).toBeInTheDocument();
        expect(screen.getByText("Ver 26 opciones desde $ 439.900")).toBeInTheDocument();
    });

    it("should apply correct container styling", () => {
        render(<MercadoLibreStoreCard />);

        const container = screen.getByText("Mercado Libre").closest(".bg-white");
        expect(container).toHaveClass(
            "bg-white",
            "border",
            "border-gray-200",
            "rounded-md",
            "p-4",
            "shadow-sm",
            "w-[309px]",
        );
    });

    it("should render follower and product counts", () => {
        render(<MercadoLibreStoreCard />);

        const followerText = screen.getByText("+10mil");
        const productText = screen.getByText("+1000");

        expect(followerText).toHaveClass("font-semibold");
        expect(productText).toHaveClass("font-semibold");
    });

    it("should render section dividers", () => {
        render(<MercadoLibreStoreCard />);

        const container = screen.getByText("Mercado Libre").closest(".bg-white");
        const dividers = container?.querySelectorAll(".border-b, .border-t");

        expect(dividers).toHaveLength(2); // One border-b and one border-t
    });

    it("should render green badge styling", () => {
        render(<MercadoLibreStoreCard />);

        const badgeContainer = screen.getByText("MercadoLíder Platinum").closest("div");
        expect(badgeContainer).toHaveClass("bg-green-50", "p-2", "rounded");

        const badgeText = screen.getByText("MercadoLíder Platinum");
        expect(badgeText).toHaveClass("text-xs", "font-semibold", "text-green-700");
    });

    it("should render grid layout for stats", () => {
        render(<MercadoLibreStoreCard />);

        const statsContainer = screen.getByText("Ventas").closest(".grid");
        expect(statsContainer).toHaveClass("grid-cols-3", "gap-2", "text-center");
    });
});
