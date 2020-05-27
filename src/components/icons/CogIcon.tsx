import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Cog } from "../../assets/icons/cog.svg";

export const CogIcon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <Cog />
    </Icon>
  );
};
