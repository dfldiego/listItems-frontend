import { render, screen } from "@testing-library/react";
import Breadcrumbs from "./Breadcrumbs";

// useItems (mock de custom hook con useContext)
jest.mock("../../hooks/useItems.tsx", () => {
  return () => ({
    itemsState: {
      breadcrumbs: ["comida", "postre"],
    },
  });
});

describe("<Breadcrumbs>", () => {
  test("should render correctly", () => {
    const { container } = render(<Breadcrumbs />);
    expect(container).toMatchSnapshot();
  });

  test("should render an item", () => {
    render(<Breadcrumbs />);
    expect(screen.getByText(/comida/i)).toBeInTheDocument();
    expect(screen.getByText(/postre/i)).toBeInTheDocument();
  });
});
