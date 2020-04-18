import classnames from "classnames";
import React from "react";

interface TileProps {
  children?: React.ReactNode;
  className?: string;
  darker?: boolean;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  padded?: boolean;
}

export const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  ({ children, className, darker, id, onClick, padded = true }, ref) => {
    return (
      <div
        className={classnames("tile", className, {
          "is-clickable": !!onClick,
          "is-darker": darker,
          "is-padded": padded,
        })}
        id={id}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
