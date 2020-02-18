import React from "react";
import { Link } from "react-router-dom";
import { Burger } from "../components";

interface NavigationProps {
  showSidebar: boolean;
  toggleSidebar: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  showSidebar,
  toggleSidebar
}) => {
  return (
    <nav id="navigation">
      <div id="navigation-left">
        <Link className="nostyle" to="/">
          <h1>Home Control</h1>
        </Link>
      </div>
      <div id="navigation-right">
        <Burger onClick={toggleSidebar} open={showSidebar} />
      </div>
    </nav>
  );
};
