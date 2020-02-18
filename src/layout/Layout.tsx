import React from "react";
import { Navigation } from "./Navigation";

export const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div id="layout">
      <div id="layout-container">
        <Navigation></Navigation>
        <main id="main">{children}</main>
      </div>
    </div>
  );
};
