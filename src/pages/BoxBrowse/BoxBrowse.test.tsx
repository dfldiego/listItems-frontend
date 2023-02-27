import { render, screen } from "@testing-library/react";
import BoxBrowse from "./BoxBrowse";

jest.mock("query-string", () => ({
  parse: jest.fn(),
}));

jest.mock("../../hooks/useQueryString", () => {
  return () => ({
    q: "",
  });
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("<BoxBrowse>", () => {
  test("should render correctly", () => {
    const { container } = render(<BoxBrowse />);
    expect(container).toMatchSnapshot();
  });
  test("should contain search component", () => {
    render(<BoxBrowse />);
    const searchComponent = screen.getByTestId("search-component-test-id");
    expect(searchComponent).toBeInTheDocument();
  });
});
