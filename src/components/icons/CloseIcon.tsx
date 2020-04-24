import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Close } from "../../assets/icons/close.svg";

export const CloseIcon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <Close />
    </Icon>
  );
};
