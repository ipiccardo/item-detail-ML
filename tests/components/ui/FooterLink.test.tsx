import { render, screen } from "@testing-library/react";
import { FooterLink } from "../../../src/components/ui/FooterLink";
import { FooterLink as FooterLinkType } from "../../../src/types/footer";

const mockLink: FooterLinkType = {
    text: "Test Link",
    href: "/test-link",
};

describe("FooterLink", () => {
    it("should render static text with correct content", () => {
        render(<FooterLink link={mockLink} />);

        const text = screen.getByText("Test Link");
        expect(text).toBeInTheDocument();
        expect(text).toHaveTextContent("Test Link");
    });

    it("should apply custom className", () => {
        render(<FooterLink link={mockLink} className="custom-class" />);

        const text = screen.getByText("Test Link");
        expect(text).toHaveClass("custom-class");
    });

    it("should render with different link data", () => {
        const differentLink: FooterLinkType = {
            text: "Different Link",
            href: "/different-href",
        };

        render(<FooterLink link={differentLink} />);

        const text = screen.getByText("Different Link");
        expect(text).toHaveTextContent("Different Link");
    });
});
