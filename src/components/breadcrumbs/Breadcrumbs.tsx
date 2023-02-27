import "./Breadcrumbs.css";
import useItems from "../../hooks/useItems";

const Breadcrumbs = () => {
  const {
    itemsState: { breadcrumbs },
  } = useItems();

  const renderBreadcrumbs = (index: number, item: string) => {
    if (index === breadcrumbs.length - 1) {
      return <span className="breadcrumbs_item_bold">{item}</span>;
    }
    return <span className="breadcrumbs_item">{item}</span>;
  };

  return (
    <>
      <ul
        className="breadcrumbs_ul"
        data-testid="breadcrumbs-component-test-id"
      >
        {breadcrumbs.length > 0 &&
          breadcrumbs.map((item: any, index: number) => (
            <li key={item} className="breadcrumbs_li">
              {renderBreadcrumbs(index, item)}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Breadcrumbs;
