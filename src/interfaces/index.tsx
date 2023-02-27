export interface Item {
  author: {
    nickname?: string | null;
  };
  item: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity?: number;
    description?: string;
    sellerState?: string;
  };
}

export interface ProductDetail {
  author: Author;
  item: ItemDetail;
}

export interface Author {
  nickname: null;
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

export interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface ItemsState {
  breadcrumbs: string[] | [];
}
