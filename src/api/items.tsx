import axios from "axios";
import { ITEMS_PATH } from "../config/index";

export const getItemsByQueryAPI = (
  q: string,
  offset?: string,
  limit?: string
) => {
  let url = `${ITEMS_PATH}/items?q=${q}`;
  if (offset) {
    url = `${url}&offset=${offset}`;
  }
  if (limit) {
    url = `${url}&limit=${limit}`;
  }
  return axios.get(url);
};

export const getItemByIdAPI = (id: string) => {
  return axios.get(`${ITEMS_PATH}/items/${id}`);
};
