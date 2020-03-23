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
  const { onLogout } = useContext(UserContext);
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
              <h3 id="home-name">{home.name}</h3>
              <Icon icon="fas fa-sign-out-alt" onClick={showHomes} size="lg" />
            </Tile>
          </section>
        ) : null}
        <section id="sidebar-bottom">
          <NavLink
            activeClassName="is-active"
            className="sidebar-item nostyle"
            onClick={hideSidebar}
            to="/invitations"
          >
            Invitations
          </NavLink>
          <div className="sidebar-item" onClick={onLogout}>
            Log out
          </div>
        </section>
      </div>
    </aside>
  );
};
