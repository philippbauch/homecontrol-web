import React from "react";
import { Tile, Level } from "../../components";

interface UserItemProps {
  user: any;
}

export const UserItem: React.FunctionComponent<UserItemProps> = ({ user }) => {
  return (
    <Tile className="user-item">
      <Level className="user-info">
        <span className="user-name">{user.identifier}</span>
        {user.admin ? <span>Admin</span> : null}
      </Level>
    </Tile>
  );
};
