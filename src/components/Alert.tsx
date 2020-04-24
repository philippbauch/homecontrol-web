import React from "react";
import classnames from "classnames";
import { CloseIcon } from "./icons";

type AlertType = "error" | "info";

interface AlertProps {
  onClose?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  type?: AlertType;
}

export const Alert: React.FunctionComponent<AlertProps> = ({
  children,
  onClose,
  type = "info",
}) => {
  return (
    <div className={classnames("alert", `is-${type}`)}>
      <span>{children}</span>
      {onClose && <CloseIcon onClick={onClose} />}
    </div>
  );
};
