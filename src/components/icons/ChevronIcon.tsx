import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Chevron } from "../../assets/icons/chevron.svg";

export const ChevronIcon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <Chevron />
    </Icon>
  );
};
