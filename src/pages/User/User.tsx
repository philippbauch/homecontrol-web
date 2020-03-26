import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { ChangePassword } from "./ChangePassword";
import { DeleteUser } from "./DeleteUser";
import { client } from "../../api/client";
import { Divider, Loader } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { UserContext } from "../../contexts/UserContext";
import { Page } from "../../layout";

export const User: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);
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

  const getPageTitle = () => {
    if (isOwnUser()) {
      return user.identifier;
    }

    return fetchedUser?.identifier || defaultPageTitle;
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
    <Page breadcrumbs={user.admin && breadcrumbs} title={getPageTitle()}>
      <Loader loading={loading}>
        <Divider />
        <ChangePassword />
        <Divider />
        <DeleteUser user={user} />
      </Loader>
    </Page>
  ) : (
    <Redirect to="/" />
  );
};
