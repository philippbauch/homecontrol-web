import classnames from "classnames";
import React from "react";
import { Spinner } from "./Spinner";

type ButtonType = "button" | "reset" | "submit";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  primary?: boolean;
  type?: ButtonType;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  className,
  disabled,
  loading,
  onClick,
  primary = true,
  type = "button"
}) => {
  return (
    <button
      className={classnames("button", className, { "is-primary": primary })}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {loading ? <Spinner primary={false} size="sm" /> : children}
    </button>
  );
};
