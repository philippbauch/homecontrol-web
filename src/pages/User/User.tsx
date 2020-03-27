import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  useParams,
  Redirect,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { ChangePassword } from "./ChangePassword";
import { DeleteUser } from "./DeleteUser";
import { client } from "../../api/client";
import { Loader, Tile, Tag } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { UserContext } from "../../contexts/UserContext";
import { Page } from "../../layout";
import { LockUser } from "./LockUser";

export const User: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);
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

  const getPageTitle = () => {
    if (isOwnUser()) {
      return user.identifier;
    }

    return fetchedUser?.identifier || defaultPageTitle;
  };

  const goToChangePassword = () => {
    history.push(`/users/${userId}/password`);
  };

  const goToLockUser = () => {
    history.push(`/users/${userId}/lock`);
  };

  const goToDeleteUser = () => {
    history.push(`/users/${userId}/delete`);
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
        render={props => <DeleteUser {...props} userId={userId} />}
        path={`/users/${userId}/delete`}
      />
      <Route
        render={props => <LockUser {...props} userId={userId} />}
        path={`/users/${userId}/lock`}
      />
      <Route
        render={props => <ChangePassword {...props} userId={userId} />}
        path={`/users/${userId}/password`}
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
              <Tile className="user-menu-item" onClick={goToChangePassword}>
                <span>Passwort ändern</span>
              </Tile>
              {user.admin && (
                <Tile className="user-menu-item" onClick={goToLockUser}>
                  <span>Benutzer sperren</span>
                </Tile>
              )}
              <Tile className="user-menu-item" onClick={goToDeleteUser}>
                <span>Account löschen</span>
              </Tile>
            </section>
          </Loader>
        </Page>
      </Route>
    </Switch>
  ) : (
    <Redirect to="/" />
  );
};
