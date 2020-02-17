import React from "react";

interface ButtonProps {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "reset" | "submit";
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  disabled = false,
  type = "button"
}) => {
  return (
    <button
      className="button"
      disabled={disabled}
      onClick={() => {}}
      type={type}
    >
      {children}
    </button>
  );
};
