import { createCompareHandlers } from "../../src/handlers/compareHandlers";
import { Product } from "../../src/types/product";

describe("createCompareHandlers", () => {
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

  const mockAddToCompare = jest.fn();
  const mockRemoveFromCompare = jest.fn();
  const mockIsInCompare = jest.fn();
  const mockClearCompare = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create compare handlers with all properties", () => {
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      [mockProduct],
      mockClearCompare,
    );

    expect(handlers).toHaveProperty("addToCompare");
    expect(handlers).toHaveProperty("removeFromCompare");
    expect(handlers).toHaveProperty("isInCompare");
    expect(handlers).toHaveProperty("canAddMore");
    expect(handlers).toHaveProperty("compareProducts");
    expect(handlers).toHaveProperty("clearCompare");
  });

  it("should return correct canAddMore value", () => {
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      [mockProduct],
      mockClearCompare,
    );

    expect(handlers.canAddMore).toBe(true);
  });

  it("should return correct compareProducts array", () => {
    const products = [mockProduct];
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      products,
      mockClearCompare,
    );

    expect(handlers.compareProducts).toEqual(products);
  });

  it("should return isInCompare function", () => {
    mockIsInCompare.mockReturnValue(true);
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      [mockProduct],
      mockClearCompare,
    );

    const result = handlers.isInCompare("1");
    expect(result).toBe(true);
    expect(mockIsInCompare).toHaveBeenCalledWith("1");
  });

  it("should return clearCompare function", () => {
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      [mockProduct],
      mockClearCompare,
    );

    handlers.clearCompare();
    expect(mockClearCompare).toHaveBeenCalled();
  });

  it("should add product to compare when not already in compare", () => {
    mockIsInCompare.mockReturnValue(false);
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      [mockProduct],
      mockClearCompare,
    );

    handlers.addToCompare(mockProduct);

    expect(mockIsInCompare).toHaveBeenCalledWith("1");
    expect(mockAddToCompare).toHaveBeenCalledWith(mockProduct);
    expect(mockRemoveFromCompare).not.toHaveBeenCalled();
  });

  it("should remove product from compare when already in compare", () => {
    mockIsInCompare.mockReturnValue(true);
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      [mockProduct],
      mockClearCompare,
    );

    handlers.addToCompare(mockProduct);

    expect(mockIsInCompare).toHaveBeenCalledWith("1");
    expect(mockRemoveFromCompare).toHaveBeenCalledWith("1");
    expect(mockAddToCompare).not.toHaveBeenCalled();
  });

  it("should call removeFromCompare when removeFromCompare is called", () => {
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      [mockProduct],
      mockClearCompare,
    );

    handlers.removeFromCompare("1");

    expect(mockRemoveFromCompare).toHaveBeenCalledWith("1");
  });

  it("should handle multiple products in compare", () => {
    const product2: Product = {
      ...mockProduct,
      id: "2",
      title: "Test Product 2",
    };

    const products = [mockProduct, product2];
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      products,
      mockClearCompare,
    );

    expect(handlers.compareProducts).toHaveLength(2);
    expect(handlers.compareProducts).toContain(mockProduct);
    expect(handlers.compareProducts).toContain(product2);
  });

  it("should handle empty compare products array", () => {
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      true,
      [],
      mockClearCompare,
    );

    expect(handlers.compareProducts).toEqual([]);
  });

  it("should handle canAddMore as false", () => {
    const handlers = createCompareHandlers(
      mockAddToCompare,
      mockRemoveFromCompare,
      mockIsInCompare,
      false,
      [mockProduct],
      mockClearCompare,
    );

    expect(handlers.canAddMore).toBe(false);
  });
});
