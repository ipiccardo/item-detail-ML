import { render } from "@testing-library/react";
import {
    Visa,
    Amex,
    Master,
    VisaDebito,
    MasterCardDebito,
    Naranja,
    Maestro,
    Cabal,
    PagoFacil,
    Rapipago,
} from "../index";

describe("Icon Components", () => {
    it("should render Visa icon", () => {
        const { container } = render(<Visa className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should render Amex icon", () => {
        const { container } = render(<Amex className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should render Master icon", () => {
        const { container } = render(<Master className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should render VisaDebito icon", () => {
        const { container } = render(<VisaDebito className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should render MasterCardDebito icon", () => {
        const { container } = render(<MasterCardDebito className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should render Naranja icon", () => {
        const { container } = render(<Naranja className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should render Maestro icon", () => {
        const { container } = render(<Maestro className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should render Cabal icon", () => {
        const { container } = render(<Cabal className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should render PagoFacil icon", () => {
        const { container } = render(<PagoFacil className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("should render Rapipago icon", () => {
        const { container } = render(<Rapipago className="w-6 h-6" />);
        expect(container.firstChild).toBeInTheDocument();
    });
});
