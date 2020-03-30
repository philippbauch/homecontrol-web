import classnames from "classnames";
import React from "react";

type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  className?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  size?: IconSize;
  style?: any;
}

export const Icon: React.FunctionComponent<IconProps> = ({
  className,
  children,
  id,
  onClick,
  size = "md",
  style
}) => {
  return (
    <span
      className={classnames("icon", className, {
        "is-clickable": !!onClick,
        "is-sm": size === "sm",
        "is-md": size === "md",
        "is-lg": size === "lg"
      })}
      id={id}
      onClick={onClick}
      style={{ ...style }}
    >
      {children}
    </span>
  );
};
