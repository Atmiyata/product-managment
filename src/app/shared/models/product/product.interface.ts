export type inventoryStatus = 'INSTOCK' | 'OUTOFSTOCK' | 'LOWSTOCK';
export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: inventoryStatus;
  category?: string;
  image?: string;
  date?: string;
  rating?: number;
}
