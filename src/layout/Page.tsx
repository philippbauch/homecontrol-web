import classnames from "classnames";
import React from "react";
import { Breadcrumb, Breadcrumbs } from "../components";
import { BreadcrumbProps } from "../components/Breadcrumb";

interface PageProps {
  breadcrumbs?: BreadcrumbProps[];
  className?: string;
  id?: string;
  style?: any;
}

export const Page: React.FunctionComponent<PageProps> = ({
  breadcrumbs = [],
  children,
  className,
  id,
  style
}) => {
  return (
    <div className={classnames("page", className)} id={id} style={{ ...style }}>
      {breadcrumbs.length ? (
        <Breadcrumbs>
          {breadcrumbs.map(({ link, title }) => (
            <Breadcrumb link={link} title={title} />
          ))}
        </Breadcrumbs>
      ) : null}
      {children}
    </div>
  );
};
