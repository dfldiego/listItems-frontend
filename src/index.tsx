import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ItemsProvider } from "./context/itemsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ItemsProvider>
      <App />
    </ItemsProvider>
  </React.StrictMode>
);
