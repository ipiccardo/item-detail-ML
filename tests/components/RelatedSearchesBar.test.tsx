import { render, screen } from "@testing-library/react";
import { RelatedSearchesBar } from "../../src/components/ui/RelatedSearchesBar";

describe("RelatedSearchesBar", () => {
    it("should render related searches section", () => {
        render(<RelatedSearchesBar />);

        expect(screen.getByText("También puede interesarte:")).toBeInTheDocument();
    });

    it("should render breadcrumbs section", () => {
        render(<RelatedSearchesBar />);

        expect(screen.getByText("Volver")).toBeInTheDocument();
        expect(screen.getByText("Celulares y Teléfonos")).toBeInTheDocument();
        expect(screen.getByText("Celulares y Smartphones")).toBeInTheDocument();
        expect(screen.getByText("Samsung")).toBeInTheDocument();
    });

    it("should render search suggestions", () => {
        render(<RelatedSearchesBar />);

        expect(screen.getByText("tienda personal 2x1 celular")).toBeInTheDocument();
        expect(screen.getByText("celulares samsung")).toBeInTheDocument();
        expect(screen.getByText("samsung galaxy")).toBeInTheDocument();
        expect(screen.getByText("samsung a52s 5g")).toBeInTheDocument();
    });

    it("should have proper container structure", () => {
        render(<RelatedSearchesBar />);

        const container = screen.getByText("También puede interesarte:").closest("div");
        expect(container).toHaveClass("hidden", "lg:flex", "items-center", "gap-4", "text-sm", "mb-2");
    });

    it("should render breadcrumbs as clickable links", () => {
        render(<RelatedSearchesBar />);

        const breadcrumbLinks = screen.getAllByRole("link");
        expect(breadcrumbLinks.length).toBeGreaterThan(0);
    });

    it("should render search suggestions as clickable elements", () => {
        render(<RelatedSearchesBar />);

        const searchSuggestions = screen.getAllByText(/samsung|celular|tienda/i);
        expect(searchSuggestions.length).toBeGreaterThan(0);
    });

    it("should have responsive classes", () => {
        render(<RelatedSearchesBar />);

        const container = screen.getByText("También puede interesarte:").closest("div");
        expect(container).toHaveClass("hidden", "lg:flex", "items-center", "gap-4", "text-sm", "mb-2");
    });

    it("should render back button", () => {
        render(<RelatedSearchesBar />);

        const backButton = screen.getByText("Volver");
        expect(backButton).toBeInTheDocument();
    });
});
