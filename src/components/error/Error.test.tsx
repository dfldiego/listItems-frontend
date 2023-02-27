import { render, screen } from "@testing-library/react";
import Error from "./Error";

const PROPS_LOADING_FALSE = {
  error: "errorTest",
  loading: false,
};

const PROPS_LOADING_TRUE = {
  error: "errorTest",
  loading: true,
};

describe("<Error>", () => {
  test("should render correctly", () => {
    const { container } = render(<Error {...PROPS_LOADING_FALSE} />);
    expect(container).toMatchSnapshot();
  });

  test("should render the error message", () => {
    render(<Error {...PROPS_LOADING_FALSE} />);
    expect(screen.getByText(/errorTest/i)).toBeInTheDocument();
  });

  test("should not render the error message", () => {
    render(<Error {...PROPS_LOADING_TRUE} />);
    expect(screen.queryByText(/errorTest/i)).not.toBeInTheDocument();
  });
});
