export interface GetItemsByQueryResponse {
  data: DataChild;
}

export interface DataChild {
  ok: boolean;
  response: Response;
}

export interface Response {
  categories: any[];
  items: ItemElement[];
  totalPages: number;
}

export interface ItemElement {
  author: Author;
  item: ItemItem;
}

export interface Author {
  nickname: string;
}

export interface ItemItem {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sellerState: string;
}

export interface Price {
  currency: string;
  amount: number;
  decimals: number;
}
