import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeList } from "./HomeList";
import { HomeContext } from "../../contexts/HomeContext";
import { Page } from "../../layout";

export const Homes: React.FunctionComponent = () => {
  const { homes } = useContext(HomeContext);

  const action = <Link to="/homes/new">Add</Link>;

  return (
    <Page action={action} title="Select your home">
      <HomeList homes={homes} />
    </Page>
  );
};
