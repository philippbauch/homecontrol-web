import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar";
import { useCoursesState } from "../contexts/CoursesContext";
import { useScreenSize } from "../contexts/ResponsiveContext";
import { useWindowHeight } from "../hooks";

export const Layout: React.FunctionComponent = ({ children }) => {
  const { activeCourse } = useCoursesState();
  const { isScreenMobile } = useScreenSize();
  const [minHeightMain, setMinHeightMain] = useState(0);

  const [showSidebar, setShowSidebar] = useState(
    activeCourse && !isScreenMobile()
  );

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  useEffect(() => {
    if (!activeCourse) {
      return setShowSidebar(false);
    }

    setShowSidebar(!isScreenMobile());
  }, [activeCourse, isScreenMobile]);

  useWindowHeight(() => {
    // $nav-height: 48px;
    setMinHeightMain(window.innerHeight - 48);
  });

  return (
    <div id="layout" className={classnames({ "has-sidebar": showSidebar })}>
      <Navigation showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <CSSTransition
        in={showSidebar}
        classNames="sidebar"
        timeout={200}
        unmountOnExit={true}
      >
        <Sidebar />
      </CSSTransition>
      <main className="main" style={{ minHeight: minHeightMain }}>
        <CSSTransition
          classNames="main-overlay"
          in={showSidebar && isScreenMobile()}
          timeout={200}
          unmountOnExit={true}
        >
          <div className="main-overlay" onClick={toggleSidebar} />
        </CSSTransition>
        {children}
      </main>
    </div>
  );
};
