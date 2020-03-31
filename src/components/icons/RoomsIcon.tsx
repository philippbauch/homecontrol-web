import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Rooms } from "../../assets/icons/rooms.svg";

export const RoomsIcon: React.FunctionComponent<IconProps> = props => {
  return (
    <Icon {...props}>
      <Rooms />
    </Icon>
  );
};
