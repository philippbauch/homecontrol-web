import React from "react";
import { Link } from "react-router-dom";

export interface BreadcrumbProps {
  link: string;
  title: string;
}

export const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = ({
  link,
  title
}) => {
  return (
    <div className="breadcrumb">
      <Link to={link}>{title}</Link>
    </div>
  );
};
