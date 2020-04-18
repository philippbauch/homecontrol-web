import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Error } from "../../assets/icons/error.svg";

export const ErrorIcon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon type="danger" {...props}>
      <Error />
    </Icon>
  );
};
