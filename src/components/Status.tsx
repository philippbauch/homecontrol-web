import classnames from "classnames";
import React from "react";

interface StatusProps {
  connected: boolean;
}

export const Status: React.FunctionComponent<StatusProps> = ({ connected }) => {
  return (
    <span
      className={classnames("status", {
        "is-connected": connected,
        "is-disconnected": !connected,
      })}
    ></span>
  );
};
