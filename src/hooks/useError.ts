import { useState } from "react";

type ErrorType = string | null;
type ErrorHandler = (error: Error | string | null) => void;
type ErrorReset = () => void;

export function useError(): [ErrorType, ErrorHandler, ErrorReset] {
  const [error, setError] = useState<ErrorType>(null);

  const handleError: ErrorHandler = (error: Error | string | null) => {
    if (error instanceof Error) {
      return setError(error.message);
    }

    if (typeof error === "string") {
      return setError(error);
    }

    if (error === null) {
      return setError(null);
    }

    throw new Error("useError received an invalid error type");
  };

  const resetError: ErrorReset = () => setError(null);

  return [error, handleError, resetError];
}
