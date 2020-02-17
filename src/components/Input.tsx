import React from "react";

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "password" | "text";
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
