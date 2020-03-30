import React from "react";
import { useHistory } from "react-router-dom";
import { Level, Tag, Tile } from "../../components";
import { LockIcon } from "../../components/icons";

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
      <Level>
        <span className="user-info">
          {user.locked && <LockIcon size="sm" />}
          <span className="user-name">{user.identifier}</span>
        </span>
        {user.admin && <Tag>Administrator</Tag>}
      </Level>
    </Tile>
  );
};
