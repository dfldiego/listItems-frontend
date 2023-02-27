import { ItemsState } from "../interfaces";

type ItemsAction = { type: "SET_BREADCRUMBS"; payload: string[] };

export const itemsReducer = (
  state: ItemsState,
  action: ItemsAction
): ItemsState => {
  switch (action.type) {
    case "SET_BREADCRUMBS":
      const data = action.payload;
      return {
        ...state,
        breadcrumbs: data,
      };
    default:
      return state;
  }
};
