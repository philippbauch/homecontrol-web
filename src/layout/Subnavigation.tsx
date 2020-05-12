import React from "react";
import { Burger } from "../components";

export const Subnavigation: React.FunctionComponent = () => {
  return (
    <nav className="subnavigation">
      <Burger onClick={() => {}} open={false} />
      <h3 className="subnavigation-coursename">Mobile verteilte Systeme</h3>
    </nav>
  );
};
