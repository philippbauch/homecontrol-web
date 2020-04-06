import React, { useState } from "react";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";

export const Layout: React.FunctionComponent = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div id="layout">
      {showSidebar ? <Sidebar setShowSidebar={setShowSidebar} /> : null}
      <Navigation setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <main id="main">{children}</main>
    </div>
  );
};
