import {
  formatPrice,
  formatNumber,
  formatPercentage,
  generateStars,
  calculateInstallments,
  calculateDiscount,
  isValidEmail,
  isValidUrl,
} from "../utils";

describe("Utils", () => {
  describe("formatPrice", () => {
    it("should format price in ARS currency", () => {
      expect(formatPrice(1000)).toMatch(/\$.*1\.000/);
      expect(formatPrice(299999)).toMatch(/\$.*299\.999/);
    });

    it("should format price with custom currency", () => {
      expect(formatPrice(1000, "USD")).toMatch(/US\$.*1\.000/);
    });
  });

  describe("formatNumber", () => {
    it("should format numbers with locale", () => {
      expect(formatNumber(1000)).toBe("1.000");
      expect(formatNumber(1234567)).toBe("1.234.567");
    });
  });

  describe("formatPercentage", () => {
    it("should format percentage values", () => {
      expect(formatPercentage(14.5)).toBe("15%");
      expect(formatPercentage(25.7)).toBe("26%");
    });
  });

  describe("generateStars", () => {
    it("should generate correct star rating", () => {
      expect(generateStars(4.5)).toBe("★★★★☆");
      expect(generateStars(3)).toBe("★★★☆☆");
      expect(generateStars(5)).toBe("★★★★★");
      expect(generateStars(0)).toBe("☆☆☆☆☆");
    });
  });

  describe("calculateInstallments", () => {
    it("should calculate installments correctly", () => {
      expect(calculateInstallments(1200, 12)).toBe(100);
      expect(calculateInstallments(1000)).toBe(83.33333333333333);
    });
  });

  describe("calculateDiscount", () => {
    it("should calculate discount percentage", () => {
      expect(calculateDiscount(1000, 800)).toBe(20);
      expect(calculateDiscount(1000, 900)).toBe(10);
    });
  });

  describe("isValidEmail", () => {
    it("should validate email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("invalid-email")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should validate URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://example.com")).toBe(true);
      expect(isValidUrl("invalid-url")).toBe(false);
      expect(isValidUrl("")).toBe(false);
    });
  });
});
