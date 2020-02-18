import React from "react";
import { Tile } from "../components";

export const Sidebar: React.FunctionComponent = () => {
  return (
    <aside id="sidebar">
      <Tile>
        <div id="user-tile">Philipp</div>
      </Tile>
    </aside>
  );
};
