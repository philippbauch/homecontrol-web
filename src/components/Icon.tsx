import classnames from "classnames";
import React from "react";

export type IconType = "primary" | "success" | "danger";

export interface IconProps {
  className?: string;
  hflip?: boolean;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  size?: "sm" | "md" | "lg";
  style?: any;
  type?: IconType;
  vflip?: boolean;
}

export const Icon: React.FunctionComponent<IconProps> = ({
  children,
  className,
  hflip,
  id,
  onClick,
  size = "md",
  style,
  type,
  vflip,
}) => {
  return (
    <span
      className={classnames(className, "icon", `is-${size}`, {
        "flip-horizontal": hflip,
        "flip-vertical": vflip,
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
