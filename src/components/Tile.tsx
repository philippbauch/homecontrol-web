import classnames from "classnames";
import React from "react";

interface TileProps {
  dark?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  padded?: boolean;
}

export const Tile: React.FunctionComponent<TileProps> = ({
  children,
  dark,
  onClick,
  padded = true
}) => {
  return (
    <div
      className={classnames("tile", {
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
