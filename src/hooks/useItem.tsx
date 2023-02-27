import { useCallback, useEffect, useState } from "react";

import { getItemByIdAPI } from "../api/items";
import { defaultError } from "../constants";
import { ProductDetail } from "../interfaces";
import useIsMounted from "./useIsMounted";

const useItem = (id: string | undefined) => {
  const isMounted = useIsMounted();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [itemResponse, setItemResponse] = useState<ProductDetail | null>(null);

  const getItem = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await getItemByIdAPI(id as string);
      if (isMounted() && response) {
        setItemResponse(response.data.response);
        setError("");
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.response.data.msg ?? defaultError);
      setLoading(false);
    }
  }, [id, isMounted]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  return {
    itemResponse,
    error,
    loading,
  };
};

export default useItem;
