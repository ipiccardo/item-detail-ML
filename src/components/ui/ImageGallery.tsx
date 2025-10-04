/* eslint-disable quotes */
/* eslint-disable max-len */
"use client";

import { JSX, useRef, useEffect } from "react";
import Image from "next/image";
import { useImageGallery } from "@/hooks/useImageGallery";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps): JSX.Element {
    const { selectedImage, selectImage } = useImageGallery(images);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    // Handle wheel scroll for desktop
    const handleWheel = (e: WheelEvent): void => {
        e.preventDefault();
        if (e.deltaY > 0) {
            // Scroll down - next image
            const nextIndex = (selectedImage + 1) % images.length;
            selectImage(nextIndex);
        } else {
            // Scroll up - previous image
            const prevIndex = selectedImage === 0 ? images.length - 1 : selectedImage - 1;
            selectImage(prevIndex);
        }
    };

    // Handle touch events for mobile
    const handleTouchStart = (e: React.TouchEvent): void => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent): void => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = (): void => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            // Swipe left - next image
            const nextIndex = (selectedImage + 1) % images.length;
            selectImage(nextIndex);
        } else if (isRightSwipe) {
            // Swipe right - previous image
            const prevIndex = selectedImage === 0 ? images.length - 1 : selectedImage - 1;
            selectImage(prevIndex);
        }
    };

    // Add wheel event listener for desktop
    useEffect(() => {
        const container = imageContainerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false });
            return () => {
                container.removeEventListener('wheel', handleWheel);
            };
        }
    }, [selectedImage, images.length, selectImage]);

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Main Image */}
            <div
                ref={imageContainerRef}
                className="flex-1 aspect-square bg-white lg:rounded-md overflow-hidden relative order-1 lg:order-2 cursor-pointer"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <Image
                    src={images[selectedImage]}
                    alt={title}
                    fill
                    className="object-contain p-4 lg:p-0"
                    priority
                />

                {/* Mobile: Image counter - Top Left */}
                <div className="lg:hidden absolute top-2 left-2 bg-black bg-opacity-60 px-2 py-0.5 rounded text-xs font-normal text-white">
                    {selectedImage + 1} / {images.length}
                </div>

                {/* Mobile: Action Icons - Top Right */}
                <div className="lg:hidden absolute top-2 right-2 flex flex-col gap-2">
                    <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Dot Indicators - Mobile only - Below image */}
            <div className="flex justify-center gap-1.5 py-3 lg:hidden order-2 bg-white">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedImage === index ? "bg-blue-500" : "bg-gray-400"
                            }`}
                        aria-label={`Ver imagen ${index + 1}`}
                    />
                ))}
            </div>

            {/* Thumbnail Gallery - Desktop only, Vertical on the left */}
            <div className="hidden lg:flex lg:flex-col gap-2 lg:w-16 lg:ml-6 order-1">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`aspect-square bg-white rounded-md overflow-hidden border-2 relative hover:border-blue-400 transition-colors ${selectedImage === index ? "border-blue-500" : "border-gray-300"
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`${title} ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
