import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "../useFavorites";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useFavorites", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockClear();
  });

  it("should initialize with empty favorites", () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should load favorites from localStorage", () => {
    const mockFavorites = [
      { id: "1", addedAt: "2023-01-01T00:00:00.000Z" },
      { id: "2", addedAt: "2023-01-02T00:00:00.000Z" },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFavorites));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toHaveLength(2);
    expect(result.current.favorites[0].id).toBe("1");
    expect(result.current.favorites[1].id).toBe("2");
  });

  it("should add product to favorites", () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addToFavorites("product1");
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe("product1");
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it("should remove product from favorites", () => {
    const mockFavorites = [{ id: "product1", addedAt: new Date() }];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFavorites));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.removeFromFavorites("product1");
    });

    expect(result.current.favorites).toHaveLength(0);
  });

  it("should toggle favorite status", () => {
    const { result } = renderHook(() => useFavorites());

    // Add to favorites
    act(() => {
      result.current.toggleFavorite("product1");
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.isFavorite("product1")).toBe(true);

    // Remove from favorites
    act(() => {
      result.current.toggleFavorite("product1");
    });

    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.isFavorite("product1")).toBe(false);
  });

  it("should clear all favorites", () => {
    const mockFavorites = [
      { id: "product1", addedAt: new Date() },
      { id: "product2", addedAt: new Date() },
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFavorites));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.clearFavorites();
    });

    expect(result.current.favorites).toHaveLength(0);
  });
});
