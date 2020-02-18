import classnames from "classnames";
import React from "react";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
}

export const Spinner: React.FunctionComponent<SpinnerProps> = ({
  size = "md"
}) => {
  return (
    <div
      className={classnames("spinner", {
        "is-sm": size === "sm",
        "is-md": size === "md",
        "is-lg": size === "lg"
      })}
    ></div>
  );
};
