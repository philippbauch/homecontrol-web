import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Burger } from "../components";
import { useUserState } from "../contexts/UserContext";
import { useDefaultRoute } from "../hooks";

interface NavigationProps {
  setShowSidebar: (showSidebar: boolean) => void;
  showSidebar: boolean;
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  setShowSidebar,
  showSidebar
}) => {
  const user = useUserState();
  const defaultRoute = useDefaultRoute();
  const history = useHistory();

  const hideSidebar = () => setShowSidebar(false);

  const goToDefaultRoute = () => {
    hideSidebar();

    history.push(defaultRoute);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <nav id="navigation">
      <div id="navigation-left">
        <Burger onClick={toggleSidebar} open={showSidebar} />
        <h1 id="navigation-brand" onClick={goToDefaultRoute}>
          Home
        </h1>
      </div>
      <div id="navigation-right">
        <Link
          className="nostyle"
          id="navigation-username"
          onClick={() => setShowSidebar(false)}
          to={`/users/${user._id}`}
        >
          {user.identifier}
        </Link>
      </div>
    </nav>
  );
};
