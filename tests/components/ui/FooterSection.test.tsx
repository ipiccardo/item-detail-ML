import { render, screen } from "@testing-library/react";
import { FooterSection } from "../../../src/components/ui/FooterSection";
import { FooterSection as FooterSectionType } from "../../../src/types/footer";

const mockSection: FooterSectionType = {
    title: "Test Section",
    links: [
        { text: "Link 1", href: "/link1" },
        { text: "Link 2", href: "/link2" },
        { text: "Link 3", href: "/link3" },
    ],
};

describe("FooterSection", () => {
    it("should render section title", () => {
        render(<FooterSection section={mockSection} />);

        expect(screen.getByText("Test Section")).toBeInTheDocument();
        expect(screen.getByText("Test Section")).toHaveClass("font-semibold");
    });

    it("should render all section links", () => {
        render(<FooterSection section={mockSection} />);

        expect(screen.getByText("Link 1")).toBeInTheDocument();
        expect(screen.getByText("Link 2")).toBeInTheDocument();
        expect(screen.getByText("Link 3")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
        render(<FooterSection section={mockSection} className="custom-class" />);

        const section = screen.getByText("Test Section").closest("div");
        expect(section).toHaveClass("custom-class");
    });

    it("should handle empty links array", () => {
        const emptySection: FooterSectionType = {
            title: "Empty Section",
            links: [],
        };

        render(<FooterSection section={emptySection} />);

        expect(screen.getByText("Empty Section")).toBeInTheDocument();
        expect(screen.queryByText("Link")).not.toBeInTheDocument();
    });

    it("should have proper flex layout", () => {
        render(<FooterSection section={mockSection} />);

        const section = screen.getByText("Test Section").closest("div");
        expect(section).toHaveClass("flex", "flex-col", "space-y-2");
    });
});
