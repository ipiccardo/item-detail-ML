import { useState } from "react";

export function useImageGallery(images: string[]): {
  selectedImage: number;
  selectImage: (index: number) => void;
  nextImage: () => void;
  prevImage: () => void;
} {
  const [selectedImage, setSelectedImage] = useState(0);

  const selectImage = (index: number): void => {
    if (index >= 0 && index < images.length) {
      setSelectedImage(index);
    }
  };

  const nextImage = (): void => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (): void => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return {
    selectedImage,
    selectImage,
    nextImage,
    prevImage,
  };
}
