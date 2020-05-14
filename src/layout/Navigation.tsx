import React, { useState } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { Status, UserIcon, Dropdown, Level } from "../components";
import { useUserState } from "../contexts/UserContext";
import { useLogout, useSocket } from "../hooks";
import http from "../HttpClient";
import { SignOutIcon } from "../components/icons";

export const Navigation: React.FunctionComponent = () => {
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

    history.push("/courses");
  };

  return (
    <nav id="navigation">
      <section className="navigation-header">
        <div className="navigation-left">
          <h1 className="navigation-brand" onClick={goToDefaultRoute}>
            teapot
          </h1>
        </div>
        <div className="navigation-right">
          <Status connected={connected} />
          <Dropdown
            className="navigation-dropdown"
            trigger={() => <UserIcon dark={true} user={user} />}
          >
            <div className="navigation-dropdown-item">
              <Link
                className="nostyle"
                onClick={() => setShowSidebar(false)}
                to={`/users/${user._id}`}
              >
                Account
              </Link>
            </div>
            <div className="navigation-dropdown-item">
              <Level>
                <span>Ausloggen</span>
                <SignOutIcon size="sm" />
              </Level>
            </div>
          </Dropdown>
        </div>
      </section>
      {showSidebar && (
        <section className="navigation-extension">
          <div className="navigation-menu-vertical">
            <NavLink
              activeClassName="is-active"
              className="sidebar-item nostyle"
              onClick={hideSidebar}
              to="/courses"
            >
              Meine Kurse
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="sidebar-item nostyle"
              onClick={hideSidebar}
              to="/courses"
            >
              Katalog
            </NavLink>
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
            <div className="sidebar-item" onClick={handleLogout}>
              Ausloggen
            </div>
          </div>
        </section>
      )}
    </nav>
  );
};
