import React from "react";
import { Link } from "react-router-dom";

export const Navigation: React.FunctionComponent = () => {
  return (
    <nav id="navigation">
      <div id="navigation-left">
        <Link className="nostyle" to="/">
          <h1>Home Control</h1>
        </Link>
      </div>
      <div id="navigation-right">Philipp</div>
    </nav>
  );
};
