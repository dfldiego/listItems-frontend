import { useCallback, useEffect, useState } from "react";
import { getItemsByQueryAPI } from "../../api/items";

import "./Products.css";
import { Item } from "../../interfaces/index";
import useIsMounted from "../../hooks/useIsMounted";
import { defaultError } from "../../constants";

import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Search from "../../components/search/Search";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import CardItem from "../../components/cardItem/CardItem";
import { useItems, useQueryString } from "../../hooks";

const Products = () => {
  const isMounted = useIsMounted();
  const { q = "" } = useQueryString();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState<Item[] | never[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const {
    setBreadcrumbs,
    itemsState: { breadcrumbs },
  } = useItems();

  const getProducts = useCallback(async () => {
    if (q === "") return;
    try {
      setLoading(true);
      const response = await getItemsByQueryAPI(
        q as string,
        currentPage.toString(),
        "4"
      );
      if (isMounted() && response) {
        checkRenderBreadcrumbs(response.data.response.categories);
        setItems(response.data.response.items);
        setTotalPages(response.data.response.totalPages);
        setError("");
        setLoading(false);
      }
    } catch (error: any) {
      setError(error.response.data.msg ?? defaultError);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, currentPage, isMounted]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const checkRenderBreadcrumbs = (categoriesResponse: string[] | []) => {
    if (JSON.stringify(breadcrumbs) !== JSON.stringify(categoriesResponse)) {
      setBreadcrumbs(categoriesResponse);
    }
  };

  const handlePrevPage = (newPage: number) => {
    if (currentPage === 0 && newPage < currentPage) return;
    setCurrentPage(newPage);
  };
  const handleNextPage = (newPage: number) => {
    if (currentPage === totalPages && newPage > currentPage) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="page_container">
      <div className="page_search">
        <Search setCurrentPage={setCurrentPage} />
      </div>
      {!error && (
        <div className="page_breadcrumbs">
          <Breadcrumbs />
        </div>
      )}
      {!error && !loading && (
        <>
          <div className="page_content">
            {items.length > 0 &&
              items.map((item) => <CardItem key={item.item.id} item={item} />)}
          </div>
          <div className="pagination_button_one">
            <button
              className={`button_pagination ${
                currentPage === 0 ? "disabled" : ""
              }`}
              onClick={() => handlePrevPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              &lt;
            </button>
          </div>
          <div className="pagination_button_two">
            <button
              className={`button_pagination ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => handleNextPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
      <Loading loading={loading} />
      <Error loading={loading} error={error} />
    </div>
  );
};

export default Products;
