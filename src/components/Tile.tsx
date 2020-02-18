import classnames from "classnames";
import React from "react";

interface TileProps {
  className?: string;
  dark?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  padded?: boolean;
}

export const Tile: React.FunctionComponent<TileProps> = ({
  children,
  className,
  dark,
  onClick,
  padded = true
}) => {
  return (
    <div
      className={classnames("tile", className, {
        "is-clickable": !!onClick,
        "is-dark": dark,
        "is-padded": padded
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
