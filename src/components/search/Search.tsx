import { useNavigate } from "react-router-dom";

import "./Search.css";
import ic_Search from "../../assets/ic_Search.png";
import Logo_ML from "../../assets/Logo_ML.png";
import useForm from "../../hooks/useForm";
import useQueryString from "../../hooks/useQueryString";

interface FormElements extends HTMLFormControlsCollection {
  searchText: HTMLInputElement;
}
interface SearchTextFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type Props = {
  setCurrentPage?: Function;
};

const Search = ({ setCurrentPage }: Props) => {
  const navigate = useNavigate();
  const { q = "" } = useQueryString();

  const { searchText, onInputChange } = useForm({
    searchText: (q as string) || "",
  });

  const handleSubmit = (event: React.FormEvent<SearchTextFormElement>) => {
    event.preventDefault();
    if (searchText.trim().length <= 1) return;
    if (setCurrentPage) setCurrentPage(0);
    navigate(`/items?q=${searchText.toLowerCase().trim()}`);
  };

  const handleClickLogo = () => {
    navigate("/");
  };

  return (
    <div className="search_container" data-testid="search-component-test-id">
      <div className="search_logo">
        <img
          src={Logo_ML}
          alt="MercadoLibre_logo"
          className="search_logo_img"
          data-testid="meli-logo-test-id"
          onClick={handleClickLogo}
        />
      </div>
      <div className="search_form">
        <form
          onSubmit={handleSubmit}
          className="search_form_row"
          aria-label="form"
        >
          <input
            type="text"
            placeholder="Nunca dejes de buscar"
            className="input-text"
            name="searchText"
            value={searchText}
            onChange={({ target }) => onInputChange(target.name, target.value)}
            autoComplete="off"
          />
          <button type="submit" className="search_button">
            <div>
              <img
                src={ic_Search}
                alt="Logotipo Buen Sabor"
                className="search_img"
              />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
