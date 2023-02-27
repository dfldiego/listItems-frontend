import { useParams, useNavigate } from "react-router-dom";

import "./ProductDetail.css";
import { useItem } from "../../hooks";
import Search from "../../components/search/Search";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { itemResponse, error, loading } = useItem(params.id);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="page_container">
      <div className="page_search">
        <Search />
      </div>
      {!error && !loading && (
        <>
          <div className="page_breadcrumbs">
            <Breadcrumbs />
          </div>
          {itemResponse !== null &&
            Object.keys(itemResponse.item).length > 0 && (
              <div className="page_content">
                <div className="productdetail_firstColumn">
                  <img
                    src={itemResponse.item.picture}
                    alt={`${itemResponse.item.title}`}
                    className="cardItem_img_detail"
                    data-testid={"item-detail-img-test-id"}
                  />
                </div>
                <div className="productdetail_secondColumn">
                  <div className="productdetail_condition_sold_quantity">
                    {itemResponse.item.condition === "new" && (
                      <span>
                        {`Nuevo - ${itemResponse.item.sold_quantity} vendidos`}
                      </span>
                    )}
                  </div>
                  <div className="productdetail_title">
                    <span>{itemResponse.item.title}</span>
                  </div>
                  <div className="productdetail_amount">
                    <span>$ {itemResponse.item.price.amount}</span>
                    <span className="productdetail_amount_decimals">
                      {(itemResponse.item.price.decimals % 1)
                        .toFixed(2)
                        .slice(2)}
                    </span>
                  </div>
                  <div className="productdetail_btn">
                    <button
                      className="button_buy"
                      data-testid="button-test-id"
                      onClick={handleClick}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
                <div className="productdetail_second_row">
                  <div className="productdetail_description_title">
                    <span>Descripcion del producto</span>
                  </div>
                  <div className="productdetail_description">
                    <span>{itemResponse.item.description}</span>
                  </div>
                </div>
              </div>
            )}
        </>
      )}
      <Error loading={loading} error={error} />
      <Loading loading={loading} />
    </div>
  );
};

export default ProductDetail;
