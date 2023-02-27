import { fireEvent, render, screen } from "@testing-library/react";
import * as router from "react-router-dom";

import { MockedRouter } from "../../utils/test/mockedRouter";
import Search from "./Search";

jest.mock("query-string", () => ({
  parse: jest.fn(),
}));

// useQueryString (mock custom hook)
jest.mock("../../hooks/useQueryString", () => {
  return () => ({
    q: "algo",
  });
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("<Search>", () => {
  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
  });

  test("should render correctly", () => {
    const { container } = render(<MockedRouter component={Search} />);
    expect(container).toMatchSnapshot();
  });

  test("should navigate to home page when i click the logo", () => {
    render(<MockedRouter component={Search} />);
    const logo = screen.getByTestId("meli-logo-test-id");
    fireEvent.click(logo);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/");
  });

  test("should submit and navigate correctly when the text as more than one letter", () => {
    render(<MockedRouter component={Search} />);

    const form = screen.getByRole("form");
    const input = screen.getByRole("textbox");
    fireEvent.input(input, { target: { value: "zapatillas" } });
    fireEvent.submit(form);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith("/items?q=zapatillas");
  });

  test("should submit correctly but not navigate when the text as one or zero letter", () => {
    render(<MockedRouter component={Search} />);

    const form = screen.getByRole("form");
    const input = screen.getByRole("textbox");
    fireEvent.input(input, { target: { value: "z" } });
    fireEvent.submit(form);

    expect(navigate).not.toHaveBeenCalled();
  });
});
