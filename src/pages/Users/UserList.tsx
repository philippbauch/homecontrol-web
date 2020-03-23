import React, { useCallback, useState, useEffect } from "react";
import { UserItem } from "./UserItem";
import { Loader } from "../../components";
import { client } from "../../api/client";

export const UserList: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    try {
      const users = await client.get(`/users`);

      setUsers(users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Loader loading={loading}>
      <div className="user-list">
        {users.length ? (
          users.map(user => <UserItem user={user} key={user._id} />)
        ) : (
          <span>No users found.</span>
        )}
      </div>
    </Loader>
  );
};
