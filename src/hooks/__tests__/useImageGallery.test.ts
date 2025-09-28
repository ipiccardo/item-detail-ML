import { renderHook, act } from "@testing-library/react";
import { useImageGallery } from "../useImageGallery";

describe("useImageGallery", () => {
  const mockImages = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];

  it("should initialize with first image selected", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    expect(result.current.selectedImage).toBe(0);
  });

  it("should select specific image", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.selectImage(2);
    });

    expect(result.current.selectedImage).toBe(2);
  });

  it("should not select image outside valid range", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.selectImage(10); // Out of range
    });

    expect(result.current.selectedImage).toBe(0); // Should remain unchanged
  });

  it("should not select negative index", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.selectImage(-1);
    });

    expect(result.current.selectedImage).toBe(0); // Should remain unchanged
  });

  it("should go to next image", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.nextImage();
    });

    expect(result.current.selectedImage).toBe(1);
  });

  it("should wrap to first image when going next from last", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.selectImage(3); // Last image
      result.current.nextImage();
    });

    expect(result.current.selectedImage).toBe(0);
  });

  it("should go to previous image", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.selectImage(2);
      result.current.prevImage();
    });

    expect(result.current.selectedImage).toBe(1);
  });

  it("should wrap to last image when going prev from first", () => {
    const { result } = renderHook(() => useImageGallery(mockImages));

    act(() => {
      result.current.prevImage();
    });

    expect(result.current.selectedImage).toBe(3); // Last image
  });

  it("should handle empty images array", () => {
    const { result } = renderHook(() => useImageGallery([]));

    expect(result.current.selectedImage).toBe(0);

    act(() => {
      result.current.nextImage();
      result.current.prevImage();
    });

    expect(result.current.selectedImage).toBe(0);
  });
});
