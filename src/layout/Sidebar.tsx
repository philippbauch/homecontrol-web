import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Icon, Tile, UserIcon } from "../components";

const Sidebar: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
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
        <section id="sidebar-bottom">Menu</section>
      </div>
    </aside>
  );
};

export default withRouter(Sidebar);
