import classnames from "classnames";
import React from "react";

interface UserIconProps {
  className?: string;
  dark?: boolean;
  user: any;
}

export const UserIcon: React.FunctionComponent<UserIconProps> = ({
  className,
  dark = false,
  user,
}) => {
  const letter = user.identifier[0];

  return (
    <div className={classnames("user-icon", className, { "is-dark": dark })}>
      <div className="user-letter">{letter}</div>
    </div>
  );
};
