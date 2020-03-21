import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeList } from "./HomeList";
import { Level } from "../../components";
import { HomeContext } from "../../contexts/HomeContext";
import { Page } from "../../layout";

export const Homes: React.FunctionComponent = () => {
  const { homes } = useContext(HomeContext);

  return (
    <Page>
      <Level id="homes-header">
        <h2 id="homes-title">Select your home</h2>
        <Link to="/homes/new">Add</Link>
      </Level>
      <HomeList homes={homes} />
    </Page>
  );
};
