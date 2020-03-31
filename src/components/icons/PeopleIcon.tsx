import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as People } from "../../assets/icons/people.svg";

export const PeopleIcon: React.FunctionComponent<IconProps> = props => {
  return (
    <Icon {...props}>
      <People />
    </Icon>
  );
};
