/* eslint-disable max-len */
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
        <div className="flex gap-4">
            {/* Thumbnail Gallery - Vertical on the left */}
            <div className="flex flex-col gap-2 w-16 ml-6">
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

            {/* Main Image */}
            <div className="flex-1 aspect-square bg-white rounded-md overflow-hidden relative border border-gray-200">
                <Image
                    src={images[selectedImage]}
                    alt={title}
                    fill
                    className="object-contain"
                    priority
                />
            </div>
        </div>
    );
}
