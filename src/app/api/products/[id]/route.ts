import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/types/product";
import { ApiResponse } from "@/types/api";
import productsData from "@/data/products.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 },
      );
    }

    const product = (productsData as Product[]).find(
      (p: Product) => p.id === id,
    );

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
