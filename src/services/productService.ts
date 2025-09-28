import { Product, ApiResponse } from "@/types";

export class ProductService {
  private static baseUrl = "/api/products";

  static async getProduct(id: string): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      return await response.json();
    } catch {
      return {
        success: false,
        error: "Error de conexión al obtener el producto",
      };
    }
  }

  static async getProducts(filters?: Record<string, string>): Promise<ApiResponse<Product[]>> {
    try {
      const searchParams = new URLSearchParams(filters);
      const url = `${this.baseUrl}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      const response = await fetch(url);
      return await response.json();
    } catch {
      return {
        success: false,
        error: "Error de conexión al obtener los productos",
      };
    }
  }
}
