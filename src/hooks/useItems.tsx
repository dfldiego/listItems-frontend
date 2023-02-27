import { useContext } from "react";
import { ItemsContext } from "../context/itemsContext";

const useItems = () => useContext(ItemsContext);

export default useItems;
