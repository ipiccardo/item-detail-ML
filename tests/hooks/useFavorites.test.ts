import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "../../src/hooks/useFavorites";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useFavorites", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it("should initialize with empty favorites and loading state", async () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for useEffect to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should load favorites from localStorage on mount", () => {
    const storedFavorites = [
      { id: "1", addedAt: "2023-01-01T00:00:00.000Z" },
      { id: "2", addedAt: "2023-01-02T00:00:00.000Z" },
    ];
    localStorageMock.setItem("meli_favorites", JSON.stringify(storedFavorites));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toHaveLength(2);
    expect(result.current.favorites[0].id).toBe("1");
    expect(result.current.favorites[0].addedAt).toBeInstanceOf(Date);
    expect(result.current.favorites[1].id).toBe("2");
    expect(result.current.favorites[1].addedAt).toBeInstanceOf(Date);
    expect(result.current.isLoading).toBe(false);
    expect(localStorageMock.getItem).toHaveBeenCalledWith("meli_favorites");
  });

  it("should handle localStorage parsing error", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    localStorageMock.setItem("meli_favorites", "invalid json");

    const { result } = renderHook(() => useFavorites());

    expect(result.current.error).toBe("Error al cargar favoritos");
    expect(result.current.favorites).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should add product to favorites", async () => {
    const { result } = renderHook(() => useFavorites());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToFavorites("1");
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe("1");
    expect(result.current.favorites[0].addedAt).toBeInstanceOf(Date);
  });

  it("should not add duplicate product to favorites", async () => {
    const { result } = renderHook(() => useFavorites());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToFavorites("1");
      result.current.addToFavorites("1");
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe("1");
  });

  it("should remove product from favorites", async () => {
    const { result } = renderHook(() => useFavorites());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToFavorites("1");
      result.current.addToFavorites("2");
    });

    expect(result.current.favorites).toHaveLength(2);

    act(() => {
      result.current.removeFromFavorites("1");
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe("2");
  });

  it("should toggle favorite status", async () => {
    const { result } = renderHook(() => useFavorites());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Add to favorites
    act(() => {
      result.current.toggleFavorite("1");
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe("1");

    // Remove from favorites
    act(() => {
      result.current.toggleFavorite("1");
    });

    expect(result.current.favorites).toHaveLength(0);
  });

  it("should check if product is favorite", async () => {
    const { result } = renderHook(() => useFavorites());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToFavorites("1");
    });

    expect(result.current.isFavorite("1")).toBe(true);
    expect(result.current.isFavorite("2")).toBe(false);
  });

  it("should clear all favorites", async () => {
    const { result } = renderHook(() => useFavorites());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToFavorites("1");
      result.current.addToFavorites("2");
    });

    expect(result.current.favorites).toHaveLength(2);

    act(() => {
      result.current.clearFavorites();
    });

    expect(result.current.favorites).toEqual([]);
  });

  it("should save to localStorage when favorites change", async () => {
    const { result } = renderHook(() => useFavorites());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToFavorites("1");
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith("meli_favorites", expect.stringContaining('"id":"1"'));
  });

  it("should handle localStorage save error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error("Storage quota exceeded");
    });

    const { result } = renderHook(() => useFavorites());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.addToFavorites("1");
    });

    expect(result.current.error).toBe("Error al guardar favoritos");
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("should handle multiple operations correctly", async () => {
    const { result } = renderHook(() => useFavorites());

    // Wait for initial load
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Add multiple favorites
    act(() => {
      result.current.addToFavorites("1");
      result.current.addToFavorites("2");
      result.current.addToFavorites("3");
    });

    expect(result.current.favorites).toHaveLength(3);

    // Remove one
    act(() => {
      result.current.removeFromFavorites("2");
    });

    expect(result.current.favorites).toHaveLength(2);
    expect(result.current.isFavorite("1")).toBe(true);
    expect(result.current.isFavorite("2")).toBe(false);
    expect(result.current.isFavorite("3")).toBe(true);

    // Toggle one
    act(() => {
      result.current.toggleFavorite("1");
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.isFavorite("1")).toBe(false);
    expect(result.current.isFavorite("3")).toBe(true);
  });
});
