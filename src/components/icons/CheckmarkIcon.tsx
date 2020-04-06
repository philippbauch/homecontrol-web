import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Checkmark } from "../../assets/icons/checkmark.svg";

export const CheckmarkIcon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <Checkmark />
    </Icon>
  );
};
