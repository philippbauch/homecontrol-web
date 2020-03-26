import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  checked,
  children,
  onChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className="checkbox">
      <div className="checkbox-control">
        <input
          className="checkbox-input"
          checked={checked}
          onChange={handleChange}
          type="checkbox"
        ></input>
        <div className="checkbox-symbol">
          <svg viewBox="0 0 16 16">
            <polyline points="4 9 7 11.5 12 4.5"></polyline>
          </svg>
        </div>
      </div>
      {children ? <span className="checkbox-label">{children}</span> : null}
    </label>
  );
};
