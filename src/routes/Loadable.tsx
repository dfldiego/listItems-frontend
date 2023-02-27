import { LazyExoticComponent, Suspense } from "react";

type JSXComponent = () => JSX.Element;
type ComponentElement = LazyExoticComponent<JSXComponent> | JSXComponent;

export const Loadable = (Component: ComponentElement) => (props: any) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
