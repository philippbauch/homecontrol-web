import React from "react";
import { HomeItem } from "./HomeItem";

interface HomeListProps {
  homes: any[];
}

export const HomeList: React.FunctionComponent<HomeListProps> = ({ homes }) => {
  return (
    <div className="home-list">
      {homes.length ? (
        homes.map(home => <HomeItem home={home} key={home._id} />)
      ) : (
        <span>No homes found.</span>
      )}
    </div>
  );
};
