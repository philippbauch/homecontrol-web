import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

interface PrivateRouteProps extends RouteProps {
  component?: any;
  path: string;
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
