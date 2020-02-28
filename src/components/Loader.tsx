import React, { Fragment } from "react";
import { Spinner } from "./Spinner";

interface LoaderProps {
  loading: boolean;
}

export const Loader: React.FunctionComponent<LoaderProps> = ({
  children,
  loading
}) => {
  return loading ? (
    <div className="loader">
      <Spinner></Spinner>
    </div>
  ) : (
    <Fragment>{children}</Fragment>
  );
};
