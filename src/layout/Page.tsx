import classnames from "classnames";
import React from "react";
import { Breadcrumb, Breadcrumbs, Level } from "../components";
import { BreadcrumbProps } from "../components/Breadcrumb";

interface PageProps {
  breadcrumbs?: BreadcrumbProps[];
  className?: string;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
  id?: string;
  style?: any;
  subtitle?: string;
  title: React.ReactNode;
}

export const Page: React.FunctionComponent<PageProps> = ({
  breadcrumbs = [],
  children,
  className,
  extra,
  icon,
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
          <div>
            {icon}
            <h2 className="page-title">{title}</h2>
          </div>
          {extra}
        </Level>
        {subtitle && <span className="page-sub-title">{subtitle}</span>}
      </div>

      {children}
    </div>
  );
};
