import React from "react";
import { Burger } from "../components";

interface SubnavigationProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Subnavigation: React.FunctionComponent<SubnavigationProps> = ({
  showSidebar,
  toggleSidebar,
}) => {
  return (
    <nav className="subnavigation">
      <Burger onClick={toggleSidebar} open={showSidebar} />
      <h3 className="subnavigation-coursename">Mobile verteilte Systeme</h3>
    </nav>
  );
};
