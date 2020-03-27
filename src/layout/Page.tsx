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
  subtitle?: string;
  title: string;
}

export const Page: React.FunctionComponent<PageProps> = ({
  action,
  breadcrumbs = [],
  children,
  className,
  id,
  style,
  subtitle,
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
      <div className="page-header">
        <Level>
          <h2 className="page-title">{title}</h2>
          {action}
        </Level>
        {subtitle && <span className="page-sub-title">{subtitle}</span>}
      </div>

      {children}
    </div>
  );
};
