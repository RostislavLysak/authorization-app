import { createElement } from "react";

interface ITest extends React.PropsWithChildren {
  component?: any;
}

const Test = ({ component = "div", children, ...props }: ITest) => {
  return createElement(
    component,
    {
      ...props,
      "data-to": true,
    },
    children,
  );
};

export default Test;
