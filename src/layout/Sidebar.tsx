import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Icon, Tile, UserIcon } from "../components";
import { UserContext } from "../contexts/UserContext";

interface SidebarProps {
  setShowSidebar: (showSidebar: boolean) => void;
}

export const Sidebar: React.FunctionComponent<SidebarProps> = ({
  setShowSidebar
}) => {
  const { onLogout, user } = useContext(UserContext);

  return (
    <aside id="sidebar">
      <div id="sidebar-container">
        <section id="sidebar-top">
          <Tile>
            <div id="user-tile">
              <UserIcon color="green" username={user.identifier} />
              <div className="user-info">
                <span className="user-name">{user.identifier}</span>
                <span className="user-role">Admin</span>
              </div>
              <Icon
                className="sign-out"
                icon="fas fa-sign-out-alt"
                onClick={onLogout}
                size="lg"
              />
            </div>
          </Tile>
        </section>
        <section id="sidebar-bottom">
          <NavLink
            activeClassName="is-active"
            className="sidebar-item nostyle"
            onClick={() => setShowSidebar(false)}
            to="/devices"
          >
            Devices
          </NavLink>
          <NavLink
            activeClassName="is-active"
            className="sidebar-item nostyle"
            onClick={() => setShowSidebar(false)}
            to="/settings"
          >
            Settings
          </NavLink>
        </section>
      </div>
    </aside>
  );
};
