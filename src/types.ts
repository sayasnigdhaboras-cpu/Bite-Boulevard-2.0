export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'cocktail';
  imageUrl: string;
  winePairing?: string;
  ingredients: string[];
  dietaryTags?: string[];
  popular?: boolean;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  seatingZone: string;
  specialRequest?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: 'confirmed' | 'cancelled' | 'modified';
  createdAt: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  customizations?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: 'received' | 'preparing' | 'cooking' | 'plating' | 'ready' | 'completed';
  contactName: string;
  contactEmail: string;
  deliveryType: 'dine-in' | 'curated-takeout';
  tableNumber?: string;
  createdAt: string;
}

export interface SeatingZone {
  id: string;
  name: string;
  description: string;
  capacityInfo: string;
  image: string;
  additionalCost?: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  content: string;
  author: string;
  readTime: string;
  publishDate: string;
}
