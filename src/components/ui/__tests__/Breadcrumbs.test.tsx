import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "../Breadcrumbs";

describe("Breadcrumbs", () => {
    it("should render breadcrumbs with home icon", () => {
        const items = ["Category", "Subcategory", "Product"];
        render(<Breadcrumbs items={items} />);

        expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
        expect(screen.getByText("Category")).toBeInTheDocument();
        expect(screen.getByText("Subcategory")).toBeInTheDocument();
        expect(screen.getByText("Product")).toBeInTheDocument();
    });

    it("should not render if items array is empty", () => {
        const { container } = render(<Breadcrumbs items={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("should not render if items is undefined", () => {
        const { container } = render(<Breadcrumbs items={undefined as unknown as string[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("should apply custom className", () => {
        const items = ["Category", "Product"];
        const { container } = render(<Breadcrumbs items={items} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should highlight last item", () => {
        const items = ["Category", "Subcategory", "Product"];
        render(<Breadcrumbs items={items} />);

        const lastItem = screen.getByText("Product");
        expect(lastItem).toHaveClass("text-gray-900", "font-medium");
    });

    it("should make non-last items clickable", () => {
        const items = ["Category", "Subcategory", "Product"];
        render(<Breadcrumbs items={items} />);

        const firstItem = screen.getByText("Category");
        const secondItem = screen.getByText("Subcategory");

        expect(firstItem).toHaveClass("hover:text-blue-600", "cursor-pointer");
        expect(secondItem).toHaveClass("hover:text-blue-600", "cursor-pointer");
    });
});
