import React, { useState, useEffect } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import { Burger, Tile, Status } from "../components";
import { useUserState, useLogout } from "../contexts/UserContext";
import { useDefaultRoute } from "../hooks";
import { SignOutIcon } from "../components/icons";
import { useHome } from "../contexts/HomesContext";
import http from "../HttpClient";
import ws from "../WebSocketClient";

export const Navigation: React.FunctionComponent = () => {
  const defaultRoute = useDefaultRoute();
  const history = useHistory();
  const home = useHome();
  const logout = useLogout();
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(
    ws.isConnected()
  );
  const [showSidebar, setShowSidebar] = useState(false);
  const user = useUserState();

  const handleLogout = () => {
    http.post("/logout").then(logout);
  };

  const showHomes = () => {
    setShowSidebar(false);

    history.push("/homes");
  };

  const hideSidebar = () => setShowSidebar(false);

  const goToDefaultRoute = () => {
    hideSidebar();

    history.push(defaultRoute);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    const off = ws.on("open", () => setIsWebSocketConnected(true));

    return off;
  }, []);

  useEffect(() => {
    const off = ws.on("closed", () => setIsWebSocketConnected(false));

    return off;
  }, []);

  return (
    <nav id="navigation">
      <section className="navigation-header">
        <div className="navigation-left">
          <Burger onClick={toggleSidebar} open={showSidebar} />
          <h1 className="navigation-brand" onClick={goToDefaultRoute}>
            Home
          </h1>
        </div>
        <div className="navigation-right">
          <Link
            className="nostyle"
            id="navigation-username"
            onClick={() => setShowSidebar(false)}
            to={`/users/${user._id}`}
          >
            {user.identifier}
          </Link>
          <Status connected={isWebSocketConnected} />
        </div>
      </section>
      {showSidebar && (
        <section className="navigation-extension">
          {home ? (
            <Tile className="home-tile" darker={true}>
              <span>{home.name}</span>
              <SignOutIcon onClick={showHomes} />
            </Tile>
          ) : null}
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
