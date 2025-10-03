import { getDefaultGuarantees } from "../../src/lib/guarantees";

describe("guarantees", () => {
    describe("getDefaultGuarantees", () => {
        it("should return default guarantees", () => {
            const guarantees = getDefaultGuarantees();
            
            expect(guarantees).toHaveLength(2);
            expect(guarantees[0].text).toBe("Devolución gratis. Tenés 30 días desde que lo recibís.");
            expect(guarantees[1].text).toBe("Compra Protegida, recibí el producto que esperabas o te devolvemos tu dinero.");
        });

        it("should return guarantees with icons", () => {
            const guarantees = getDefaultGuarantees();
            
            expect(guarantees[0].icon).toBeDefined();
            expect(guarantees[1].icon).toBeDefined();
        });

        it("should return consistent guarantees", () => {
            const guarantees1 = getDefaultGuarantees();
            const guarantees2 = getDefaultGuarantees();
            
            expect(guarantees1).toEqual(guarantees2);
        });

        it("should return guarantees with proper structure", () => {
            const guarantees = getDefaultGuarantees();
            
            guarantees.forEach(guarantee => {
                expect(guarantee).toHaveProperty("icon");
                expect(guarantee).toHaveProperty("text");
                expect(typeof guarantee.text).toBe("string");
                expect(guarantee.text.length).toBeGreaterThan(0);
            });
        });

        it("should return guarantees with SVG icons", () => {
            const guarantees = getDefaultGuarantees();
            
            guarantees.forEach(guarantee => {
                expect(guarantee.icon).toBeDefined();
                // The icons are React elements, so we can't easily test their structure
                // but we can ensure they exist
            });
        });

        it("should return guarantees with meaningful text", () => {
            const guarantees = getDefaultGuarantees();
            
            expect(guarantees[0].text).toContain("Devolución gratis");
            expect(guarantees[0].text).toContain("30 días");
            expect(guarantees[1].text).toContain("Compra Protegida");
            expect(guarantees[1].text).toContain("devolvemos tu dinero");
        });

        it("should return guarantees in correct order", () => {
            const guarantees = getDefaultGuarantees();
            
            expect(guarantees[0].text).toContain("Devolución gratis");
            expect(guarantees[1].text).toContain("Compra Protegida");
        });

        it("should return guarantees with proper text length", () => {
            const guarantees = getDefaultGuarantees();
            
            guarantees.forEach(guarantee => {
                expect(guarantee.text.length).toBeGreaterThan(10);
                expect(guarantee.text.length).toBeLessThan(200);
            });
        });

        it("should return guarantees without duplicates", () => {
            const guarantees = getDefaultGuarantees();
            const texts = guarantees.map(g => g.text);
            const uniqueTexts = [...new Set(texts)];
            
            expect(texts).toHaveLength(uniqueTexts.length);
        });

        it("should return guarantees that are not empty", () => {
            const guarantees = getDefaultGuarantees();
            
            expect(guarantees.length).toBeGreaterThan(0);
            guarantees.forEach(guarantee => {
                expect(guarantee.text.trim()).not.toBe("");
            });
        });
    });
});
