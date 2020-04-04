import React from "react";
import { Link } from "react-router-dom";
import { HomeList } from "./HomeList";
import { useHomesState } from "../../contexts/HomesContext";
import { Page } from "../../layout";

export const Homes: React.FunctionComponent = () => {
  const homes = useHomesState();

  const extra = <Link to="/homes/new">Hinzufügen</Link>;

  return (
    <Page extra={extra} title="Zuhause auswählen">
      <HomeList homes={homes} />
    </Page>
  );
};
