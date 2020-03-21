import classnames from "classnames";
import React from "react";

interface CardProps {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  padded?: boolean;
  style?: any;
}

export const Card: React.FunctionComponent<CardProps> = ({
  children,
  className,
  onClick,
  padded = true,
  style
}) => {
  return (
    <div
      className={classnames("card", className, {
        "is-clickable": !!onClick,
        "is-padded": padded
      })}
      onClick={onClick}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};
