import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Icon, Tile } from "../components";
import { UserContext } from "../contexts/UserContext";
import { HomeContext } from "../contexts/HomeContext";

interface SidebarProps {
  setShowSidebar: (showSidebar: boolean) => void;
}

export const Sidebar: React.FunctionComponent<SidebarProps> = ({
  setShowSidebar
}) => {
  const { home } = useContext(HomeContext);
  const { onLogout } = useContext(UserContext);
  const history = useHistory();

  const showHomes = () => {
    setShowSidebar(false);

    history.push("/homes");
  };

  return (
    <aside id="sidebar">
      <div id="sidebar-container">
        <section id="sidebar-top">
          {home ? (
            <Tile bright={true}>
              <div id="user-tile">
                <div className="user-info">
                  <span className="user-name">{home.name}</span>
                </div>
                <Icon
                  className="sign-out"
                  icon="fas fa-sign-out-alt"
                  onClick={showHomes}
                  size="lg"
                />
              </div>
            </Tile>
          ) : null}
        </section>
        <section id="sidebar-bottom">
          <NavLink
            activeClassName="is-active"
            className="sidebar-item nostyle"
            onClick={() => setShowSidebar(false)}
            to="/invitations"
          >
            Invitations
          </NavLink>
          <NavLink
            activeClassName="is-active"
            className="sidebar-item nostyle"
            onClick={() => setShowSidebar(false)}
            to="/settings"
          >
            Settings
          </NavLink>
          <div className="sidebar-item" onClick={onLogout}>
            Log out
          </div>
        </section>
      </div>
    </aside>
  );
};
