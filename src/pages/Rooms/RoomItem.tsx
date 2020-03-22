import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Tile } from "../../components";
import { HomeContext } from "../../contexts/HomeContext";

interface RoomItemProps {
  room: any;
}

export const RoomItem: React.FunctionComponent<RoomItemProps> = ({ room }) => {
  const { home } = useContext(HomeContext);
  const history = useHistory();

  const selectRoom = () => {
    history.push(`/homes/${home._id}/rooms/${room._id}`);
  };

  return (
    <Tile className="room-item" onClick={selectRoom}>
      <div className="room-info">
        <span className="room-name">{room.name}</span>
      </div>
    </Tile>
  );
};
