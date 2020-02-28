import classnames from "classnames";
import React from "react";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  primary?: boolean;
  size?: SpinnerSize;
}

export const Spinner: React.FunctionComponent<SpinnerProps> = ({
  primary = true,
  size = "md"
}) => {
  return (
    <div
      className={classnames("spinner", {
        "is-primary": primary,
        "is-sm": size === "sm",
        "is-md": size === "md",
        "is-lg": size === "lg"
      })}
    ></div>
  );
};
