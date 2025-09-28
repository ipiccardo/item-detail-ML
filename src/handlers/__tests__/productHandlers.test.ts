import { createProductActions } from "../productHandlers";
import { Product } from "@/types/product";

// Mock window.navigator
const mockNavigator = {
  share: jest.fn(),
  clipboard: {
    writeText: jest.fn(),
  },
};

Object.defineProperty(window, "navigator", {
  value: mockNavigator,
  writable: true,
});

// Mock window.alert
const mockAlert = jest.fn();
Object.defineProperty(window, "alert", {
  value: mockAlert,
  writable: true,
});

// Mock product for testing
const mockProduct: Product = {
  id: "test-product",
  title: "Test Product",
  description: "Test Description",
  price: { amount: 1000, currency: "ARS" },
  images: ["/test.jpg"],
  seller: {
    id: "seller1",
    name: "Test Seller",
    reputation: 4.5,
    sales: 100,
    location: "Test Location",
  },
  condition: "new",
  stock: 10,
  shipping: { free: true, estimatedDays: "1-2 días" },
  paymentMethods: ["Credit Card"],
  rating: { average: 4.0, totalReviews: 10 },
  specifications: {},
  variants: { color: [], storage: [] },
  keyFeatures: [],
  breadcrumbs: [],
  category: "Test",
  subcategory: "Test",
  brand: "Test",
  model: "Test",
};

// Mock handlers
const mockFavoritesHandlers = {
  toggleFavorite: jest.fn(),
  isFavorite: jest.fn().mockReturnValue(false),
};

const mockCompareHandlers = {
  addToCompare: jest.fn(),
  isInCompare: jest.fn().mockReturnValue(false),
  canAddMore: true,
};

describe("productHandlers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createProductActions", () => {
    it("should create actions object with all required methods", () => {
      const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

      expect(actions).toHaveProperty("onBuyNow");
      expect(actions).toHaveProperty("onAddToCart");
      expect(actions).toHaveProperty("onAddToFavorites");
      expect(actions).toHaveProperty("onAddToCompare");
      expect(actions).toHaveProperty("onShare");
      expect(actions).toHaveProperty("isFavorite");
      expect(actions).toHaveProperty("isInCompare");
      expect(actions).toHaveProperty("canAddToCompare");
      expect(typeof actions.onBuyNow).toBe("function");
      expect(typeof actions.onAddToCart).toBe("function");
      expect(typeof actions.onAddToFavorites).toBe("function");
      expect(typeof actions.onAddToCompare).toBe("function");
      expect(typeof actions.onShare).toBe("function");
      expect(typeof actions.isFavorite).toBe("boolean");
      expect(typeof actions.isInCompare).toBe("boolean");
      expect(typeof actions.canAddToCompare).toBe("boolean");
    });

    it("should show alert when buy now is called", () => {
      const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

      actions.onBuyNow();

      expect(mockAlert).toHaveBeenCalledWith("Funcionalidad de compra no implementada en este prototipo");
    });

    it("should show alert when add to cart is called", () => {
      const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

      actions.onAddToCart();

      expect(mockAlert).toHaveBeenCalledWith("Funcionalidad de carrito no implementada en este prototipo");
    });

    it("should call toggleFavorite when add to favorites is called", () => {
      const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

      actions.onAddToFavorites();

      expect(mockFavoritesHandlers.toggleFavorite).toHaveBeenCalledWith("test-product");
    });

    it("should call addToCompare when add to compare is called", () => {
      const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

      actions.onAddToCompare();

      expect(mockCompareHandlers.addToCompare).toHaveBeenCalledWith(mockProduct);
    });

    it("should use Web Share API when available", () => {
      const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);
      mockNavigator.share.mockResolvedValue(undefined);

      actions.onShare();

      expect(mockNavigator.share).toHaveBeenCalledWith({
        title: "MercadoLibre - Producto",
        text: "Mira este producto en MercadoLibre",
        url: window.location.href,
      });
    });

    it("should fallback to clipboard when Web Share API is not available", () => {
      // Mock navigator without share
      const mockClipboard = { writeText: jest.fn() };
      Object.defineProperty(window, "navigator", {
        value: { clipboard: mockClipboard },
        writable: true,
      });

      const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);
      mockClipboard.writeText.mockResolvedValue(undefined);

      actions.onShare();

      expect(mockClipboard.writeText).toHaveBeenCalledWith("http://localhost/");
      expect(mockAlert).toHaveBeenCalledWith("Enlace copiado al portapapeles");
    });

    it("should return correct state values", () => {
      const actions = createProductActions(mockProduct, mockFavoritesHandlers, mockCompareHandlers);

      expect(actions.isFavorite).toBe(false);
      expect(actions.isInCompare).toBe(false);
      expect(actions.canAddToCompare).toBe(true);
    });
  });
});
