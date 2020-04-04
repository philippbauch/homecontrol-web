import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Tile } from "../components";
import { SignOutIcon } from "../components/icons";
import { useHome } from "../contexts/HomesContext";
import { useUserState, useLogout } from "../contexts/UserContext";
import http from "../HttpClient";

interface SidebarProps {
  setShowSidebar: (showSidebar: boolean) => void;
}

export const Sidebar: React.FunctionComponent<SidebarProps> = ({
  setShowSidebar,
}) => {
  const home = useHome();
  const history = useHistory();
  const logout = useLogout();
  const user = useUserState();

  const handleLogout = () => {
    http.post("/logout").then(logout);
  };

  const hideSidebar = () => setShowSidebar(false);

  const showHomes = () => {
    setShowSidebar(false);

    history.push("/homes");
  };

  return (
    <aside id="sidebar">
      <div id="sidebar-content">
        {home ? (
          <section id="sidebar-top">
            <Tile darker={true} id="home-tile">
              <span id="home-name">{home.name}</span>
              <SignOutIcon onClick={showHomes} />
            </Tile>
          </section>
        ) : null}
        <section id="sidebar-bottom">
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
        </section>
      </div>
    </aside>
  );
};
