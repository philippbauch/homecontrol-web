import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
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
  const history = useHistory();

  const hideSidebar = () => setShowSidebar(false);

  const getDefaultRoute = () => {
    const { activeHomeId } = user.preferences;

    return activeHomeId ? `/homes/${activeHomeId}` : "/homes";
  };

  const goToDefaultRoute = () => {
    hideSidebar();

    history.push(getDefaultRoute());
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
