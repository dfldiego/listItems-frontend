import { render, screen, waitFor } from "@testing-library/react";
import * as router from "react-router-dom";
import * as itemsAPI from "../../api/items";

import { useItems } from "../../hooks";
import { GetItemsByQueryResponse } from "../../interfaces/getItemsByQuery";
import Products from "./Products";

jest.mock("query-string", () => ({
  parse: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

// useItems (mock de custom hook con useContext)
jest.mock("../../hooks/useItems");
export const mockUseItems = useItems as jest.MockedFunction<typeof useItems>;

// useQueryString (mock custom hook)
jest.mock("../../hooks/useQueryString", () => {
  return () => ({
    q: "sarasa",
  });
});

//spy getItemsByQueryAPI
const mockGetItemsByQueryResponse: GetItemsByQueryResponse | any = {
  data: {
    ok: true,
    response: {
      categories: [
        "Arte, Librería y Mercería",
        "Librería",
        "Escolar",
        "Útiles Escolares",
        "Lapiceras",
      ],
      items: [
        {
          author: {
            nickname: "LIBRERIAELPOLI",
          },
          item: {
            id: "MLA1141510338",
            title: "Boligrafos En Gel Pasteles Zebra Sarasa Clip X8 Unidades",
            price: {
              currency: "ARS",
              amount: 7810,
              decimals: 0,
            },
            picture:
              "http://http2.mlstatic.com/D_769302-MLA50238468858_062022-O.jpg",
            condition: "new",
            free_shipping: false,
            sellerState: "Capital Federal",
          },
        },
        {
          author: {
            nickname: "LIBRERIAELPOLI",
          },
          item: {
            id: "MLA1141516866",
            title:
              "Boligrafos En Gel Metalizados Zebra Sarasa Clip X9 Unidades",
            price: {
              currency: "ARS",
              amount: 9020,
              decimals: 0,
            },
            picture:
              "http://http2.mlstatic.com/D_934921-MLA50238473277_062022-O.jpg",
            condition: "new",
            free_shipping: true,
            sellerState: "Capital Federal",
          },
        },
        {
          author: {
            nickname: "ELBAZARDIGITAL",
          },
          item: {
            id: "MLA772013592",
            title: "10x Zebra Sarasa Clip 0.3 Mm Retractable Gel Ink Pen",
            price: {
              currency: "ARS",
              amount: 15229,
              decimals: 0,
            },
            picture:
              "http://http2.mlstatic.com/D_887555-MLA29460710543_022019-O.jpg",
            condition: "new",
            free_shipping: true,
            sellerState: "Buenos Aires",
          },
        },
        {
          author: {
            nickname: "ELBAZARDIGITAL",
          },
          item: {
            id: "MLA752494135",
            title: "Set X 5 Zebra Sarasa Clip 0.5mm Ballpoint Pen",
            price: {
              currency: "ARS",
              amount: 9699,
              decimals: 0,
            },
            picture:
              "http://http2.mlstatic.com/D_640131-MLA31600382812_072019-O.jpg",
            condition: "new",
            free_shipping: true,
            sellerState: "Buenos Aires",
          },
        },
      ],
      totalPages: 16,
    },
  },
};

describe("<Products>", () => {
  const navigate = jest.fn();
  beforeEach(() => {
    mockUseItems.mockReturnValue({
      setBreadcrumbs: jest.fn(),
      itemsState: {
        breadcrumbs: [],
      },
    });
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  test("should render correctly", async () => {
    const spyGetItemsByQuery = jest
      .spyOn(itemsAPI, "getItemsByQueryAPI")
      .mockReturnValue(mockGetItemsByQueryResponse);
    const { container } = render(<Products />);
    expect(container).toMatchSnapshot();
    await waitFor(() => {
      expect(spyGetItemsByQuery).toBeDefined();
    });
  });

  test("should contain search component", () => {
    render(<Products />);
    const searchComponent = screen.getByTestId("search-component-test-id");
    expect(searchComponent).toBeInTheDocument();
  });

  test("should contain breadcrumbs component", () => {
    render(<Products />);
    const searchComponent = screen.getByTestId("breadcrumbs-component-test-id");
    expect(searchComponent).toBeInTheDocument();
  });
});
