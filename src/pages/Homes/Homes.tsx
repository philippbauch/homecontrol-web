import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeList } from "./HomeList";
import { HomeContext } from "../../contexts/HomeContext";
import { Page } from "../../layout";

export const Homes: React.FunctionComponent = () => {
  const { homes } = useContext(HomeContext);

  const action = <Link to="/homes/new">Hinzufügen</Link>;

  return (
    <Page action={action} title="Zuhause auswählen">
      <HomeList homes={homes} />
    </Page>
  );
};
