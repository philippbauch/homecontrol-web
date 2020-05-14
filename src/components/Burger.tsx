import classnames from "classnames";
import React from "react";

interface BurgerProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  open: boolean;
}

export const Burger: React.FunctionComponent<BurgerProps> = ({
  onClick,
  open,
}) => {
  return (
    <div
      className={classnames("burger", { "is-open": open })}
      onClick={onClick}
    >
      <div className="burger-bars">
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
    </div>
  );
};
