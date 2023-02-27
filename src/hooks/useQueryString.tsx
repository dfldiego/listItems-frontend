import { useLocation } from "react-router-dom";
import queryString from "query-string";

const useQueryString = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  return {
    ...query,
  };
};

export default useQueryString;
