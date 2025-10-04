/* eslint-disable quotes */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render, screen, fireEvent } from "@testing-library/react";
import { JSX } from "react";
import ImageGallery from "../../src/components/ui/ImageGallery";

const mockImages = [
    "/images/samsung-s24-1.jpg",
    "/images/samsung-s24-2.jpg",
    "/images/samsung-s24-3.jpg",
    "/images/samsung-s24-4.jpg",
];

const mockTitle = "Samsung Galaxy S24 Ultra 256GB";

// Mock next/image
jest.mock("next/image", () => ({
    __esModule: true,
    default: ({ src, alt, ...props }: { src: string; alt: string;[key: string]: unknown }): JSX.Element => (
        <img src={src} alt={alt} {...props} />
    ),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Heart: (props: React.SVGProps<SVGSVGElement>): JSX.Element => <svg {...props} data-testid="heart-icon" />,
    Share2: (props: React.SVGProps<SVGSVGElement>): JSX.Element => <svg {...props} data-testid="share-icon" />,
    ChevronLeft: (props: React.SVGProps<SVGSVGElement>): JSX.Element =>
        <svg {...props} data-testid="chevron-left-icon" />,
    ChevronRight: (props: React.SVGProps<SVGSVGElement>): JSX.Element =>
        <svg {...props} data-testid="chevron-right-icon" />,
}));

