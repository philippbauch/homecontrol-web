import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import { Divider } from "../../components";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { UserContext } from "../../contexts/UserContext";
import { Page } from "../../layout";
import { ChangePassword } from "./ChangePassword";

export const User: React.FunctionComponent = () => {
  const { user } = useContext(UserContext);
  const { userId } = useParams();

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: "/users",
      title: "Benutzer"
    }
  ];

  if (!user.admin && user._id !== userId) {
    return <Redirect to="/" />;
  }

  return (
    <Page breadcrumbs={user.admin && breadcrumbs} title="Benutzer">
      <Divider />
      <ChangePassword />
    </Page>
  );
};
