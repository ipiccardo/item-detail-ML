import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "../../../src/components/ui/Breadcrumbs";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Home: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} data-testid="home-icon" />,
    ChevronRight: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} data-testid="chevron-right-icon" />,
}));

describe("Breadcrumbs", () => {
    it("should render breadcrumbs with items", () => {
        const items = ["Electronics", "Phones", "iPhone"];
        render(<Breadcrumbs items={items} />);

        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByTestId("home-icon")).toBeInTheDocument();
        expect(screen.getByText("Electronics")).toBeInTheDocument();
        expect(screen.getByText("Phones")).toBeInTheDocument();
        expect(screen.getByText("iPhone")).toBeInTheDocument();
    });

    it("should render chevron icons between items", () => {
        const items = ["Electronics", "Phones", "iPhone"];
        render(<Breadcrumbs items={items} />);

        const chevrons = screen.getAllByTestId("chevron-right-icon");
        expect(chevrons).toHaveLength(3); // One before each item
    });

    it("should apply correct styling to last item", () => {
        const items = ["Electronics", "Phones", "iPhone"];
        render(<Breadcrumbs items={items} />);

        const lastItem = screen.getByText("iPhone");
        expect(lastItem).toHaveClass("ml-text-primary", "font-medium");
    });

    it("should apply hover styling to non-last items", () => {
        const items = ["Electronics", "Phones", "iPhone"];
        render(<Breadcrumbs items={items} />);

        const firstItem = screen.getByText("Electronics");
        const secondItem = screen.getByText("Phones");

        expect(firstItem).toHaveClass("hover:text-blue-600", "cursor-pointer");
        expect(secondItem).toHaveClass("hover:text-blue-600", "cursor-pointer");
    });

    it("should apply custom className", () => {
        const items = ["Electronics", "Phones"];
        render(<Breadcrumbs items={items} className="custom-class" />);

        const nav = screen.getByRole("navigation");
        expect(nav).toHaveClass("custom-class");
    });

    it("should return null for empty items array", () => {
        const { container } = render(<Breadcrumbs items={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("should return null for null items", () => {
        const { container } = render(<Breadcrumbs items={null as unknown as string[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("should return null for undefined items", () => {
        const { container } = render(<Breadcrumbs items={undefined as unknown as string[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("should render single item correctly", () => {
        const items = ["Electronics"];
        render(<Breadcrumbs items={items} />);

        expect(screen.getByText("Electronics")).toBeInTheDocument();
        expect(screen.getByText("Electronics")).toHaveClass("ml-text-primary", "font-medium");

        const chevrons = screen.getAllByTestId("chevron-right-icon");
        expect(chevrons).toHaveLength(1);
    });

    it("should have proper accessibility attributes", () => {
        const items = ["Electronics", "Phones"];
        render(<Breadcrumbs items={items} />);

        const nav = screen.getByRole("navigation");
        expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
    });

    it("should render with default className when none provided", () => {
        const items = ["Electronics"];
        render(<Breadcrumbs items={items} />);

        const nav = screen.getByRole("navigation");
        expect(nav).toHaveClass("flex", "items-center", "space-x-1", "text-sm", "ml-text-secondary");
    });
});
