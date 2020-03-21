import classnames from "classnames";
import React from "react";

interface TileProps {
  className?: string;
  bright?: boolean;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  padded?: boolean;
}

export const Tile: React.FunctionComponent<TileProps> = ({
  children,
  className,
  bright,
  id,
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
      id={id}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
