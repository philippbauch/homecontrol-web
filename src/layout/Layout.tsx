import React, { useState } from "react";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";

export const Layout: React.FunctionComponent = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div id="layout">
      <Navigation toggleSidebar={toggleSidebar} />
      <div id="main">
        {showSidebar ? <Sidebar /> : null}
        <main id="page-container">{children}</main>
      </div>
    </div>
  );
};
