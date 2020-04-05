import React from "react";
import { useHistory } from "react-router-dom";
import { Status, Tile } from "../../components";
import { useUserDispatch, useUserState } from "../../contexts/UserContext";
import http from "../../HttpClient";

interface HomeItemProps {
  home: any;
}

export const HomeItem: React.FunctionComponent<HomeItemProps> = ({ home }) => {
  const history = useHistory();
  const user = useUserState();
  const userDispatch = useUserDispatch();

  const selectHome = () => {
    const update = {
      preferences: {
        activeHomeId: home._id,
      },
    };

    http.put(`/users/${user._id}`, update);

    userDispatch({
      type: "update_user",
      update,
    });

    history.push(`/homes/${home._id}`);
  };

  return (
    <Tile className="home-item" onClick={selectHome}>
      <div className="home-tile">
        <div className="home-info">
          <Status status="connected" />
          <span className="device-title">{home.name}</span>
        </div>
      </div>
    </Tile>
  );
};
