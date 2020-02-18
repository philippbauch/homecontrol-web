import classnames from "classnames";
import React, { useMemo } from "react";

type UserIconColor = "blue" | "green" | "red";

interface UserIconProps {
  color?: UserIconColor;
  username: string;
}

export const UserIcon: React.FunctionComponent<UserIconProps> = ({
  color = "blue",
  username
}) => {
  const symbol = useMemo(() => (username.length ? username[0] : "?"), [
    username
  ]);

  return (
    <div
      className={classnames("user-icon", {
        "is-blue": color === "blue",
        "is-green": color === "green",
        "is-red": color === "red"
      })}
    >
      <span className="user-symbol">{symbol}</span>
    </div>
  );
};
