import { createContext, useReducer } from "react";
import { ItemsState } from "../interfaces";
import { itemsReducer } from "../reducers/itemsReducer";

export const initialState: ItemsState = {
  breadcrumbs: [],
};

export interface ItemsContextProps {
  itemsState: ItemsState;
  setBreadcrumbs: (breadcrumbs: string[]) => void;
}

export const ItemsContext = createContext({} as ItemsContextProps);

export const ItemsProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  const setBreadcrumbs = (breadcrumbs: string[] | []) => {
    dispatch({
      type: "SET_BREADCRUMBS",
      payload: breadcrumbs,
    });
  };

  return (
    <ItemsContext.Provider value={{ itemsState: state, setBreadcrumbs }}>
      {children}
    </ItemsContext.Provider>
  );
};
