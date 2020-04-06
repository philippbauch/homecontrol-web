import React from "react";
import { Link } from "react-router-dom";
import { ResidentList } from "./ResidentList";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { useHome } from "../../contexts/HomesContext";
import { Page } from "../../layout";
import { Divider, Level } from "../../components";

export const Residents: React.FunctionComponent = () => {
  const home = useHome();

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: `/homes/${home._id}`,
      title: home.name as string,
    },
  ];

  const extra = <Link to={`/homes/${home._id}/invite`}>Einladen</Link>;

  return (
    <Page breadcrumbs={breadcrumbs} extra={extra} title="Bewohner">
      <ResidentList residents={home.residents} />
      <Divider />
      <section id="home-invitations">
        <Level id="home-invitations-header">
          <h3 id="home-invitations-title">Einladungen</h3>
        </Level>
        <div>Keine ausstehenden Einladungen.</div>
      </section>
    </Page>
  );
};
