import { render, screen } from "@testing-library/react";
import { PaymentMethodsCard } from "../../../src/components/ui/PaymentMethodsCard";
import { JSX } from "react";

// Mock all icon components
jest.mock("../../../src/components/ui/icons/Visa", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="visa-icon">Visa</div>,
}));

jest.mock("../../../src/components/ui/icons/Amex", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="amex-icon">Amex</div>,
}));

jest.mock("../../../src/components/ui/icons/Master", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="master-icon">Master</div>,
}));

jest.mock("../../../src/components/ui/icons/Naranja", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="naranja-icon">Naranja</div>,
}));

jest.mock("../../../src/components/ui/icons/VisaDebito", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="visa-debito-icon">VisaDebito</div>,
}));

jest.mock("../../../src/components/ui/icons/Maestro", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="maestro-icon">Maestro</div>,
}));

jest.mock("../../../src/components/ui/icons/Cabal", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="cabal-icon">Cabal</div>,
}));

jest.mock("../../../src/components/ui/icons/MasterCardDebito", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="master-card-debito-icon">MasterCardDebito</div>,
}));

jest.mock("../../../src/components/ui/icons/PagoFacil", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="pago-facil-icon">PagoFacil</div>,
}));

jest.mock("../../../src/components/ui/icons/Rapipago", () => ({
    __esModule: true,
    default: (): JSX.Element => <div data-testid="rapipago-icon">Rapipago</div>,
}));

describe("PaymentMethodsCard", () => {
    it("should render desktop version by default", () => {
        render(<PaymentMethodsCard />);

        expect(screen.getByText("Medios de pago")).toBeInTheDocument();
        expect(screen.getByText("¡Pagá el mismo precio en hasta 12 cuotas!")).toBeInTheDocument();
        expect(screen.getByText("Cuotas sin Tarjeta")).toBeInTheDocument();
        expect(screen.getByText("Tarjetas de crédito")).toBeInTheDocument();
        expect(screen.getByText("Tarjetas de débito")).toBeInTheDocument();
        expect(screen.getByText("Efectivo")).toBeInTheDocument();
    });

    it("should render mobile version when isMobile is true", () => {
        render(<PaymentMethodsCard isMobile={true} />);

        expect(screen.getByText("Medios de pago")).toBeInTheDocument();
        expect(screen.queryByText("¡Pagá el mismo precio en hasta 12 cuotas!")).not.toBeInTheDocument();
        expect(screen.queryByText("Cuotas sin Tarjeta")).not.toBeInTheDocument();
        expect(screen.getByText("Ver más medios de pago")).toBeInTheDocument();
    });

    it("should render desktop version when isMobile is false", () => {
        render(<PaymentMethodsCard isMobile={false} />);

        expect(screen.getByText("Conocé otros medios de pago")).toBeInTheDocument();
        expect(screen.getByText("¡Pagá el mismo precio en hasta 12 cuotas!")).toBeInTheDocument();
    });

    it("should render all credit card icons", () => {
        render(<PaymentMethodsCard />);

        expect(screen.getByTestId("visa-icon")).toBeInTheDocument();
        expect(screen.getByTestId("amex-icon")).toBeInTheDocument();
        expect(screen.getByTestId("master-icon")).toBeInTheDocument();
        expect(screen.getByTestId("naranja-icon")).toBeInTheDocument();
    });

    it("should render all debit card icons", () => {
        render(<PaymentMethodsCard />);

        expect(screen.getByTestId("visa-debito-icon")).toBeInTheDocument();
        expect(screen.getByTestId("maestro-icon")).toBeInTheDocument();
        expect(screen.getByTestId("cabal-icon")).toBeInTheDocument();
        expect(screen.getByTestId("master-card-debito-icon")).toBeInTheDocument();
    });

    it("should render cash payment icons", () => {
        render(<PaymentMethodsCard />);

        expect(screen.getByTestId("pago-facil-icon")).toBeInTheDocument();
        expect(screen.getByTestId("rapipago-icon")).toBeInTheDocument();
    });

    it("should render Mercado Pago logo", () => {
        render(<PaymentMethodsCard />);

        const mercadoPagoImg = screen.getByAltText("Mercado Pago");
        expect(mercadoPagoImg).toBeInTheDocument();
        expect(mercadoPagoImg).toHaveAttribute("src", "/mercado-pago-logo.png");
    });

    it("should handle image error for Mercado Pago logo", () => {
        render(<PaymentMethodsCard />);

        const mercadoPagoImg = screen.getByAltText("Mercado Pago");

        // Simulate image error
        const errorEvent = new Event("error");
        Object.defineProperty(errorEvent, "currentTarget", {
            value: mercadoPagoImg,
            writable: false,
        });

        mercadoPagoImg.dispatchEvent(errorEvent);

        // The onError handler should change the src
        expect(mercadoPagoImg).toHaveAttribute("src", "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\"/>");
    });

    it("should apply correct styling for desktop version", () => {
        render(<PaymentMethodsCard />);

        const container = screen.getByText("Medios de pago").closest("div");
        expect(container).toHaveClass("w-[309px]");
    });

    it("should apply correct styling for mobile version", () => {
        render(<PaymentMethodsCard isMobile={true} />);

        const container = screen.getByText("Medios de pago").closest("div");
        expect(container).not.toHaveClass("w-[309px]");
    });

    it("should render credit cards section with proper layout", () => {
        render(<PaymentMethodsCard />);

        const creditCardsSection = screen.getByText("Tarjetas de crédito").closest("div");
        const creditCardsContainer = creditCardsSection?.querySelector(".flex");

        expect(creditCardsContainer).toBeInTheDocument();
        expect(creditCardsContainer).toHaveClass("gap-2");
    });

    it("should render debit cards section with proper layout", () => {
        render(<PaymentMethodsCard />);

        const debitCardsSection = screen.getByText("Tarjetas de débito").closest("div");
        const debitCardsContainer = debitCardsSection?.querySelector(".flex");

        expect(debitCardsContainer).toBeInTheDocument();
        expect(debitCardsContainer).toHaveClass("gap-2");
    });

    it("should render cash section with proper layout", () => {
        render(<PaymentMethodsCard />);

        const cashSection = screen.getByText("Efectivo").closest("div");
        const cashContainer = cashSection?.querySelector(".flex");

        expect(cashContainer).toBeInTheDocument();
        expect(cashContainer).toHaveClass("gap-2");
    });

    it("should render mobile-specific button with arrow", () => {
        render(<PaymentMethodsCard isMobile={true} />);

        const button = screen.getByText("Ver más medios de pago");
        expect(button).toBeInTheDocument();

        const arrow = button.querySelector("svg");
        expect(arrow).toBeInTheDocument();
    });

    it("should render desktop-specific button without arrow", () => {
        render(<PaymentMethodsCard isMobile={false} />);

        const button = screen.getByText("Conocé otros medios de pago");
        expect(button).toBeInTheDocument();
        expect(button.querySelector("svg")).not.toBeInTheDocument();
    });
});
