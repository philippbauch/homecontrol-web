import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";

export const Layout: React.FunctionComponent = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const resizeLayout = useCallback(() => {
    const layout = layoutRef.current;

    if (layout) {
      layout.style.height = `${window.innerHeight}px`;
    }
  }, [layoutRef]);

  useEffect(() => {
    window.addEventListener("resize", resizeLayout);

    resizeLayout();

    return () => window.removeEventListener("resize", resizeLayout);
  }, [resizeLayout]);

  return (
    <div id="layout" ref={layoutRef}>
      {showSidebar ? <Sidebar setShowSidebar={setShowSidebar} /> : null}
      <Navigation setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <main id="main">{children}</main>
    </div>
  );
};
