import React from "react";
import { Navigation } from "./Navigation";

export const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div id="layout">
      <Navigation />
      <main id="main">{children}</main>
    </div>
  );
};
