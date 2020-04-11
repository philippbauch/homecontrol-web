import React from "react";
import { RoomItem } from "./RoomItem";

interface RoomListProps {
  rooms: any[];
}

export const RoomList: React.FunctionComponent<RoomListProps> = ({ rooms }) => {
  return (
    <div className="room-list">
      {rooms.length ? (
        rooms.map((room) => <RoomItem room={room} key={room._id} />)
      ) : (
        <span>Keine Räume gefunden.</span>
      )}
    </div>
  );
};
