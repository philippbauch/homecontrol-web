import React from "react";
import { Divider, Level } from "../components";

export const Rooms: React.FunctionComponent = () => {
  return (
    <div id="rooms-page">
      <div className="rooms-header">
        <Level>
          <h1>Räume</h1>
        </Level>
        <Divider />
      </div>
    </div>
  );
};
