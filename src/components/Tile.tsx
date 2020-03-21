import classnames from "classnames";
import React from "react";

interface TileProps {
  className?: string;
  bright?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  padded?: boolean;
}

export const Tile: React.FunctionComponent<TileProps> = ({
  children,
  className,
  bright,
  onClick,
  padded = true
}) => {
  return (
    <div
      className={classnames("tile", className, {
        "is-clickable": !!onClick,
        "is-bright": bright,
        "is-padded": padded
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
