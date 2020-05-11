import classnames from "classnames";
import React from "react";

interface TabProps {
  active?: boolean;
}

export const Tab: React.FunctionComponent<TabProps> = ({
  active,
  children,
}) => {
  return (
    <div className={classnames("tab", { "is-active": active })}>
      <div>{children}</div>
    </div>
  );
};
