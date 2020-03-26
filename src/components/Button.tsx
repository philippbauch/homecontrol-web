import classnames from "classnames";
import React from "react";
import { Spinner } from "./Spinner";

type ButtonAlign = "start" | "end";

type ButtonKind = "primary" | "danger";

type ButtonType = "button" | "reset" | "submit";

interface ButtonProps {
  align?: ButtonAlign;
  className?: string;
  disabled?: boolean;
  kind?: ButtonKind;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: ButtonType;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  align,
  children,
  className,
  disabled,
  kind = "primary",
  loading,
  onClick,
  type = "button"
}) => {
  return (
    <button
      className={classnames("button", className, {
        "align-end": align === "end",
        "align-start": align === "start",
        "is-danger": kind === "danger",
        "is-primary": kind === "primary"
      })}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {loading ? <Spinner primary={false} size="sm" /> : children}
    </button>
  );
};
