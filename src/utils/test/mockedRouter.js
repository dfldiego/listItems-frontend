import { BrowserRouter, Route, Routes } from "react-router-dom";

export const MockedRouter = ({ component, params = {} }) => {
  const Component = component;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Component {...params} />} />
      </Routes>
    </BrowserRouter>
  );
};
