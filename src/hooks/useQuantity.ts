import { useState } from "react";

export function useQuantity(
  maxQuantity: number,
  initialQuantity: number = 1,
): {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  setQuantity: (value: number) => void;
} {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = (): void => {
    setQuantity((prev) => Math.min(prev + 1, maxQuantity));
  };

  const decrement = (): void => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const setQuantityValue = (value: number): void => {
    const newQuantity = Math.max(1, Math.min(value, maxQuantity));
    setQuantity(newQuantity);
  };

  return {
    quantity,
    increment,
    decrement,
    setQuantity: setQuantityValue,
  };
}
