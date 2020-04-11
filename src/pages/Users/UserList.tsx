import React, { useEffect, useState } from "react";
import { UserItem } from "./UserItem";
import { Loader } from "../../components";
import http from "../../HttpClient";

export const UserList: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);

    http
      .get(`/users`)
      .then(setUsers)
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Loader loading={loading}>
      <div className="user-list">
        {users.length ? (
          users.map((user) => <UserItem user={user} key={user._id} />)
        ) : (
          <span>Keine Benutzer gefunden.</span>
        )}
      </div>
    </Loader>
  );
};
