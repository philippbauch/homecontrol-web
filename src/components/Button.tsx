import React from "react";
import { Spinner } from "./Spinner";

type ButtonType = "button" | "reset" | "submit";

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: ButtonType;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  disabled,
  loading,
  type = "button"
}) => {
  return (
    <button
      className="button"
      disabled={disabled}
      onClick={() => {}}
      type={type}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};
