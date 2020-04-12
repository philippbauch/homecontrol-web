import classnames from "classnames";
import React from "react";
import { Spinner } from "./Spinner";

type ButtonAlign = "start" | "end";

type ButtonKind = "primary" | "danger" | "normal";

type ButtonType = "button" | "reset" | "submit";

type ButtonSize = "small" | "normal";

interface ButtonProps {
  align?: ButtonAlign;
  className?: string;
  disabled?: boolean;
  kind?: ButtonKind;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: ButtonSize;
  type?: ButtonType;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  align,
  children,
  className,
  disabled,
  kind = "normal",
  loading,
  onClick,
  size,
  type = "button",
}) => {
  return (
    <button
      className={classnames("button", className, {
        "align-end": align === "end",
        "align-start": align === "start",
        "is-danger": kind === "danger",
        "is-primary": kind === "primary",
        "is-small": size === "small",
      })}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {loading ? <Spinner primary={false} size="sm" /> : children}
    </button>
  );
};
