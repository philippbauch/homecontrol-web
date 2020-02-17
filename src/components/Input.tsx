import React from "react";

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "password" | "text";
  value: string;
}

export const Input: React.FunctionComponent<InputProps> = ({
  onChange,
  value,
  type = "text"
}) => {
  return (
    <input
      spellCheck={false}
      className="input"
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};
