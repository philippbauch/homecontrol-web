import React from "react";

interface AlertProps {
  onClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  type?: string;
}

export const Alert: React.FunctionComponent<AlertProps> = ({
  children,
  onClose,
  type
}) => {
  return (
    <div className="alert">
      <span>{children}</span>
      <span>Close</span>
    </div>
  );
};
