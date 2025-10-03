import {
  formatPrice,
  formatNumber,
  formatPercentage,
  generateStars,
  calculateInstallments,
  calculateDiscount,
  isValidEmail,
  isValidUrl,
} from "../../src/lib/utils";

describe("utils", () => {
  describe("formatPrice", () => {
    it("should format price with default currency", () => {
      expect(formatPrice(1000)).toMatch(/^\$[\s\u00A0]1\.000$/);
    });

    it("should format price with ARS currency", () => {
      expect(formatPrice(1000, "ARS")).toMatch(/^\$[\s\u00A0]1\.000$/);
    });

    it("should format price with USD currency", () => {
      expect(formatPrice(1000, "USD")).toMatch(/^US\$[\s\u00A0]1\.000$/);
    });

    it("should format large prices", () => {
      expect(formatPrice(1000000)).toMatch(/^\$[\s\u00A0]1\.000\.000$/);
    });

    it("should format decimal prices", () => {
      expect(formatPrice(1234.56)).toMatch(/^\$[\s\u00A0]1\.235$/);
    });

    it("should format zero price", () => {
      expect(formatPrice(0)).toMatch(/^\$[\s\u00A0]0$/);
    });

    it("should format negative prices", () => {
      expect(formatPrice(-1000)).toMatch(/^-\$[\s\u00A0]1\.000$/);
    });

    it("should format small prices", () => {
      expect(formatPrice(99)).toMatch(/^\$[\s\u00A0]99$/);
    });
  });

  describe("formatNumber", () => {
    it("should format small numbers", () => {
      expect(formatNumber(100)).toBe("100");
    });

    it("should format thousands", () => {
      expect(formatNumber(1500)).toBe("1.500");
    });

    it("should format millions", () => {
      expect(formatNumber(1500000)).toBe("1.500.000");
    });

    it("should format billions", () => {
      expect(formatNumber(1500000000)).toBe("1.500.000.000");
    });

    it("should format zero", () => {
      expect(formatNumber(0)).toBe("0");
    });

    it("should format negative numbers", () => {
      expect(formatNumber(-1500)).toBe("-1.500");
    });

    it("should format exact thousands", () => {
      expect(formatNumber(1000)).toBe("1.000");
    });

    it("should format exact millions", () => {
      expect(formatNumber(1000000)).toBe("1.000.000");
    });

    it("should format exact billions", () => {
      expect(formatNumber(1000000000)).toBe("1.000.000.000");
    });

    it("should format large thousands", () => {
      expect(formatNumber(999999)).toBe("999.999");
    });

    it("should format large millions", () => {
      expect(formatNumber(999999999)).toBe("999.999.999");
    });
  });

  describe("formatPercentage", () => {
    it("should format percentage", () => {
      expect(formatPercentage(25.7)).toBe("26%");
    });

    it("should format zero percentage", () => {
      expect(formatPercentage(0)).toBe("0%");
    });

    it("should format 100 percentage", () => {
      expect(formatPercentage(100)).toBe("100%");
    });
  });

  describe("generateStars", () => {
    it("should generate full stars", () => {
      expect(generateStars(5)).toBe("★★★★★");
    });

    it("should generate half stars", () => {
      expect(generateStars(4.5)).toBe("★★★★☆");
    });

    it("should generate empty stars", () => {
      expect(generateStars(0)).toBe("☆☆☆☆☆");
    });
  });

  describe("calculateInstallments", () => {
    it("should calculate installments", () => {
      expect(calculateInstallments(1200, 12)).toBe(100);
    });

    it("should calculate with default installments", () => {
      expect(calculateInstallments(1200)).toBe(100);
    });
  });

  describe("calculateDiscount", () => {
    it("should calculate discount", () => {
      expect(calculateDiscount(1000, 800)).toBe(20);
    });

    it("should calculate zero discount", () => {
      expect(calculateDiscount(1000, 1000)).toBe(0);
    });
  });

  describe("isValidEmail", () => {
    it("should validate correct email", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
    });

    it("should invalidate incorrect email", () => {
      expect(isValidEmail("invalid-email")).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should validate correct URL", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
    });

    it("should invalidate incorrect URL", () => {
      expect(isValidUrl("invalid-url")).toBe(false);
    });
  });
});
