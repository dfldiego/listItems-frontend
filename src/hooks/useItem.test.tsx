import { act, render, waitFor } from "@testing-library/react";
import * as itemsAPI from "../api/items";
import { GetItemByIdResponse } from "../interfaces/getItemById";
import useItem from "./useItem";

//spy getItemByIdAPI
const mockGetItemByIdResponse: GetItemByIdResponse | any = {
  data: {
    ok: true,
    response: {
      author: {
        nickname: null,
      },
      item: {
        id: "MLA911412538",
        title: "Zapatillas Elastizadas Super Livianas Fabricante Directo",
        price: {
          currency: "ARS",
          amount: 4588,
          decimals: 0.5,
        },
        picture:
          "http://http2.mlstatic.com/D_692117-MLA52562808719_112022-O.jpg",
        condition: "new",
        free_shipping: false,
        sold_quantity: 12425,
        description: "RVZ CALZADOS",
      },
    },
  },
};
const mockGetItemByIdResponseInitial: GetItemByIdResponse | any = {
  data: {
    ok: true,
    response: {
      author: {
        nickname: null,
      },
      item: {},
    },
  },
};

describe("hook useItem", () => {
  test("the hook should to return the initialState", async () => {
    const spyGetItemById = jest
      .spyOn(itemsAPI, "getItemByIdAPI")
      .mockReturnValue(mockGetItemByIdResponseInitial);
    const propData: string = "MLA911412538";
    let result: any;
    const Wrapper = () => {
      result = useItem(propData);
      return <></>;
    };
    render(<Wrapper />);
    await waitFor(() => {
      expect(spyGetItemById).toBeDefined();
    });
    const { itemResponse, error, loading } = result;
    await waitFor(() => {
      expect(error).toBe("");
    });
    await waitFor(() => {
      expect(loading).toBe(true);
    });
    await waitFor(() => {
      expect(itemResponse).toBeFalsy();
    });
  });

  test("the hook should return an object with data", async () => {
    const spyGetItemById = jest
      .spyOn(itemsAPI, "getItemByIdAPI")
      .mockReturnValue(mockGetItemByIdResponse);

    const propData: string = "MLA911412538";
    let result: any;

    const Wrapper = () => {
      result = useItem(propData);
      return <></>;
    };

    await act(async () => {
      render(<Wrapper />);
    });

    expect(spyGetItemById).toHaveBeenCalled();

    await act(async () => {
      await waitFor(() => {
        expect(result.error).toBe("");
      });
    });

    await act(async () => {
      await waitFor(() => {
        expect(result.loading).toBe(false);
      });
    });

    await act(async () => {
      await waitFor(() => {
        expect(result.itemResponse).toBeTruthy();
      });
    });
  });
});
