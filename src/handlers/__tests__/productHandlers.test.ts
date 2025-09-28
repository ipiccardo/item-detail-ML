import { createProductActions } from "../productHandlers";

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

describe("productHandlers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createProductActions", () => {
    it("should create actions object with all required methods", () => {
      const actions = createProductActions();

      expect(actions).toHaveProperty("onBuyNow");
      expect(actions).toHaveProperty("onAddToCart");
      expect(actions).toHaveProperty("onAddToFavorites");
      expect(actions).toHaveProperty("onShare");
      expect(typeof actions.onBuyNow).toBe("function");
      expect(typeof actions.onAddToCart).toBe("function");
      expect(typeof actions.onAddToFavorites).toBe("function");
      expect(typeof actions.onShare).toBe("function");
    });

    it("should show alert when buy now is called", () => {
      const actions = createProductActions();

      actions.onBuyNow();

      expect(mockAlert).toHaveBeenCalledWith("Funcionalidad de compra no implementada en este prototipo");
    });

    it("should show alert when add to cart is called", () => {
      const actions = createProductActions();

      actions.onAddToCart();

      expect(mockAlert).toHaveBeenCalledWith("Funcionalidad de carrito no implementada en este prototipo");
    });

    it("should show alert when add to favorites is called", () => {
      const actions = createProductActions();

      actions.onAddToFavorites();

      expect(mockAlert).toHaveBeenCalledWith("Funcionalidad de favoritos no implementada en este prototipo");
    });

    it("should use Web Share API when available", () => {
      const actions = createProductActions();
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

      const actions = createProductActions();
      mockClipboard.writeText.mockResolvedValue(undefined);

      actions.onShare();

      expect(mockClipboard.writeText).toHaveBeenCalledWith("http://localhost/");
      expect(mockAlert).toHaveBeenCalledWith("Enlace copiado al portapapeles");
    });
  });
});
