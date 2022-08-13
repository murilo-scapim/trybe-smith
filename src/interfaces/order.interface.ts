export interface Order {
  id: number;
  userId: number;
}

export interface OrderWithProductsIds {
  id?: number;
  userId: number;
  productsIds: number[];
}

export interface OrderOnlyProductsIds {
  productsIds: number[];
}