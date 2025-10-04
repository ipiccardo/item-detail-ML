import { renderHook, act } from "@testing-library/react";
import { useImageGallery } from "../../src/hooks/useImageGallery";

describe("useImageGallery", () => {
  const mockImages = ["image1.jpg", "image2.jpg", "image3.jpg"];

  it("should initialize with first image selected", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    expect(result.current.selectedImage).toBe(0);
  });

  it("should select image by index", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.selectImage(1);
    });

    expect(result.current.selectedImage).toBe(1);
  });

  it("should not select image with invalid index (negative)", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.selectImage(-1);
    });

    expect(result.current.selectedImage).toBe(0);
  });

  it("should not select image with invalid index (out of bounds)", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.selectImage(10);
    });

    expect(result.current.selectedImage).toBe(0);
  });

  it("should go to next image", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.nextImage();
    });

    expect(result.current.selectedImage).toBe(1);
  });

  it("should cycle to first image when going next from last", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    // Go to last image
    act(() => {
      result.current.selectImage(2);
    });

    // Go to next (should cycle to first)
    act(() => {
      result.current.nextImage();
    });

    expect(result.current.selectedImage).toBe(0);
  });

  it("should go to previous image", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    // Go to second image first
    act(() => {
      result.current.selectImage(1);
    });

    act(() => {
      result.current.prevImage();
    });

    expect(result.current.selectedImage).toBe(0);
  });

  it("should cycle to last image when going previous from first", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.prevImage();
    });

    expect(result.current.selectedImage).toBe(2);
  });

  it("should handle empty images array", () => {
    const { result } = renderHook(() => useImageGallery([]));

    expect(result.current.selectedImage).toBe(0);

    act(() => {
      result.current.nextImage();
    });

    expect(result.current.selectedImage).toBe(0);

    act(() => {
      result.current.prevImage();
    });

    expect(result.current.selectedImage).toBe(0);
  });

  it("should handle single image", () => {
    const { result } = renderHook(() => useImageGallery(["single.jpg"]));

    expect(result.current.selectedImage).toBe(0);

    act(() => {
      result.current.nextImage();
    });

    expect(result.current.selectedImage).toBe(0);

    act(() => {
      result.current.prevImage();
    });

    expect(result.current.selectedImage).toBe(0);
  });
});
