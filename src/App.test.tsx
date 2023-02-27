import { render } from "@testing-library/react";
import App from "./App";

describe("<App>", () => {
  test("<App /> render correctly", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
