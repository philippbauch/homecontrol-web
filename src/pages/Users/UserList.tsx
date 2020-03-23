import React from "react";
import { UserItem } from "./UserItem";

interface UserListProps {
  users: any[];
}

export const UserList: React.FunctionComponent<UserListProps> = ({ users }) => {
  return (
    <div className="user-list">
      {users.length ? (
        users.map(user => <UserItem user={user} key={user._id} />)
      ) : (
        <span>No users found.</span>
      )}
    </div>
  );
};
