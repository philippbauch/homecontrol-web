import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Lock } from "../../assets/icons/lock.svg";

export const LockIcon: React.FunctionComponent<IconProps> = props => {
  return (
    <Icon {...props}>
      <Lock />
    </Icon>
  );
};
