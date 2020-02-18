import React from "react";
import { Icon } from "../components";

interface AddProps {
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

export const Add: React.FunctionComponent<AddProps> = ({ onClick }) => {
  return (
    <span className="add" onClick={onClick}>
      <Icon icon="fas fa-plus" />
    </span>
  );
};
