import { Product } from "@/types/product";

// Simple cache to avoid duplicate API calls
let cachedProducts: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export class RelatedProductsService {
  // Method to clear cache (useful for testing)
  static clearCache(): void {
    cachedProducts = null;
    cacheTimestamp = 0;
  }

  static async getRelatedProducts(currentProductId: string, limit: number = 4): Promise<Product[]> {
    try {
      // Check cache first
      const now = Date.now();
      if (cachedProducts && now - cacheTimestamp < CACHE_DURATION) {
        console.log("Using cached products data");
        return this.filterRelatedProducts(cachedProducts, currentProductId, limit);
      }

      console.log("Fetching products from API");
      // Fetch all products
      const response = await fetch("/api/products");
      const result = await response.json();

      if (!result.success) {
        return [];
      }

      const allProducts = result.data as Product[];

      // Update cache
      cachedProducts = allProducts;
      cacheTimestamp = now;

      return this.filterRelatedProducts(allProducts, currentProductId, limit);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching related products:", error);
      return [];
    }
  }

  private static filterRelatedProducts(allProducts: Product[], currentProductId: string, limit: number): Product[] {
    const currentProduct = allProducts.find((p) => p.id === currentProductId);

    if (!currentProduct) {
      return [];
    }

    // Filter related products
    return allProducts
      .filter((product) => product.id !== currentProductId)
      .filter(
        (product) =>
          product.brand === currentProduct.brand ||
          product.category === currentProduct.category ||
          product.subcategory === currentProduct.subcategory
      )
      .sort((a, b) => {
        // Prioritize same brand, then same category
        if (a.brand === currentProduct.brand && b.brand !== currentProduct.brand) return -1;
        if (b.brand === currentProduct.brand && a.brand !== currentProduct.brand) return 1;
        if (a.category === currentProduct.category && b.category !== currentProduct.category) return -1;
        if (b.category === currentProduct.category && a.category !== currentProduct.category) return 1;
        return 0;
      })
      .slice(0, limit);
  }
}
