import classnames from "classnames";
import React from "react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  padded?: boolean;
  style?: any;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, id, onClick, padded = true, style }, ref) => {
    return (
      <div
        className={classnames("card", className, {
          "is-clickable": !!onClick,
          "is-padded": padded,
        })}
        id={id}
        onClick={onClick}
        ref={ref}
        style={{ ...style }}
      >
        {children}
      </div>
    );
  }
);
