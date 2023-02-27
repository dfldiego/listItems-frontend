export interface GetItemByIdResponse {
  data: DataChild;
}

export interface DataChild {
  ok: boolean;
  response: Response;
}

export interface Response {
  author: Author;
  item: Item;
}

export interface Author {
  nickname: null;
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
}

export interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface useItemResponse {
  itemResponse: ProductDetail | null;
  error: string;
  loading: boolean;
}

export interface ProductDetail {
  author: Author;
  item: ItemDetail;
}

export interface ItemDetail {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
}
