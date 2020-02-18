import React from "react";
import { Icon, Tile, UserIcon } from "../components";

export const Sidebar: React.FunctionComponent = () => {
  const signOut = () => {};

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
