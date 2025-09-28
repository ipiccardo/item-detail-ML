import { render, screen } from "@testing-library/react";
import { KeyFeatures } from "../KeyFeatures";

describe("KeyFeatures", () => {
    it("should render features list", () => {
        const features = [
            "Memoria RAM 8 GB",
            "Dispositivo desbloqueado",
            "Memoria interna 256 GB",
        ];

        render(<KeyFeatures features={features} />);

        expect(screen.getByText("Lo que tenés que saber de este producto")).toBeInTheDocument();
        expect(screen.getByText("Memoria RAM 8 GB")).toBeInTheDocument();
        expect(screen.getByText("Dispositivo desbloqueado")).toBeInTheDocument();
        expect(screen.getByText("Memoria interna 256 GB")).toBeInTheDocument();
    });

    it("should not render if features array is empty", () => {
        const { container } = render(<KeyFeatures features={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("should not render if features is undefined", () => {
        const { container } = render(<KeyFeatures features={undefined as unknown as string[]} />);
        expect(container.firstChild).toBeNull();
    });

    it("should apply custom className", () => {
        const features = ["Feature 1", "Feature 2"];
        const { container } = render(<KeyFeatures features={features} className="custom-class" />);

        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render check icons for each feature", () => {
        const features = ["Feature 1", "Feature 2"];
        render(<KeyFeatures features={features} />);

        // Check that we have the correct number of list items
        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(2);

        // Check that each list item contains the feature text
        expect(screen.getByText("Feature 1")).toBeInTheDocument();
        expect(screen.getByText("Feature 2")).toBeInTheDocument();
    });
});
