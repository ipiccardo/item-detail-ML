"use client";

import { JSX } from "react";
import Image from "next/image";
import { useImageGallery } from "@/hooks/useImageGallery";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps): JSX.Element {
    const { selectedImage, selectImage } = useImageGallery(images);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                <Image
                    src={images[selectedImage]}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => selectImage(index)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden
              border-2 relative ${selectedImage === index ? "border-blue-500" : "border-gray-200"}`}
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
