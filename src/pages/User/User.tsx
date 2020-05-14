import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
} from "react-router-dom";
import { ChangePassword } from "./ChangePassword";
import { DeleteUser } from "./DeleteUser";
import { LockUser } from "./LockUser";
import { Level, Loader, Tile, Tag } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { useUserState } from "../../contexts/UserContext";
import http from "../../HttpClient";
import { Page } from "../../layout";

export const User: React.FunctionComponent = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [fetchedUser, setFetchedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const user = useUserState();

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: "/users",
      title: "Benutzer",
    },
  ];

  const defaultPageTitle = "Benutzer";

  const getExtra = () => {
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
      setLoading(true);

      http
        .get(`/users/${userId}`)
        .then(setFetchedUser)
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isAuthorized, isOwnUser, userId]);

  return isAuthorized() ? (
    <Switch>
      <Route
        path={`/users/:userId/password`}
        render={(props) => (
          <ChangePassword {...props} user={fetchedUser || user} />
        )}
      />
      <Route
        path={`/users/:userId/delete`}
        render={(props) => (
          <DeleteUser
            {...props}
            ownUser={isOwnUser()}
            user={fetchedUser || user}
          />
        )}
      />
      <Route
        path={`/users/:userId/lock`}
        render={(props) => <LockUser {...props} user={fetchedUser || user} />}
      />
      <Route>
        <Page
          extra={getExtra()}
          breadcrumbs={user.admin && breadcrumbs}
          title={getPageTitle()}
        >
          <Loader loading={loading}>
            <section id="user-details">
              <Level>
                <span>Erstellt am</span>
                <span>
                  {moment(user._id.getTimestamp()).format("DD.MM.YYYY")}
                </span>
              </Level>

              <Level>
                <span>Zuletzt eingeloggt</span>
                <span>{user.lastLogin.format("DD.MM.YYYY hh:mm:ss")}</span>
              </Level>
            </section>

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
    <Redirect to={"/courses"} />
  );
};
