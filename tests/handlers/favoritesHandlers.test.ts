import { createFavoritesHandlers } from "../../src/handlers/favoritesHandlers";

describe("createFavoritesHandlers", () => {
  const mockToggleFavorite = jest.fn();
  const mockIsFavorite = jest.fn();
  const mockAddToFavorites = jest.fn();
  const mockRemoveFromFavorites = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create favorites handlers with all properties", () => {
    const handlers = createFavoritesHandlers(
      mockToggleFavorite,
      mockIsFavorite,
      mockAddToFavorites,
      mockRemoveFromFavorites,
    );

    expect(handlers).toHaveProperty("toggleFavorite");
    expect(handlers).toHaveProperty("isFavorite");
    expect(handlers).toHaveProperty("addToFavorites");
    expect(handlers).toHaveProperty("removeFromFavorites");
  });

  it("should return toggleFavorite function", () => {
    const handlers = createFavoritesHandlers(
      mockToggleFavorite,
      mockIsFavorite,
      mockAddToFavorites,
      mockRemoveFromFavorites,
    );

    handlers.toggleFavorite("1");
    expect(mockToggleFavorite).toHaveBeenCalledWith("1");
  });

  it("should return isFavorite function", () => {
    mockIsFavorite.mockReturnValue(true);
    const handlers = createFavoritesHandlers(
      mockToggleFavorite,
      mockIsFavorite,
      mockAddToFavorites,
      mockRemoveFromFavorites,
    );

    const result = handlers.isFavorite("1");
    expect(result).toBe(true);
    expect(mockIsFavorite).toHaveBeenCalledWith("1");
  });

  it("should return addToFavorites function", () => {
    const handlers = createFavoritesHandlers(
      mockToggleFavorite,
      mockIsFavorite,
      mockAddToFavorites,
      mockRemoveFromFavorites,
    );

    handlers.addToFavorites("1");
    expect(mockAddToFavorites).toHaveBeenCalledWith("1");
  });

  it("should return removeFromFavorites function", () => {
    const handlers = createFavoritesHandlers(
      mockToggleFavorite,
      mockIsFavorite,
      mockAddToFavorites,
      mockRemoveFromFavorites,
    );

    handlers.removeFromFavorites("1");
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith("1");
  });

  it("should handle multiple function calls", () => {
    const handlers = createFavoritesHandlers(
      mockToggleFavorite,
      mockIsFavorite,
      mockAddToFavorites,
      mockRemoveFromFavorites,
    );

    // Test multiple calls
    handlers.toggleFavorite("1");
    handlers.toggleFavorite("2");
    handlers.isFavorite("1");
    handlers.isFavorite("2");
    handlers.addToFavorites("3");
    handlers.removeFromFavorites("4");

    expect(mockToggleFavorite).toHaveBeenCalledTimes(2);
    expect(mockToggleFavorite).toHaveBeenNthCalledWith(1, "1");
    expect(mockToggleFavorite).toHaveBeenNthCalledWith(2, "2");

    expect(mockIsFavorite).toHaveBeenCalledTimes(2);
    expect(mockIsFavorite).toHaveBeenNthCalledWith(1, "1");
    expect(mockIsFavorite).toHaveBeenNthCalledWith(2, "2");

    expect(mockAddToFavorites).toHaveBeenCalledWith("3");
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith("4");
  });

  it("should handle isFavorite returning false", () => {
    mockIsFavorite.mockReturnValue(false);
    const handlers = createFavoritesHandlers(
      mockToggleFavorite,
      mockIsFavorite,
      mockAddToFavorites,
      mockRemoveFromFavorites,
    );

    const result = handlers.isFavorite("1");
    expect(result).toBe(false);
  });

  it("should handle different product IDs", () => {
    const handlers = createFavoritesHandlers(
      mockToggleFavorite,
      mockIsFavorite,
      mockAddToFavorites,
      mockRemoveFromFavorites,
    );

    handlers.toggleFavorite("product-123");
    handlers.isFavorite("product-456");
    handlers.addToFavorites("product-789");
    handlers.removeFromFavorites("product-abc");

    expect(mockToggleFavorite).toHaveBeenCalledWith("product-123");
    expect(mockIsFavorite).toHaveBeenCalledWith("product-456");
    expect(mockAddToFavorites).toHaveBeenCalledWith("product-789");
    expect(mockRemoveFromFavorites).toHaveBeenCalledWith("product-abc");
  });

  it("should return the same function references", () => {
    const handlers = createFavoritesHandlers(
      mockToggleFavorite,
      mockIsFavorite,
      mockAddToFavorites,
      mockRemoveFromFavorites,
    );

    // Functions should be the same references passed in
    expect(handlers.toggleFavorite).toBe(mockToggleFavorite);
    expect(handlers.isFavorite).toBe(mockIsFavorite);
    expect(handlers.addToFavorites).toBe(mockAddToFavorites);
    expect(handlers.removeFromFavorites).toBe(mockRemoveFromFavorites);
  });
});
