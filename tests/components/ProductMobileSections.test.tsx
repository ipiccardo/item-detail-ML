import { render, screen } from "@testing-library/react";
import { ProductMobileSections } from "../../src/components/ui/ProductMobileSections";

// Mock the PaymentMethodsCard component
jest.mock("../../src/components/ui/PaymentMethodsCard", () => ({
    PaymentMethodsCard: ({ isMobile }: { isMobile?: boolean }) => (
        <div data-testid="payment-methods-card">
            Payment Methods Card {isMobile ? "Mobile" : "Desktop"}
        </div>
    ),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Search: (props: any) => <svg {...props} data-testid="search-icon" />,
}));

describe("ProductMobileSections", () => {
    it("should render mobile sections", () => {
        render(<ProductMobileSections />);

        // Check that payment methods section is rendered
        expect(screen.getByTestId("payment-methods-card")).toBeInTheDocument();
        
        // Check that questions section is rendered
        expect(screen.getByText("Preguntas y respuestas")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Escribí una pregunta o palabra clave...")).toBeInTheDocument();
        expect(screen.getByText("Tiene NFC?")).toBeInTheDocument();
    });

    it("should have proper container structure", () => {
        render(<ProductMobileSections />);

        // Check that the mobile sections are wrapped in lg:hidden containers
        // The payment section wrapper div has lg:hidden class
        const paymentWrapper = screen.getByTestId("payment-methods-card").closest("div.lg\\:hidden");
        expect(paymentWrapper).toBeInTheDocument();
        
        const questionsSection = screen.getByText("Preguntas y respuestas").closest("div");
        expect(questionsSection).toHaveClass("lg:hidden", "bg-white", "rounded-md", "p-4", "border", "border-gray-200");
    });

    it("should render search input and button", () => {
        render(<ProductMobileSections />);

        const searchInput = screen.getByPlaceholderText("Escribí una pregunta o palabra clave...");
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveClass("w-full", "p-3", "pr-10", "text-sm", "border", "border-gray-300", "rounded-md");

        const searchButton = screen.getByTestId("search-icon");
        expect(searchButton).toBeInTheDocument();
    });

    it("should render quick questions", () => {
        render(<ProductMobileSections />);

        expect(screen.getByText("Tiene NFC?")).toBeInTheDocument();
        expect(screen.getByText("Buscar entre 118 preguntas de esta publicación")).toBeInTheDocument();
    });

    it("should pass isMobile prop to PaymentMethodsCard", () => {
        render(<ProductMobileSections />);

        expect(screen.getByText("Payment Methods Card Mobile")).toBeInTheDocument();
    });
});
