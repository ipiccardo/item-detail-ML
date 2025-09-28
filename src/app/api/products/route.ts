import { NextRequest, NextResponse } from "next/server";
import { Product, ProductsResponse } from "@/types/product";
import productsData from "@/data/products.json";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ProductsResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let filteredProducts: Product[] = [...(productsData as Product[])];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase()),
      );
    }

    // Filter by brand
    if (brand) {
      filteredProducts = filteredProducts.filter((product) =>
        product.brand.toLowerCase().includes(brand.toLowerCase()),
      );
    }

    // Filter by price range
    if (minPrice) {
      const min = parseInt(minPrice);
      filteredProducts = filteredProducts.filter(
        (product) => product.price.amount >= min,
      );
    }

    if (maxPrice) {
      const max = parseInt(maxPrice);
      filteredProducts = filteredProducts.filter(
        (product) => product.price.amount <= max,
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
