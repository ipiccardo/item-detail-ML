import { render, screen, fireEvent } from "@testing-library/react";
import { DetailedSpecifications } from "../../src/components/ui/DetailedSpecifications";
import { useSpecificationsExpansionStore } from "../../src/stores/specificationsExpansionStore";

// Mock the Zustand store
jest.mock("../../src/stores/specificationsExpansionStore", () => ({
    useSpecificationsExpansionStore: jest.fn(),
}));

const mockUseSpecificationsExpansionStore = useSpecificationsExpansionStore as jest.MockedFunction<typeof useSpecificationsExpansionStore>;

describe("DetailedSpecifications", () => {
    beforeEach(() => {
        // Default mock implementation
        mockUseSpecificationsExpansionStore.mockImplementation((selector) => {
            const state = {
                isExpanded: false,
                toggleExpansion: jest.fn(),
                expandAndScroll: jest.fn(),
            };
            return selector ? selector(state) : state.isExpanded;
        });
    });

    it("should not render detailed specifications when collapsed", () => {
        render(<DetailedSpecifications />);

        expect(screen.queryByText("Ver menos características")).not.toBeInTheDocument();
        expect(screen.getByText("Ver todas las características")).toBeInTheDocument();
    });

    it("should render detailed specifications when expanded", () => {
        // Mock expanded state
        mockUseSpecificationsExpansionStore.mockImplementation((selector) => {
            const state = {
                isExpanded: true,
                toggleExpansion: jest.fn(),
                expandAndScroll: jest.fn(),
            };
            return selector ? selector(state) : state.isExpanded;
        });

        render(<DetailedSpecifications />);

        expect(screen.getByText("Ver menos características")).toBeInTheDocument();
        expect(screen.queryByText("Ver todas las características")).not.toBeInTheDocument();
    });

    it("should call toggleExpansion when button is clicked", () => {
        const mockToggleExpansion = jest.fn();

        // Mock with toggle function
        mockUseSpecificationsExpansionStore.mockImplementation((selector) => {
            const state = {
                isExpanded: false,
                toggleExpansion: mockToggleExpansion,
                expandAndScroll: jest.fn(),
            };
            return selector ? selector(state) : state.toggleExpansion;
        });

        render(<DetailedSpecifications />);

        const button = screen.getByText("Ver todas las características");
        fireEvent.click(button);

        expect(mockToggleExpansion).toHaveBeenCalled();
    });

    it("should have proper button styling", () => {
        render(<DetailedSpecifications />);

        const button = screen.getByText("Ver todas las características");
        expect(button).toHaveClass("flex", "items-center", "gap-1", "text-sm", "text-blue-600", "hover:underline", "mt-4");
    });

    it("should render specifications sections when expanded", () => {
        // Mock expanded state
        mockUseSpecificationsExpansionStore.mockImplementation((selector) => {
            const state = {
                isExpanded: true,
                toggleExpansion: jest.fn(),
                expandAndScroll: jest.fn(),
            };
            return selector ? selector(state) : state.isExpanded;
        });

        render(<DetailedSpecifications />);

        // Check for some key specifications sections
        expect(screen.getByText("Características generales")).toBeInTheDocument();
        expect(screen.getByText("Sistema operativo")).toBeInTheDocument();
        expect(screen.getByText("Cámara")).toBeInTheDocument();
        expect(screen.getByText("Batería")).toBeInTheDocument();
        expect(screen.getByText("Conectividad")).toBeInTheDocument();
    });

    it("should have proper container styling", () => {
        render(<DetailedSpecifications />);

        const container = screen.getByText("Especificaciones del producto").closest("div");
        expect(container).toHaveAttribute("id", "detailed-specifications");
    });

    it("should render specification items with proper structure", () => {
        // Mock expanded state
        mockUseSpecificationsExpansionStore.mockImplementation((selector) => {
            const state = {
                isExpanded: true,
                toggleExpansion: jest.fn(),
                expandAndScroll: jest.fn(),
            };
            return selector ? selector(state) : state.isExpanded;
        });

        render(<DetailedSpecifications />);

        // Check for some specific specification items
        expect(screen.getByText("Marca")).toBeInTheDocument();
        expect(screen.getByText("Samsung")).toBeInTheDocument();
        expect(screen.getByText("Modelo")).toBeInTheDocument();
        expect(screen.getByText("Samsung Galaxy A26")).toBeInTheDocument();
    });

    it("should handle empty specifications gracefully", () => {
        render(<DetailedSpecifications />);

        // Should still render the title and button
        expect(screen.getByText("Especificaciones del producto")).toBeInTheDocument();
        expect(screen.getByText("Ver todas las características")).toBeInTheDocument();
    });

    it("should render with custom className", () => {
        const customClass = "custom-class";
        render(<DetailedSpecifications className={customClass} />);

        const container = screen.getByText("Especificaciones del producto").closest("div");
        expect(container).toHaveClass(customClass);
    });

    it("should toggle between expanded and collapsed states", () => {
        let isExpanded = false;
        const mockToggleExpansion = jest.fn(() => {
            isExpanded = !isExpanded;
        });

        mockUseSpecificationsExpansionStore.mockImplementation((selector) => {
            const state = {
                isExpanded,
                toggleExpansion: mockToggleExpansion,
                expandAndScroll: jest.fn(),
            };
            return selector ? selector(state) : state.toggleExpansion;
        });

        const { rerender } = render(<DetailedSpecifications />);

        // Initially collapsed
        expect(screen.getByText("Ver todas las características")).toBeInTheDocument();
        expect(screen.queryByText("Ver menos características")).not.toBeInTheDocument();

        // Click to expand
        fireEvent.click(screen.getByText("Ver todas las características"));
        expect(mockToggleExpansion).toHaveBeenCalled();

        // Re-render with expanded state
        mockUseSpecificationsExpansionStore.mockImplementation((selector) => {
            const state = {
                isExpanded: true,
                toggleExpansion: mockToggleExpansion,
                expandAndScroll: jest.fn(),
            };
            return selector ? selector(state) : state.isExpanded;
        });

        rerender(<DetailedSpecifications />);

        expect(screen.getByText("Ver menos características")).toBeInTheDocument();
        expect(screen.queryByText("Ver todas las características")).not.toBeInTheDocument();
    });
});