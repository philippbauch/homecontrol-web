import classnames from "classnames";
import React from "react";

interface UserIconProps {
  big?: boolean;
  className?: string;
  dark?: boolean;
  name: string;
}

export const Avatar: React.FunctionComponent<UserIconProps> = ({
  big,
  className,
  dark = false,
  name,
}) => {
  const letter = name?.length ? name[0] : "?";

  return (
    <div
      className={classnames("avatar", className, {
        "is-big": big,
        "is-dark": dark,
      })}
    >
      <div className="avatar-letter">{letter}</div>
    </div>
  );
};
