import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { Loadable } from "./Loadable";

const BoxBrowse = Loadable(lazy(() => import("../pages/BoxBrowse/BoxBrowse")));
const Products = Loadable(lazy(() => import("../pages/Products/Products")));
const ProductDetail = Loadable(
  lazy(() => import("../pages/ProductDetail/ProductDetail"))
);

export const appRoutes = [
  {
    path: "",
    children: [
      {
        path: "/",
        element: <BoxBrowse />,
      },
      {
        path: "/items",
        element: <Products />,
      },
      {
        path: "items/:id",
        element: <ProductDetail />,
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
];
