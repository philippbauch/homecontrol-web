import classnames from "classnames";
import React from "react";
import { Breadcrumb, Breadcrumbs, Level } from "../components";
import { BreadcrumbProps } from "../components/Breadcrumb";

interface PageProps {
  action?: React.ReactNode;
  breadcrumbs?: BreadcrumbProps[];
  className?: string;
  id?: string;
  style?: any;
  title: string;
}

export const Page: React.FunctionComponent<PageProps> = ({
  action,
  breadcrumbs = [],
  children,
  className,
  id,
  style,
  title
}) => {
  return (
    <div className={classnames("page", className)} id={id} style={{ ...style }}>
      {breadcrumbs.length ? (
        <Breadcrumbs>
          {breadcrumbs.map(({ link, title }, index) => (
            <Breadcrumb key={index} link={link} title={title} />
          ))}
        </Breadcrumbs>
      ) : null}
      <Level className="page-header">
        <h2 className="page-title">{title}</h2>
        {action}
      </Level>
      {children}
    </div>
  );
};
