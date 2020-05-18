import React, { useEffect, useState } from "react";

type ScreenSize = "mobile" | "tablet" | "desktop" | "large" | undefined;

const SCREEN_TABLET = 768;
const SCREEN_DESKTOP = 1024;
const SCREEN_LARGE = 1366;

const ResponsiveStateContext = React.createContext<any | undefined>(undefined);

const ResponsiveProvider: React.FunctionComponent = ({ children }) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>();

  const recordScreenSize = () => {
    const width = window.innerWidth;

    if (width >= SCREEN_LARGE) {
      setScreenSize("large");
    } else if (width >= SCREEN_DESKTOP) {
      setScreenSize("desktop");
    } else if (width >= SCREEN_TABLET) {
      setScreenSize("tablet");
    } else {
      setScreenSize("mobile");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", recordScreenSize);

    recordScreenSize();

    return () => window.removeEventListener("resize", recordScreenSize);
  }, []);

  return (
    <ResponsiveStateContext.Provider
      value={{
        screenSize,
        isScreenMobile: () => screenSize === "mobile",
        isScreenTablet: () => screenSize === "tablet",
        isScreenDesktop: () => screenSize === "desktop",
        isScreenLarge: () => screenSize === "large",
      }}
    >
      {children}
    </ResponsiveStateContext.Provider>
  );
};

function useScreenSize() {
  const context = React.useContext(ResponsiveStateContext);

  if (context === undefined) {
    throw new Error(
      "useScreenSize must be used within a ResponsiveStateContext"
    );
  }

  return context;
}

export { ResponsiveProvider, useScreenSize };
