import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Home } from "../../assets/icons/home.svg";

export const HomeIcon: React.FunctionComponent<IconProps> = props => {
  return (
    <Icon {...props}>
      <Home />
    </Icon>
  );
};
