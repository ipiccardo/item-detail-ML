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
  };
  condition: "new" | "used";
  stock: number;
  shipping: {
    free: boolean;
    cost?: number;
    estimatedDays: string;
  };
  paymentMethods: string[];
  rating: {
    average: number;
    totalReviews: number;
  };
  specifications: {
    [key: string]: string;
  };
  category: string;
  brand: string;
  model: string;
}

// These are now in types/api.ts
