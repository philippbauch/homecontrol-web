import React, { useContext } from "react";
import { Status, Tile } from "../../components";
import { HomeContext } from "../../contexts/HomeContext";
import { useHistory } from "react-router-dom";

interface HomeItemProps {
  home: any;
}

export const HomeItem: React.FunctionComponent<HomeItemProps> = ({ home }) => {
  const { setHome } = useContext(HomeContext);
  const history = useHistory();

  const selectHome = () => {
    setHome(home);

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
