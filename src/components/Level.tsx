import classnames from "classnames";
import React from "react";

type LevelAlign = "top" | "center" | "bottom";

interface LevelProps {
  align?: LevelAlign;
  className?: string;
  style?: any;
}

export const Level: React.FunctionComponent<LevelProps> = ({
  align = "center",
  children,
  className,
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
      style={{ ...style }}
    >
      {children}
    </div>
  );
};
