import classnames from "classnames";
import React from "react";
import { Button, Icon } from "../../components";

interface AddDeviceButtonProps {
  active: boolean;
  onToggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const AddDeviceButton: React.FunctionComponent<AddDeviceButtonProps> = ({
  active,
  onToggle
}) => {
  return (
    <Button
      className={classnames("add-device-button", { "is-active": active })}
      onClick={onToggle}
      primary={!active}
    >
      <Icon size="sm" icon="fas fa-plus" />
      {active ? "Cancel" : "Add"}
    </Button>
  );
};
