import "./CardItem.css";
import { Item } from "../../interfaces";
import ic_shipping from "../../assets/ic_shipping.png";
import { useNavigate } from "react-router-dom";
type Props = {
  item: Item;
};

const CardItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const { author, item: itemElement } = item;
  const { id, picture, title, price, free_shipping, sellerState } = itemElement;

  const handleClick = (id: string) => {
    if (!id) return;
    navigate(`/items/${id}`);
  };

  return (
    <>
      <div
        className="cardItem_container"
        data-testid="card-container-test-id"
        onClick={() => handleClick(id)}
      >
        <img
          src={picture}
          alt={`${title}`}
          className="cardItem_img"
          data-testid="img-title-test-id"
        />
        <div className="cardItem_details">
          <div>
            <div className="cardItem_amount_shipping mt16">
              <div className="pr1">
                <span className="fontSize24">$ {price.amount}</span>
              </div>
              <div>
                {!free_shipping && (
                  <img
                    src={ic_shipping}
                    alt={"free_shipping"}
                    className="free_shipping_img"
                    data-testid="img-free-shipping-test-id"
                  />
                )}
              </div>
            </div>
            <div className="cardItem_title ">
              <span className="title">{title}</span>
            </div>
            <p className="fontSize12">{author.nickname}</p>
          </div>
          <div className="mt16 px32 cardItem_sellerState">
            <span className="fontSize12">{sellerState}</span>
          </div>
        </div>
      </div>

      <div className="cardItem_border"></div>
    </>
  );
};

export default CardItem;
