export interface Product {
  id: string;
  title: string;
  description: string;
  price: {
    amount: number;
    currency: string;
    originalPrice?: number;
    discount?: number;
  };
  images: string[];
  seller: {
    id: string;
    name: string;
    reputation: number;
    sales: number;
    location: string;
    warranty?: string;
  };
  condition: "new" | "used";
  stock: number;
  shipping: {
    free: boolean;
    cost?: number;
    estimatedDays: string;
    calculator?: string;
  };
  paymentMethods: string[];
  rating: {
    average: number;
    totalReviews: number;
  };
  specifications: {
    [key: string]: string;
  };
  variants?: {
    color?: Variant[];
    storage?: Variant[];
  };
  keyFeatures?: string[];
  breadcrumbs?: string[];
  category: string;
  subcategory?: string;
  brand: string;
  model: string;
}

export interface Variant {
  name: string;
  value: string;
  available: boolean;
  image?: string;
  priceModifier?: number;
}

// These are now in types/api.ts
