import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Icon, Tile } from "../components";
import { HomeContext } from "../contexts/HomeContext";
import { UserContext } from "../contexts/UserContext";

interface SidebarProps {
  setShowSidebar: (showSidebar: boolean) => void;
}

export const Sidebar: React.FunctionComponent<SidebarProps> = ({
  setShowSidebar
}) => {
  const { home } = useContext(HomeContext);
  const { onLogout, user } = useContext(UserContext);
  const history = useHistory();

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
              <Icon icon="fas fa-sign-out-alt" onClick={showHomes} />
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
          <div className="sidebar-item" onClick={onLogout}>
            Ausloggen
          </div>
        </section>
      </div>
    </aside>
  );
};
