import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams
} from "react-router-dom";
import { ChangePassword } from "./ChangePassword";
import { DeleteUser } from "./DeleteUser";
import { LockUser } from "./LockUser";
import { client } from "../../api/client";
import { Loader, Tile, Tag } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { UserContext } from "../../contexts/UserContext";
import { Page } from "../../layout";

export const User: React.FunctionComponent = () => {
  const { defaultRoute, user } = useContext(UserContext);
  const history = useHistory();
  const { userId } = useParams();
  const [fetchedUser, setFetchedUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: "/users",
      title: "Benutzer"
    }
  ];

  const defaultPageTitle = "Benutzer";

  const fetchUser = useCallback(async () => {
    setLoading(true);

    try {
      const user = await client.get(`/users/${userId}`);

      setFetchedUser(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [userId]);

  const getAction = () => {
    const tag = <Tag>Administrator</Tag>;

    if (isOwnUser()) {
      return user.admin && tag;
    }

    return fetchedUser?.admin && tag;
  };

  const getLockLabel = () => {
    if ((isOwnUser() && user.locked) || fetchedUser?.locked) {
      return "Benutzer entsperren";
    } else {
      return "Benutzer sperren";
    }
  };

  const getPageTitle = () => {
    if (isOwnUser()) {
      return user.identifier;
    }

    return fetchedUser?.identifier || defaultPageTitle;
  };

  const goToChangePassword = () => {
    history.push(`/users/${userId}/password`);
  };

  const goToDeleteUser = () => {
    history.push(`/users/${userId}/delete`);
  };

  const goToLockUser = () => {
    history.push(`/users/${userId}/lock`);
  };

  const isOwnUser = useCallback(() => {
    return user._id === userId;
  }, [user._id, userId]);

  const isAuthorized = useCallback(() => {
    return user.admin || isOwnUser();
  }, [isOwnUser, user.admin]);

  useEffect(() => {
    if (isAuthorized() && !isOwnUser()) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser, isAuthorized, isOwnUser]);

  return isAuthorized() ? (
    <Switch>
      <Route
        path={`/users/:userId/password`}
        render={props => (
          <ChangePassword {...props} user={fetchedUser || user} />
        )}
      />
      <Route
        path={`/users/:userId/delete`}
        render={props => <DeleteUser {...props} user={fetchedUser || user} />}
      />
      <Route
        path={`/users/:userId/lock`}
        render={props => <LockUser {...props} user={fetchedUser || user} />}
      />
      <Route>
        <Page
          action={getAction()}
          breadcrumbs={user.admin && breadcrumbs}
          subtitle="Erstellt am 23.03.2020"
          title={getPageTitle()}
        >
          <Loader loading={loading}>
            <section id="user-menu">
              {user.admin && (
                <Tile className="user-menu-item" onClick={goToLockUser}>
                  <span>{getLockLabel()}</span>
                </Tile>
              )}
              <Tile className="user-menu-item" onClick={goToChangePassword}>
                <span>Passwort ändern</span>
              </Tile>
              <Tile className="user-menu-item" onClick={goToDeleteUser}>
                <span>Account löschen</span>
              </Tile>
            </section>
          </Loader>
        </Page>
      </Route>
    </Switch>
  ) : (
    <Redirect to={defaultRoute} />
  );
};
