import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, Status, Tile } from "../../components";

interface AddHomeProps {
  home: any;
}

export const AddHome: React.FunctionComponent<AddHomeProps> = ({ home }) => {
  const history = useHistory();

  const handleHomeSelect = (home: any) => {
    history.push(`/homes/${home._id}`);
  };
  return (
    <Tile
      className="home-item"
      dark={true}
      onClick={() => handleHomeSelect(home)}
    >
      <div className="home-tile">
        <div className="home-info">
          <Status status="connected" />
          <span className="device-title">{home.name}</span>
        </div>
        <Icon icon="fas fa-chevron-right" size="sm" />
      </div>
    </Tile>
  );
};
