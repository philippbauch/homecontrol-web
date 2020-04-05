import React from "react";
import { ResidentList } from "./ResidentList";
import { BreadcrumbProps } from "../../components/Breadcrumb";
import { useHome } from "../../contexts/HomesContext";
import { Page } from "../../layout";

export const Residents: React.FunctionComponent = () => {
  const home = useHome();

  const breadcrumbs: BreadcrumbProps[] = [
    {
      link: `/homes/${home._id}`,
      title: home.name as string,
    },
  ];

  return (
    <Page breadcrumbs={breadcrumbs} title="Bewohner">
      <ResidentList residents={home.residents} />
    </Page>
  );
};
