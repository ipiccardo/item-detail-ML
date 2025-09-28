import { render, screen, fireEvent } from "@testing-library/react";
import ImageGallery from "../ImageGallery";
import { JSX } from "react";

// Mock Next.js Image component
jest.mock("next/image", () => {
    return function MockImage({ src, alt, ...props }: {
        src: string;
        alt: string;
        [key: string]: unknown;
    }): JSX.Element {
        // Filter out Next.js specific props that cause warnings
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { fill, priority, ...restProps } = props as Record<string, unknown>;
        return <img src={src} alt={alt} {...restProps} />;
    };
});

describe("ImageGallery", () => {
    const mockImages = ["/1.png", "/2.png", "/3.png", "/4.png"];
    const mockTitle = "Test Product";

    it("should render the main image", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const mainImage = screen.getByAltText(mockTitle);
        expect(mainImage).toBeInTheDocument();
        expect(mainImage).toHaveAttribute("src", "/1.png");
    });

    it("should render thumbnail images", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        mockImages.forEach((image, index) => {
            const thumbnail = screen.getByAltText(`${mockTitle} ${index + 1}`);
            expect(thumbnail).toBeInTheDocument();
            expect(thumbnail).toHaveAttribute("src", image);
        });
    });

    it("should change main image when thumbnail is clicked", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const mainImage = screen.getByAltText(mockTitle);
        const secondThumbnail = screen.getByAltText(`${mockTitle} 2`);

        expect(mainImage).toHaveAttribute("src", "/1.png");

        fireEvent.click(secondThumbnail);

        expect(mainImage).toHaveAttribute("src", "/2.png");
    });

    it("should highlight selected thumbnail", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const firstThumbnail = screen.getByAltText(`${mockTitle} 1`).closest("button");
        const secondThumbnail = screen.getByAltText(`${mockTitle} 2`).closest("button");

        expect(firstThumbnail).toBeInTheDocument();
        expect(secondThumbnail).toBeInTheDocument();
        expect(firstThumbnail).toHaveClass("border-blue-500");
        expect(secondThumbnail).toHaveClass("border-gray-200");
        expect(secondThumbnail).toBeInTheDocument();
        fireEvent.click(secondThumbnail as HTMLElement);

        expect(firstThumbnail).toHaveClass("border-gray-200");
        expect(secondThumbnail).toHaveClass("border-blue-500");
    });

    it("should handle empty images array", () => {
        render(<ImageGallery images={[]} title={mockTitle} />);

        const mainImage = screen.getByAltText(mockTitle);
        expect(mainImage).toBeInTheDocument();
    });
});
