import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";

export const PlusIcon: React.FunctionComponent<IconProps> = props => {
  return (
    <Icon {...props}>
      <Plus />
    </Icon>
  );
};
