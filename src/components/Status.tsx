import classnames from "classnames";
import React from "react";

type StatusType = "connected" | "disconnected";

interface StatusProps {
  status: StatusType;
}

export const Status: React.FunctionComponent<StatusProps> = ({ status }) => {
  return (
    <span
      className={classnames("status", {
        "is-connected": status === "connected",
        "is-disconnected": status === "disconnected"
      })}
    ></span>
  );
};
