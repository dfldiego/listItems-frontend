import { lazy } from "react";
import { Loadable } from "./Loadable";

const ProductDetail = Loadable(
  lazy(() => import("../pages/ProductDetail/ProductDetail"))
);

export const itemsRoutes = [
  {
    path: ":id",
    element: <ProductDetail />,
  },
];
