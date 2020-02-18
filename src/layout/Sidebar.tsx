import React from "react";
import { Tile, UserIcon } from "../components";

export const Sidebar: React.FunctionComponent = () => {
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
            </div>
          </Tile>
        </section>
        <section id="sidebar-bottom">Menu</section>
      </div>
    </aside>
  );
};
