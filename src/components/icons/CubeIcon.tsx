import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Cube } from "../../assets/icons/cube.svg";

export const CubeIcon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <Cube />
    </Icon>
  );
};
