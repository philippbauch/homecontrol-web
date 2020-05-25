import { useCallback, useEffect } from "react";

export function useWindowHeight(callback: any) {
  const listener = useCallback(() => callback(window.innerHeight), [callback]);

  useEffect(() => {
    window.addEventListener("resize", listener);

    callback(window.innerHeight);

    return () => window.removeEventListener("resize", listener);
  }, [callback, listener]);
}
