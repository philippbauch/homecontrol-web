import React, { useCallback, useState, useEffect } from "react";
import { UserItem } from "./UserItem";
import { Loader } from "../../components";
import http from "../../HttpClient";

export const UserList: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    http
      .get(`/users`)
      .then(setUsers)
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
