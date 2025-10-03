/* eslint-disable @typescript-eslint/await-thenable */
import { createProductActions } from "../../src/handlers/productHandlers";
import { Product } from "../../src/types/product";

// Mock navigator
const mockNavigator = {
  share: jest.fn(),
  clipboard: {
    writeText: jest.fn(),
  },
};

Object.defineProperty(global, "navigator", {
  value: mockNavigator,
  writable: true,
  configurable: true,
});

// Mock window
Object.defineProperty(global, "window", {
  value: {
    location: {
      href: "https://example.com/product/1",
    },
  },
  writable: true,
  configurable: true,
});

// Mock alert
global.alert = jest.fn();

describe("createProductActions", () => {
  const mockProduct: Product = {
    id: "1",
    title: "Test Product",
    description: "Test product description",
    price: { amount: 100, currency: "ARS" },
    images: ["image1.jpg"],
    rating: { average: 4.5, totalReviews: 50 },
    stock: 10,
    seller: {
      id: "seller1",
      name: "Test Seller",
      sales: 100,
      reputation: 4.8,
      location: "Buenos Aires",
    },
    condition: "new",
    shipping: {
      free: true,
      estimatedDays: "3",
    },
    paymentMethods: ["credit", "debit"],
    brand: "Test Brand",
    category: "Electronics",
    subcategory: "Phones",
    model: "Test Model",
    specifications: {},
  };

  const mockFavoritesHandlers = {
    toggleFavorite: jest.fn(),
    isFavorite: jest.fn(),
  };

  const mockCompareHandlers = {
    addToCompare: jest.fn(),
    isInCompare: jest.fn(),
    canAddMore: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create product actions with all handlers", () => {
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

    expect(actions).toHaveProperty("onBuyNow");
    expect(actions).toHaveProperty("onAddToCart");
    expect(actions).toHaveProperty("onAddToFavorites");
    expect(actions).toHaveProperty("onAddToCompare");
    expect(actions).toHaveProperty("onShare");
    expect(actions).toHaveProperty("isFavorite");
    expect(actions).toHaveProperty("isInCompare");
    expect(actions).toHaveProperty("canAddToCompare");
  });

  it("should call alert when onBuyNow is triggered", () => {
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

    actions.onBuyNow();

    expect(global.alert).toHaveBeenCalledWith("Funcionalidad de compra no implementada en este prototipo");
  });

  it("should call alert when onAddToCart is triggered", () => {
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

    actions.onAddToCart();

    expect(global.alert).toHaveBeenCalledWith("Funcionalidad de carrito no implementada en este prototipo");
  });

  it("should call toggleFavorite when onAddToFavorites is triggered", () => {
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

    actions.onAddToFavorites();

    expect(mockFavoritesHandlers.toggleFavorite).toHaveBeenCalledWith("1");
  });

  it("should call addToCompare when onAddToCompare is triggered", () => {
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

    actions.onAddToCompare();

    expect(mockCompareHandlers.addToCompare).toHaveBeenCalledWith(mockProduct);
  });

  it("should call onShare function", async () => {
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

    // Should not throw when calling onShare
    await actions.onShare();
    expect(actions.onShare).toBeDefined();
  });

  it("should return isFavorite from favoritesHandlers", () => {
    mockFavoritesHandlers.isFavorite.mockReturnValue(true);
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

    expect(actions.isFavorite).toBe(true);
    expect(mockFavoritesHandlers.isFavorite).toHaveBeenCalledWith("1");
  });

  it("should return isInCompare from compareHandlers", () => {
    mockCompareHandlers.isInCompare.mockReturnValue(false);
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

    expect(actions.isInCompare).toBe(false);
    expect(mockCompareHandlers.isInCompare).toHaveBeenCalledWith("1");
  });

  it("should return canAddToCompare from compareHandlers", () => {
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

    expect(actions.canAddToCompare).toBe(true);
  });

  it("should handle canAddToCompare as false", () => {
    const actions = createProductActions(mockProduct, mockFavoritesHandlers, {
      ...mockCompareHandlers,
      canAddMore: false,
    });

    expect(actions.canAddToCompare).toBe(false);
  });
});
