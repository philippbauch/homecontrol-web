import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Burger } from "../components";
import { UserContext } from "../contexts/UserContext";

interface NavigationProps {
  setShowSidebar: (showSidebar: boolean) => void;
  showSidebar: boolean;
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  setShowSidebar,
  showSidebar
}) => {
  const { user } = useContext(UserContext);

  return (
    <nav id="navigation">
      <div id="navigation-left">
        <Burger
          onClick={() => setShowSidebar(!showSidebar)}
          open={showSidebar}
        />
        <Link
          className="nostyle"
          id="navigation-brand"
          onClick={() => setShowSidebar(false)}
          to={
            user.preferences.activeHomeId
              ? `/homes/${user.preferences.activeHomeId}`
              : "/homes"
          }
        >
          <h1>Home</h1>
        </Link>
      </div>
      <div id="navigation-right">
        <Link
          className="nostyle"
          id="navigation-username"
          onClick={() => setShowSidebar(false)}
          to={`/users/${user.identifier}`}
        >
          {user.identifier}
        </Link>
      </div>
    </nav>
  );
};
