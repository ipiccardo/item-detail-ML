import { render, screen, fireEvent } from "@testing-library/react";
import { KeyFeatures } from "../../src/components/ui/KeyFeatures";
import { useSpecificationsExpansionStore } from "../../src/stores/specificationsExpansionStore";

// Mock the Zustand store
jest.mock("../../src/stores/specificationsExpansionStore", () => ({
    useSpecificationsExpansionStore: jest.fn(),
}));

const mockUseSpecificationsExpansionStore = useSpecificationsExpansionStore as jest.MockedFunction<typeof useSpecificationsExpansionStore>;

const mockFeatures = [
    "Pantalla Super AMOLED de 6.8 pulgadas",
    "Procesador Snapdragon 8 Gen 3",
    "Cámara principal de 200MP",
    "Batería de 5000 mAh",
    "Resistencia al agua y al polvo (IP68)",
];

describe("KeyFeatures", () => {
    beforeEach(() => {
        // Default mock implementation
        mockUseSpecificationsExpansionStore.mockImplementation((selector) => {
            const state = {
                isExpanded: false,
                toggleExpansion: jest.fn(),
                expandAndScroll: jest.fn(),
            };
            return selector ? selector(state) : state.expandAndScroll;
        });
    });

    it("should render key features title", () => {
        render(<KeyFeatures features={mockFeatures} />);

        expect(screen.getByText("Lo que tenés que saber de este producto")).toBeInTheDocument();
    });

    it("should render all key features", () => {
        render(<KeyFeatures features={mockFeatures} />);

        mockFeatures.forEach((feature) => {
            expect(screen.getByText(feature)).toBeInTheDocument();
        });
    });

    it("should have proper container structure", () => {
        render(<KeyFeatures features={mockFeatures} />);

        const container = screen.getByText("Lo que tenés que saber de este producto").closest("div");
        expect(container).toHaveClass("mt-4");
    });

    it("should handle empty features array", () => {
        render(<KeyFeatures features={[]} />);

        expect(screen.queryByText("Lo que tenés que saber de este producto")).not.toBeInTheDocument();
    });

    it("should render features in a list format", () => {
        render(<KeyFeatures features={mockFeatures} />);

        const featuresList = screen.getByRole("list");
        expect(featuresList).toBeInTheDocument();
    });

    it("should render each feature with proper styling", () => {
        render(<KeyFeatures features={mockFeatures} />);

        const featureItems = screen.getAllByRole("listitem");
        expect(featureItems.length).toBe(mockFeatures.length);

        featureItems.forEach((item) => {
            expect(item).toHaveClass("flex", "items-start");
        });
    });

    it("should render title with proper styling", () => {
        render(<KeyFeatures features={mockFeatures} />);

        const title = screen.getByText("Lo que tenés que saber de este producto");
        expect(title).toHaveClass("text-[18px]", "font-semibold", "ml-text-primary", "mb-3");
    });

    it("should render features with bullet points", () => {
        render(<KeyFeatures features={mockFeatures} />);

        const featureItems = screen.getAllByRole("listitem");
        featureItems.forEach((item) => {
            const bullet = item.querySelector("span");
            expect(bullet).toHaveClass("w-1.5", "h-1.5", "bg-black", "rounded-full", "mt-1.5", "mr-2", "flex-shrink-0");
        });
    });

    it("should handle single feature", () => {
        const singleFeature = ["Pantalla Super AMOLED de 6.8 pulgadas"];

        render(<KeyFeatures features={singleFeature} />);

        expect(screen.getByText("Lo que tenés que saber de este producto")).toBeInTheDocument();
        expect(screen.getByText("Pantalla Super AMOLED de 6.8 pulgadas")).toBeInTheDocument();
    });

    it("should handle many features", () => {
        const manyFeatures = Array.from({ length: 10 }, (_, i) => `Feature ${i + 1}`);

        render(<KeyFeatures features={manyFeatures} />);

        expect(screen.getByText("Lo que tenés que saber de este producto")).toBeInTheDocument();
        expect(screen.getByText("Feature 1")).toBeInTheDocument();
        expect(screen.getByText("Feature 10")).toBeInTheDocument();
    });

    it("should render with proper container structure", () => {
        render(<KeyFeatures features={mockFeatures} />);

        const container = screen.getByText("Lo que tenés que saber de este producto").closest("div");
        expect(container).toHaveClass("mt-4");
    });

    it("should render features list with proper styling", () => {
        render(<KeyFeatures features={mockFeatures} />);

        const featuresList = screen.getByRole("list");
        expect(featuresList).toHaveClass("space-y-2", "mb-3");
    });

    it("should render ver características button", () => {
        render(<KeyFeatures features={mockFeatures} />);

        expect(screen.getByText("Ver características")).toBeInTheDocument();
    });

    it("should call expandAndScroll when clicking ver características button", () => {
        const mockExpandAndScroll = jest.fn();

        // Override the mock for this specific test
        mockUseSpecificationsExpansionStore.mockImplementation((selector) => {
            const state = {
                isExpanded: false,
                toggleExpansion: jest.fn(),
                expandAndScroll: mockExpandAndScroll,
            };
            return selector ? selector(state) : state.expandAndScroll;
        });

        render(<KeyFeatures features={mockFeatures} />);

        const button = screen.getByText("Ver características");
        fireEvent.click(button);

        expect(mockExpandAndScroll).toHaveBeenCalled();
    });

    it("should have proper button styling", () => {
        render(<KeyFeatures features={mockFeatures} />);

        const button = screen.getByText("Ver características");
        expect(button).toHaveClass("text-[14px]", "ml-link", "hover:underline");
    });

    it("should render all features in correct order", () => {
        render(<KeyFeatures features={mockFeatures} />);

        const featuresList = screen.getByRole("list");
        const featureTexts = Array.from(featuresList.children).map(item => item.textContent);

        expect(featureTexts[0]).toContain("Pantalla Super AMOLED de 6.8 pulgadas");
        expect(featureTexts[1]).toContain("Procesador Snapdragon 8 Gen 3");
        expect(featureTexts[2]).toContain("Cámara principal de 200MP");
        expect(featureTexts[3]).toContain("Batería de 5000 mAh");
        expect(featureTexts[4]).toContain("Resistencia al agua y al polvo (IP68)");
    });
});