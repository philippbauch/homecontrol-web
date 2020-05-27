import React from "react";
import { Icon, IconProps } from "../Icon";
import { ReactComponent as Folder } from "../../assets/icons/folder.svg";

export const FolderIcon: React.FunctionComponent<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <Folder />
    </Icon>
  );
};
