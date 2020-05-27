import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as List } from "../../assets/icons/list.svg";

export const ListIcon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <List />
    </Icon>
  );
};
