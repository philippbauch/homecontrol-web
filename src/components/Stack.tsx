import classnames from "classnames";
import React from "react";

interface StackProps {
  align?: "center" | "end" | "start";
  className?: string;
  gap?: "sm" | "md" | "lg" | false;
  id?: string;
  justify?: "center" | "end" | "start" | "space-between";
  style?: any;
  vertical?: boolean;
}

export const Stack: React.FunctionComponent<StackProps> = ({
  align,
  children,
  className,
  gap = "md",
  id,
  justify,
  style,
  vertical,
}) => {
  return (
    <div
      className={classnames(className, "stack", {
        [`is-align-${align}`]: align,
        [`is-justify-${justify}`]: justify,
        [`has-gap-${gap}`]: gap,
        "is-vertical": vertical,
      })}
      id={id}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};
