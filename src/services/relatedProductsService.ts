import { Product } from "@/types/product";

export class RelatedProductsService {
  static async getRelatedProducts(currentProductId: string, limit: number = 4): Promise<Product[]> {
    try {
      // In a real app, this would be an API call
      // For now, we'll fetch all products and filter them
      const response = await fetch("/api/products");
      const result = await response.json();

      if (!result.success) {
        return [];
      }

      const allProducts = result.data as Product[];
      const currentProduct = allProducts.find((p) => p.id === currentProductId);

      if (!currentProduct) {
        return [];
      }

      // Filter related products
      const relatedProducts = allProducts
        .filter((product) => product.id !== currentProductId)
        .filter(
          (product) =>
            product.brand === currentProduct.brand ||
            product.category === currentProduct.category ||
            product.subcategory === currentProduct.subcategory,
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

      return relatedProducts;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching related products:", error);
      return [];
    }
  }
}
