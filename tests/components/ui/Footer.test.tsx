import { render, screen, fireEvent } from "@testing-library/react";
import { Footer } from "../../../src/components/ui/Footer";
import { FooterData } from "../../../src/types/footer";

const mockFooterData: FooterData = {
    sections: [
        {
            title: "Test Section",
            links: [
                { text: "Test Link", href: "/test" },
            ],
        },
    ],
    alwaysVisibleLinks: [
        { text: "Trabajá con nosotros", href: "/careers" },
        { text: "Ayuda", href: "/help" },
    ],
    secondaryLinks: [
        { text: "Secondary Link", href: "/secondary" },
    ],
    copyright: "Copyright © 2024 Test",
    address: "Test Address",
};

describe("Footer", () => {
    it("should render toggle button", () => {
        render(<Footer data={mockFooterData} />);

        expect(screen.getByText("Más información")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should not render collapsable content initially", () => {
        render(<Footer data={mockFooterData} />);

        expect(screen.queryByText("Test Section")).not.toBeInTheDocument();
        expect(screen.queryByText("Test Link")).not.toBeInTheDocument();
    });

    it("should always render always visible content", () => {
        render(<Footer data={mockFooterData} />);

        // Contenido siempre visible debe estar presente
        expect(screen.getByText("Trabajá con nosotros")).toBeInTheDocument();
        expect(screen.getByText("Ayuda")).toBeInTheDocument();
        expect(screen.getByText("Secondary Link")).toBeInTheDocument();
        expect(screen.getByText("Copyright © 2024 Test")).toBeInTheDocument();
        expect(screen.getByText("Test Address")).toBeInTheDocument();
    });

    it("should show content when toggle button is clicked", () => {
        render(<Footer data={mockFooterData} />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(screen.getByText("Test Section")).toBeInTheDocument();
        expect(screen.getByText("Test Link")).toBeInTheDocument();
    });

    it("should hide content when toggle button is clicked again", () => {
        render(<Footer data={mockFooterData} />);

        const button = screen.getByRole("button");

        // Open
        fireEvent.click(button);
        expect(screen.getByText("Test Section")).toBeInTheDocument();

        // Close
        fireEvent.click(button);
        expect(screen.queryByText("Test Section")).not.toBeInTheDocument();
    });

    it("should render all content when open", () => {
        render(<Footer data={mockFooterData} />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        // Contenido colapsable
        expect(screen.getByText("Test Section")).toBeInTheDocument();
        expect(screen.getByText("Test Link")).toBeInTheDocument();

        // Contenido siempre visible
        expect(screen.getByText("Trabajá con nosotros")).toBeInTheDocument();
        expect(screen.getByText("Ayuda")).toBeInTheDocument();
        expect(screen.getByText("Secondary Link")).toBeInTheDocument();
        expect(screen.getByText("Copyright © 2024 Test")).toBeInTheDocument();
        expect(screen.getByText("Test Address")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
        render(<Footer data={mockFooterData} className="custom-class" />);

        const footer = screen.getByRole("button").closest("footer");
        expect(footer).toHaveClass("custom-class");
    });

    it("should have proper footer structure", () => {
        render(<Footer data={mockFooterData} />);

        const footer = screen.getByRole("button").closest("footer");
        expect(footer).toBeInTheDocument();
        // El footer principal ya no tiene estas clases, están en los componentes hijos
    });

    it("should toggle button aria-expanded correctly", () => {
        render(<Footer data={mockFooterData} />);

        const button = screen.getByRole("button");

        expect(button).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded", "true");

        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded", "false");
    });
});
