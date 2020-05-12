import classnames from "classnames";
import React from "react";

type InputType = "password" | "text";

interface InputProps {
  className?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: InputType;
  value: string;
}

export const Input: React.FunctionComponent<InputProps> = ({
  className,
  onChange,
  placeholder,
  value,
  type = "text",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="input-container">
      <input
        className={classnames("input", className)}
        onChange={handleChange}
        placeholder={placeholder}
        spellCheck={false}
        type={type}
        value={value}
      />
    </div>
  );
};
