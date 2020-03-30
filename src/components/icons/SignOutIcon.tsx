import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as SignOut } from "../../assets/icons/signOut.svg";

export const SignOutIcon: React.FunctionComponent<IconProps> = props => {
  return (
    <Icon {...props}>
      <SignOut />
    </Icon>
  );
};
