import React from "react";
import { Link } from "react-router-dom";
import { Burger } from "../components";

interface NavigationProps {
  setShowSidebar: (showSidebar: boolean) => void;
  showSidebar: boolean;
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  setShowSidebar,
  showSidebar
}) => {
  return (
    <nav id="navigation">
      <div id="navigation-left">
        <Burger
          onClick={() => setShowSidebar(!showSidebar)}
          open={showSidebar}
        />
        <Link
          className="nostyle"
          id="brand"
          onClick={() => setShowSidebar(false)}
          to="/home"
        >
          <h1>Home</h1>
        </Link>
      </div>
      <div id="navigation-right">Philipp</div>
    </nav>
  );
};
