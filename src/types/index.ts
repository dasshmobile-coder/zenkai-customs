export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tarjetas' | 'calcas-zenkai' | 'calcas-custom' | 'fits-zenkai' | 'fits-custom';
  image?: string;
  colors?: string[];
  specialColors?: string[];
  minOrder?: number;
  options?: ProductOption[];
}

export interface ProductOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: ProductOption;
  customDetails?: string;
}

export interface Portal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  accentColor: 'red' | 'blue' | 'magenta';
  bgImage: string;
}
