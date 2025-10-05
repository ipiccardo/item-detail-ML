import { render, screen } from "@testing-library/react";
import { FooterContent } from "../../../src/components/ui/FooterContent";
import { FooterData } from "../../../src/types/footer";

const mockFooterData: FooterData = {
    sections: [
        {
            title: "Test Section 1",
            links: [
                { text: "Link 1", href: "/link1" },
                { text: "Link 2", href: "/link2" },
            ],
        },
        {
            title: "Test Section 2",
            links: [
                { text: "Link 3", href: "/link3" },
                { text: "Link 4", href: "/link4" },
            ],
        },
    ],
    alwaysVisibleLinks: [
        { text: "Always Visible Link 1", href: "/always1" },
        { text: "Always Visible Link 2", href: "/always2" },
    ],
    secondaryLinks: [
        { text: "Secondary Link 1", href: "/secondary1" },
        { text: "Secondary Link 2", href: "/secondary2" },
    ],
    copyright: "Copyright © 2024 Test Company",
    address: "Test Address 123",
};

describe("FooterContent", () => {
    it("should render all sections", () => {
        render(<FooterContent data={mockFooterData} />);

        expect(screen.getByText("Test Section 1")).toBeInTheDocument();
        expect(screen.getByText("Test Section 2")).toBeInTheDocument();
    });

    it("should render all section links", () => {
        render(<FooterContent data={mockFooterData} />);

        expect(screen.getByText("Link 1")).toBeInTheDocument();
        expect(screen.getByText("Link 2")).toBeInTheDocument();
        expect(screen.getByText("Link 3")).toBeInTheDocument();
        expect(screen.getByText("Link 4")).toBeInTheDocument();
    });

    it("should not render always visible links (they are in separate component)", () => {
        render(<FooterContent data={mockFooterData} />);

        expect(screen.queryByText("Always Visible Link 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Always Visible Link 2")).not.toBeInTheDocument();
    });

    it("should not render secondary links (they are in separate component)", () => {
        render(<FooterContent data={mockFooterData} />);

        expect(screen.queryByText("Secondary Link 1")).not.toBeInTheDocument();
        expect(screen.queryByText("Secondary Link 2")).not.toBeInTheDocument();
    });

    it("should not render copyright and address (they are in separate component)", () => {
        render(<FooterContent data={mockFooterData} />);

        expect(screen.queryByText("Copyright © 2024 Test Company")).not.toBeInTheDocument();
        expect(screen.queryByText("Test Address 123")).not.toBeInTheDocument();
    });

    it("should apply custom className", () => {
        render(<FooterContent data={mockFooterData} className="custom-class" />);

        const content = screen.getByText("Test Section 1").closest(".bg-white");
        expect(content).toHaveClass("custom-class");
    });

    it("should have proper responsive grid layout", () => {
        render(<FooterContent data={mockFooterData} />);

        const grid = screen.getByText("Test Section 1").closest(".grid");
        expect(grid).toHaveClass("grid-cols-2", "md:grid-cols-4", "lg:grid-cols-7");
    });

    it("should not have separator line (removed from this component)", () => {
        render(<FooterContent data={mockFooterData} />);

        expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    });
});
