import classnames from "classnames";
import React from "react";

type LevelAlign = "top" | "center" | "bottom";

interface LevelProps {
  align?: LevelAlign;
  className?: string;
  id?: string;
  style?: any;
}

export const Level: React.FunctionComponent<LevelProps> = ({
  align = "center",
  children,
  className,
  id,
  style
}) => {
  return (
    <div
      className={classnames(
        "level",
        className,
        { "align-top": align === "top" },
        { "align-center": align === "center" },
        { "align-bottom": align === "bottom" }
      )}
      id={id}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};
