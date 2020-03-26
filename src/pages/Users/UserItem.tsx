import React from "react";
import { Level, Tag, Tile } from "../../components";
import { useHistory } from "react-router-dom";

interface UserItemProps {
  user: any;
}

export const UserItem: React.FunctionComponent<UserItemProps> = ({ user }) => {
  const history = useHistory();

  const goToUser = () => {
    history.push(`/users/${user._id}`);
  };

  return (
    <Tile className="user-item" onClick={goToUser}>
      <Level className="user-info">
        <span className="user-name">{user.identifier}</span>
        {user.admin ? <Tag>Administrator</Tag> : null}
      </Level>
    </Tile>
  );
};
