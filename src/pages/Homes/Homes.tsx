import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeList } from "./HomeList";
import { HomeContext } from "../../contexts/HomeContext";
import { Page } from "../../layout";

export const Homes: React.FunctionComponent = () => {
  const { homes } = useContext(HomeContext);

  const extra = <Link to="/homes/new">Hinzufügen</Link>;

  return (
    <Page extra={extra} title="Zuhause auswählen">
      <HomeList homes={homes} />
    </Page>
  );
};
