import React, { useState } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { Status, UserIcon } from "../components";
import { useUserState } from "../contexts/UserContext";
import { useDefaultRoute, useLogout, useSocket } from "../hooks";
import http from "../HttpClient";
import { ChevronIcon } from "../components/icons";

export const Navigation: React.FunctionComponent = () => {
  const defaultRoute = useDefaultRoute();
  const history = useHistory();
  const logout = useLogout();
  const { connected } = useSocket();
  const [showSidebar, setShowSidebar] = useState(false);
  const user = useUserState();

  const handleLogout = () => {
    http.post("/logout").then(logout);
  };

  const hideSidebar = () => setShowSidebar(false);

  const goToDefaultRoute = () => {
    hideSidebar();

    history.push(defaultRoute);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <nav id="navigation">
      <section className="navigation-header">
        <div className="navigation-left">
          <h1 className="navigation-brand" onClick={goToDefaultRoute}>
            teapot
          </h1>
        </div>
        <div className="navigation-right" onClick={toggleSidebar}>
          <Status connected={connected} />
          <Link
            className="nostyle navigation-username"
            onClick={() => setShowSidebar(false)}
            to={`/users/${user._id}`}
          >
            {user.identifier}
          </Link>
          <UserIcon dark={true} user={user} />
          <ChevronIcon
            className="navigation-dropdown"
            size="sm"
            vflip={showSidebar}
          />
        </div>
      </section>
      {showSidebar && (
        <section className="navigation-extension">
          <div className="navigation-menu-vertical">
            {user.admin ? (
              <NavLink
                activeClassName="is-active"
                className="sidebar-item nostyle"
                onClick={hideSidebar}
                to="/users"
              >
                Benutzer
              </NavLink>
            ) : null}
            <NavLink
              activeClassName="is-active"
              className="sidebar-item nostyle"
              onClick={hideSidebar}
              to="/invitations"
            >
              Einladungen
            </NavLink>
            <div className="sidebar-item" onClick={handleLogout}>
              Ausloggen
            </div>
          </div>
        </section>
      )}
    </nav>
  );
};
