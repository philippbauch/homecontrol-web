import React from "react";
import { Divider, Level } from "../components";

export const Home: React.FunctionComponent = () => {
  return (
    <div id="home-page">
      <div className="rooms-header">
        <Level>
          <h1>Rooms</h1>
        </Level>
        <Divider />
      </div>
    </div>
  );
};
