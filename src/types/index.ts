export interface User {
  id: string;
  phoneNumber: string;
  role: 'user' | 'waiter' | 'admin' | 'superadmin'
  loyaltyPoints?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  isVegetarian: boolean;
  rating: number;
  priceRange: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian: boolean;
  calories: number;
  customizations?: {
    spiceLevel?: string[];
    extras?: string[];
  };
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  tableNumber: string;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  items: OrderItem[];
  totalAmount: number;
  specialRequests?: string;
  createdAt: string;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  customizations?: {
    spiceLevel?: string;
    extras?: string[];
  };
}