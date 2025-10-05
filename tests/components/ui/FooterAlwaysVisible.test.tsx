import { render, screen } from "@testing-library/react";
import { FooterAlwaysVisible } from "../../../src/components/ui/FooterAlwaysVisible";
import { FooterData } from "../../../src/types/footer";

const mockFooterData: FooterData = {
    sections: [],
    alwaysVisibleLinks: [
        { text: "Trabajá con nosotros", href: "/careers" },
        { text: "Términos y condiciones", href: "/terms" },
        { text: "Ayuda", href: "/help" },
    ],
    secondaryLinks: [
        { text: "Libro de quejas online", href: "/complaints" },
        { text: "Programa de Afiliados", href: "/affiliate-program" },
    ],
    copyright: "Copyright © 2024 Test Company",
    address: "Test Address 123",
};

describe("FooterAlwaysVisible", () => {
    it("should render always visible links", () => {
        render(<FooterAlwaysVisible data={mockFooterData} />);

        expect(screen.getByText("Trabajá con nosotros")).toBeInTheDocument();
        expect(screen.getByText("Términos y condiciones")).toBeInTheDocument();
        expect(screen.getByText("Ayuda")).toBeInTheDocument();
    });

    it("should render secondary links", () => {
        render(<FooterAlwaysVisible data={mockFooterData} />);

        expect(screen.getByText("Libro de quejas online")).toBeInTheDocument();
        expect(screen.getByText("Programa de Afiliados")).toBeInTheDocument();
    });

    it("should render copyright and address", () => {
        render(<FooterAlwaysVisible data={mockFooterData} />);

        expect(screen.getByText("Copyright © 2024 Test Company")).toBeInTheDocument();
        expect(screen.getByText("Test Address 123")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
        render(<FooterAlwaysVisible data={mockFooterData} className="custom-class" />);

        const container = screen.getByText("Trabajá con nosotros").closest(".bg-white");
        expect(container).toHaveClass("custom-class");
    });

    it("should have proper layout structure", () => {
        render(<FooterAlwaysVisible data={mockFooterData} />);

        const container = screen.getByText("Trabajá con nosotros").closest(".bg-white");
        expect(container).toHaveClass("border-t", "border-gray-200");
    });

    it("should align copyright and address to the left", () => {
        render(<FooterAlwaysVisible data={mockFooterData} />);

        const copyrightContainer = screen.getByText("Copyright © 2024 Test Company").closest("div");
        expect(copyrightContainer).toHaveClass("text-left");
    });

    it("should handle empty links arrays", () => {
        const emptyData: FooterData = {
            sections: [],
            alwaysVisibleLinks: [],
            secondaryLinks: [],
            copyright: "Copyright © 2024 Test",
            address: "Test Address",
        };

        render(<FooterAlwaysVisible data={emptyData} />);

        expect(screen.getByText("Copyright © 2024 Test")).toBeInTheDocument();
        expect(screen.getByText("Test Address")).toBeInTheDocument();
        expect(screen.queryByText("Trabajá con nosotros")).not.toBeInTheDocument();
    });
});
