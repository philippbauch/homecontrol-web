import React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { Icon, Tile, UserIcon } from "../components";

interface SidebarProps extends RouteComponentProps {
  setShowSidebar: (showSidebar: boolean) => void;
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({
  history,
  setShowSidebar
}) => {
  const signOut = () => {
    history.push("/login");
  };

  return (
    <aside id="sidebar">
      <div id="sidebar-container">
        <section id="sidebar-top">
          <Tile>
            <div id="user-tile">
              <UserIcon color="green" username="Philipp" />
              <div className="user-info">
                <span className="user-name">Philipp</span>
                <span className="user-role">Admin</span>
              </div>
              <Icon
                className="sign-out"
                icon="fas fa-sign-out-alt"
                onClick={signOut}
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

export default withRouter(Sidebar);
