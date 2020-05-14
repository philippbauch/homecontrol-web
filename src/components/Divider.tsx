import classnames from "classnames";
import React from "react";

interface DividerProps {
  size?: "sm" | "md" | "lg";
}

export const Divider: React.FunctionComponent<DividerProps> = ({
  size = "md",
}) => {
  return <div className={classnames("divider", `is-${size}`)} />;
};