describe("ImageGallery", () => {
    it("should render main product image", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const mainImage = screen.getByAltText(mockTitle);
        expect(mainImage).toBeInTheDocument();
        expect(mainImage).toHaveAttribute("src", "/images/samsung-s24-1.jpg");
    });

    it("should render thumbnail images", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        mockImages.forEach((image, index) => {
            const thumbnail = screen.getByAltText(`${mockTitle} ${index + 1}`);
            expect(thumbnail).toBeInTheDocument();
        });
    });

    it("should have proper container structure", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const container = screen.getByAltText(mockTitle).closest("div");
        expect(container).toHaveClass("flex-1", "aspect-square", "bg-white");
    });

    it("should handle empty images array", () => {
        render(<ImageGallery images={[]} title={mockTitle} />);

        // Should still render the container
        const container = screen.getByAltText(mockTitle).closest("div");
        expect(container).toBeInTheDocument();
    });

    it("should change main image when thumbnail is clicked", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const secondThumbnail = screen.getByAltText(`${mockTitle} 2`);
        fireEvent.click(secondThumbnail);

        const mainImage = screen.getByAltText(mockTitle);
        expect(mainImage).toHaveAttribute("src", "/images/samsung-s24-2.jpg");
    });

    it("should have proper responsive styling", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const container = screen.getByAltText(mockTitle).closest("div");
        expect(container).toHaveClass("flex-1", "aspect-square", "bg-white");
    });

    it("should render main image with proper styling", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const mainImage = screen.getByAltText(mockTitle);
        expect(mainImage).toHaveClass("object-contain");
    });

    it("should render thumbnails with proper styling", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        // Get only the thumbnail buttons (not the action buttons or dot indicators)
        const thumbnails = screen.getAllByRole("button").filter(button =>
            button.getAttribute("class")?.includes("aspect-square"),
        );

        thumbnails.forEach((thumbnail) => {
            expect(thumbnail).toHaveClass("aspect-square", "bg-white", "rounded-md", "overflow-hidden", "border-2");
        });
    });

    it("should highlight selected thumbnail", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const firstThumbnail = screen.getByAltText(`${mockTitle} 1`).closest("button");
        expect(firstThumbnail).toHaveClass("border-blue-500");
    });

    it("should render image counter", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        expect(screen.getByText("1 / 4")).toBeInTheDocument();
    });

    it("should update image counter when thumbnail is clicked", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const secondThumbnail = screen.getByAltText(`${mockTitle} 2`);
        fireEvent.click(secondThumbnail);

        expect(screen.getByText("2 / 4")).toBeInTheDocument();
    });

    it("should render dot indicators", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const dots = screen.getAllByRole("button");
        const dotButtons = dots.filter(button =>
            button.getAttribute("aria-label")?.includes("Ver imagen"),
        );
        expect(dotButtons).toHaveLength(4);
    });

    it("should highlight active dot", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        const dots = screen.getAllByRole("button");
        const dotButtons = dots.filter(button =>
            button.getAttribute("aria-label")?.includes("Ver imagen"),
        );
        expect(dotButtons[0]).toHaveClass("bg-blue-500");
        expect(dotButtons[1]).toHaveClass("bg-gray-400");
    });

    it("should handle single image", () => {
        const singleImage = ["/images/samsung-s24-1.jpg"];

        render(<ImageGallery images={singleImage} title={mockTitle} />);

        expect(screen.getByText("1 / 1")).toBeInTheDocument();
    });

    it("should render action buttons", () => {
        render(<ImageGallery images={mockImages} title={mockTitle} />);

        // The action buttons are hardcoded SVGs in the component
        const actionButtons = screen.getAllByRole("button").filter(button =>
            button.getAttribute("class")?.includes("w-9 h-9 bg-white rounded-full"),
        );

        expect(actionButtons).toHaveLength(2);
    });

    describe("Touch Swipe functionality", () => {
        // Note: Wheel scroll functionality has been disabled as requested

        it("should handle touch swipe for next image", () => {
            render(<ImageGallery images={mockImages} title={mockTitle} />);

            const imageContainer = screen.getByAltText(mockTitle).closest("div");

            // Simulate swipe left (next image)
            fireEvent.touchStart(imageContainer!, {
                targetTouches: [{ clientX: 200 }],
            });
            fireEvent.touchMove(imageContainer!, {
                targetTouches: [{ clientX: 100 }],
            });
            fireEvent.touchEnd(imageContainer!);

            // Should show second image
            expect(screen.getByText("2 / 4")).toBeInTheDocument();
        });

        it("should handle touch swipe for previous image", () => {
            render(<ImageGallery images={mockImages} title={mockTitle} />);

            const imageContainer = screen.getByAltText(mockTitle).closest("div");

            // First go to second image
            fireEvent.touchStart(imageContainer!, {
                targetTouches: [{ clientX: 200 }],
            });
            fireEvent.touchMove(imageContainer!, {
                targetTouches: [{ clientX: 100 }],
            });
            fireEvent.touchEnd(imageContainer!);
            expect(screen.getByText("2 / 4")).toBeInTheDocument();

            // Then swipe right (previous image)
            fireEvent.touchStart(imageContainer!, {
                targetTouches: [{ clientX: 100 }],
            });
            fireEvent.touchMove(imageContainer!, {
                targetTouches: [{ clientX: 200 }],
            });
            fireEvent.touchEnd(imageContainer!);

            // Should show first image
            expect(screen.getByText("1 / 4")).toBeInTheDocument();
        });

        it("should cycle through images using dot navigation", () => {
            render(<ImageGallery images={mockImages} title={mockTitle} />);

            // Go to last image using dots
            const dots = screen.getAllByRole("button").filter(button =>
                button.getAttribute("aria-label")?.includes("Ver imagen 4"),
            );
            fireEvent.click(dots[0]);
            expect(screen.getByText("4 / 4")).toBeInTheDocument();

            // Go back to first image using dots
            const firstDot = screen.getAllByRole("button").filter(button =>
                button.getAttribute("aria-label")?.includes("Ver imagen 1"),
            );
            fireEvent.click(firstDot[0]);
            expect(screen.getByText("1 / 4")).toBeInTheDocument();
        });
    });

    describe("Image Viewer on Hover", () => {
        it("should show image viewer on mouse enter", () => {
            render(<ImageGallery images={mockImages} title={mockTitle} />);

            const imageContainer = screen.getByAltText(mockTitle).closest("div");

            // Simulate mouse enter
            fireEvent.mouseEnter(imageContainer!);

            // Should show the image viewer (now using background image)
            const magnifier = document.querySelector('.fixed.bg-white.border.border-gray-200');
            expect(magnifier).toBeInTheDocument();
        });

        it("should hide image viewer on mouse leave", () => {
            render(<ImageGallery images={mockImages} title={mockTitle} />);

            const imageContainer = screen.getByAltText(mockTitle).closest("div");

            // Simulate mouse enter and then leave
            fireEvent.mouseEnter(imageContainer!);
            fireEvent.mouseLeave(imageContainer!);

            // Should not show the image viewer
            const magnifier = document.querySelector('.fixed.bg-white.border.border-gray-200');
            expect(magnifier).not.toBeInTheDocument();
        });

        it("should update image viewer position on mouse move", () => {
            render(<ImageGallery images={mockImages} title={mockTitle} />);

            const imageContainer = screen.getByAltText(mockTitle).closest("div");

            // Simulate mouse enter and move
            fireEvent.mouseEnter(imageContainer!);
            fireEvent.mouseMove(imageContainer!, { clientX: 100, clientY: 200 });

            // Should show the image viewer with updated position
            const magnifier = document.querySelector('.fixed.bg-white.border.border-gray-200');
            expect(magnifier).toBeInTheDocument();
        });

        it("should only show image viewer on desktop", () => {
            render(<ImageGallery images={mockImages} title={mockTitle} />);

            const imageContainer = screen.getByAltText(mockTitle).closest("div");

            // Simulate mouse enter
            fireEvent.mouseEnter(imageContainer!);

            // Should show the image viewer with desktop-only classes
            const magnifier = document.querySelector('.fixed.bg-white.border.border-gray-200');
            expect(magnifier).toHaveClass("hidden", "lg:block");
        });
    });
});
