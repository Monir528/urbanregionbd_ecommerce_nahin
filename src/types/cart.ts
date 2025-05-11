export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string;
  cartQuantity: number;
  size: string;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

// For API responses containing cart items
export interface CartItemsResponse {
  items: CartItem[];
  success?: boolean;
  message?: string;
} 