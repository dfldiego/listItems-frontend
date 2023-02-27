import { fireEvent, render, screen } from "@testing-library/react";
import { Item } from "../../interfaces";
import CardItem from "./CardItem";

// MOCK useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// MOCK PROPS ITEM
const mockItem: Item = {
  author: {
    nickname: "QUIRINO BEBIDAS",
  },
  item: {
    id: "MLA1308919460",
    title: "Aperitivo Aperol 750ml",
    price: {
      currency: "ARS",
      amount: 1298,
      decimals: 0,
    },
    picture: "http://http2.mlstatic.com/D_653025-MLA31576823324_072019-O.jpg",
    condition: "new",
    free_shipping: false,
    sellerState: "Capital Federal",
  },
};

describe("<CardItem>", () => {
  test("should render correctly", () => {
    const { container } = render(<CardItem item={mockItem} />);
    expect(container).toMatchSnapshot();
  });

  test("should render the props data", () => {
    render(<CardItem item={mockItem} />);
    // title
    expect(screen.getByText(/Aperitivo Aperol 750ml/i)).toBeInTheDocument();
    // amount
    expect(screen.getByText(/1298/i)).toBeInTheDocument();
    // nickname seller
    expect(screen.getByText(/QUIRINO BEBIDAS/i)).toBeInTheDocument();
    // sellerState
    expect(screen.getByText(/Capital Federal/i)).toBeInTheDocument();
    // imgs
    const imgTitle = screen.getByTestId("img-title-test-id");
    expect(imgTitle).toBeInTheDocument();
    const imgFreeShipping = screen.getByTestId("img-free-shipping-test-id");
    expect(imgFreeShipping).toBeInTheDocument();
  });

  test("I should navigate to the item detail page when I click on the item card.", () => {
    render(<CardItem item={mockItem} />);
    const card = screen.getByTestId("card-container-test-id");
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(`/items/${mockItem.item.id}`);
  });
});
