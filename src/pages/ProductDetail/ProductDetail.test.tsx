import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { useItem } from "../../hooks";
import * as router from "react-router-dom";
import ProductDetail from "./ProductDetail";

// useQueryString
jest.mock("../../hooks/useQueryString", () => {
  return () => ({
    q: "remera",
  });
});

// axios
jest.mock("axios");
// @ts-ignore
axios.get.mockResolvedValue({ data: { id: "123", name: "Example Item" } });

// useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// useItems (mock de custom hook con useContext)
jest.mock("../../hooks/useItems.tsx", () => {
  return () => ({
    itemsState: {
      breadcrumbs: ["comida", "postre"],
    },
  });
});

// useItem (mock custom hook)
jest.mock("../../hooks");
const mockUseItem = useItem as jest.MockedFunction<typeof useItem>;
const mockUseItemReturn = {
  itemResponse: {
    author: {
      nickname: null,
    },
    item: {
      id: "id_data",
      title: "title_data",
      price: {
        currency: "currency_data",
        amount: 110,
        decimals: 0.5,
      },
      picture: "picture_data",
      condition: "new",
      free_shipping: true,
      sold_quantity: 500,
      description: "description_data",
    },
  },
  error: "",
  loading: false,
};

describe("<ProductDetail>", () => {
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });
  test("should render correctly", () => {
    mockUseItem.mockReturnValue(mockUseItemReturn);
    const { container } = render(<ProductDetail />);
    expect(container).toMatchSnapshot();
  });

  test("should contain search component", () => {
    mockUseItem.mockReturnValue(mockUseItemReturn);
    render(<ProductDetail />);
    const searchComponent = screen.getByTestId("search-component-test-id");
    expect(searchComponent).toBeInTheDocument();
  });

  test("should render breadcrumbs and item detail data", () => {
    mockUseItem.mockReturnValue(mockUseItemReturn);
    render(<ProductDetail />);
    const breadcrumbsComponent = screen.getByTestId(
      "breadcrumbs-component-test-id"
    );
    expect(breadcrumbsComponent).toBeInTheDocument();
    //title
    expect(screen.getByText(/title_data/i)).toBeInTheDocument();
    //amount
    expect(screen.getByText(/110/i)).toBeInTheDocument();
    //decimal
    expect(screen.getByText("50")).toBeInTheDocument();
    //img
    const img = screen.getByTestId("item-detail-img-test-id");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "picture_data");
    //description
    expect(screen.getByText(/description_data/i)).toBeInTheDocument();
    //sold quantity
    expect(screen.getByText(/Nuevo - 500 vendidos/i)).toBeInTheDocument();
  });

  test("should contain a button", () => {
    mockUseItem.mockReturnValue(mockUseItemReturn);
    render(<ProductDetail />);
    const buttonElement = screen.getByTestId("button-test-id");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(navigate).toHaveBeenCalled();
  });
});
