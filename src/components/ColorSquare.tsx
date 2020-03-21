import classnames from "classnames";
import React from "react";

interface ColorSquareProps {
  color: "blue" | "green" | "pink" | "purple";
}

export const ColorSquare: React.FunctionComponent<ColorSquareProps> = ({
  color
}) => {
  return (
    <div
      className={classnames("color-square", {
        "is-blue": color === "blue",
        "is-green": color === "green",
        "is-pink": color === "pink",
        "is-purple": color === "purple"
      })}
    ></div>
  );
};
