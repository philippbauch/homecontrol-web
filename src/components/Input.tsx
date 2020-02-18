import React from "react";

type InputType = "password" | "text";

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: InputType;
  value: string;
}

export const Input: React.FunctionComponent<InputProps> = ({
  onChange,
  placeholder,
  value,
  type = "text"
}) => {
  return (
    <input
      className="input"
      onChange={onChange}
      placeholder={placeholder}
      spellCheck={false}
      type={type}
      value={value}
    />
  );
};
