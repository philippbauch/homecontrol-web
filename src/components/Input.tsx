import classnames from "classnames";
import React from "react";

type InputType = "password" | "text";

interface InputProps {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputType;
  value: string;
}

export const Input: React.FunctionComponent<InputProps> = ({
  className,
  onChange,
  placeholder,
  value,
  type = "text"
}) => {
  return (
    <input
      className={classnames("input", className)}
      onChange={onChange}
      placeholder={placeholder}
      spellCheck={false}
      type={type}
      value={value}
    />
  );
};
