import classnames from "classnames";
import React from "react";

interface PageProps {
  className?: string;
  id?: string;
  style?: any;
}

export const Page: React.FunctionComponent<PageProps> = ({
  children,
  className,
  id,
  style
}) => {
  return (
    <div className={classnames("page", className)} id={id} style={{ ...style }}>
      {children}
    </div>
  );
};
