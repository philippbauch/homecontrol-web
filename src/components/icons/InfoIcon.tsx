import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Info } from "../../assets/icons/info.svg";

export const InfoIcon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <Info />
    </Icon>
  );
};
