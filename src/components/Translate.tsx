import React from "react";

function translate(message: string) {
  return message;
}

export const Translate: React.FunctionComponent = ({ children }) => {
  return <span>{translate(children as string)}</span>;
};
