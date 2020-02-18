import React from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  toggleSidebar: () => void;
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  toggleSidebar
}) => {
  return (
    <nav id="navigation">
      <div id="navigation-left">
        <Link className="nostyle" to="/">
          <h1>Home Control</h1>
        </Link>
      </div>
      <div id="navigation-right" onClick={toggleSidebar}>
        Philipp
      </div>
    </nav>
  );
};
