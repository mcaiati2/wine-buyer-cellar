export interface Wine {
  id: number;
  brand: string;
  type: string;
  region: string;
  price: number;
  shop_id?: number;
}

export interface Shop {
  id?: number;
  name?: string;
  address?: string;
  Wines?: Wine[];
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
  Shops?: Shop[]
}


