import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

const PROPS = {
  loading: true,
};

const PROPS_FALSE = {
  loading: false,
};

describe("<Loading>", () => {
  test("should render correctly", () => {
    const { container } = render(<Loading {...PROPS} />);
    expect(container).toMatchSnapshot();
  });

  test("should render the loading", () => {
    render(<Loading {...PROPS} />);
    const loading = screen.getByTestId("loading-test-id");
    expect(loading).toHaveClass("spinner");
  });

  test("should not render the error message", () => {
    render(<Loading {...PROPS_FALSE} />);
    expect(screen.queryByTestId("loading-test-id")).toBeFalsy();
  });
});
