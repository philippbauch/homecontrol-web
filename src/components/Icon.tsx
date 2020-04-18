import classnames from "classnames";
import React from "react";

export type IconType = "primary" | "success" | "danger";

export interface IconProps {
  className?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  size?: "sm" | "md" | "lg";
  style?: any;
  type?: IconType;
}

export const Icon: React.FunctionComponent<IconProps> = ({
  children,
  className,
  id,
  onClick,
  size = "md",
  style,
  type,
}) => {
  return (
    <span
      className={classnames(className, "icon", `is-${size}`, {
        "is-clickable": !!onClick,
        [`is-${type}`]: type,
      })}
      id={id}
      onClick={onClick}
      style={{ ...style }}
    >
      {children}
    </span>
  );
};
