import classnames from "classnames";
import React from "react";

type IconSize = "sm" | "md" | "lg";

interface IconProps {
  className?: string;
  icon: string;
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  size?: IconSize;
}

export const Icon: React.FunctionComponent<IconProps> = ({
  className,
  icon,
  onClick,
  size = "md"
}) => {
  return (
    <span
      className={classnames("icon", className, {
        "is-clickable": !!onClick,
        "is-sm": size === "sm",
        "is-md": size === "md",
        "is-lg": size === "lg"
      })}
      onClick={onClick}
    >
      <i className={icon}></i>
    </span>
  );
};
