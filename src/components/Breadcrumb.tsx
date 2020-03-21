import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  link: string;
}

export const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = ({
  children,
  link
}) => {
  return (
    <div className="breadcrumb">
      <Link to={link}>{children}</Link>
    </div>
  );
};
