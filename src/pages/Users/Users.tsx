import React, { useCallback, useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { UserList } from "./UserList";
import { client } from "../../api/client";
import { Loader } from "../../components";
import { Page } from "../../layout";
import { AddUser } from "../AddUser";

export const Users: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const action = <Link to={`/users/new`}>Erstellen</Link>;

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
    <Switch>
      <Route component={AddUser} path={`/users/new`} />
      <Route>
        <Page action={action} title="Benutzer">
          <Loader loading={loading}>
            <UserList users={users} />
          </Loader>
        </Page>
      </Route>
    </Switch>
  );
};
