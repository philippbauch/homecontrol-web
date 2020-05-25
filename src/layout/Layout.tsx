import classnames from "classnames";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Navigation } from "./Navigation";
import { Notifications } from "./Notifications";
import { Sidebar } from "./Sidebar";
import { useScreenSize } from "../contexts/ResponsiveContext";
import { useUserState } from "../contexts/UserContext";
import { useNotify, useSocket, useSocketEvent } from "../hooks";
import { useCoursesState } from "../contexts/CoursesContext";

export const Layout: React.FunctionComponent = ({ children }) => {
  const { isScreenMobile } = useScreenSize();
  const [showSidebar, setShowSidebar] = useState(!isScreenMobile());
  const history = useHistory();
  const notify = useNotify();
  const { socket } = useSocket();
  const user = useUserState();
  const { activeCourse } = useCoursesState();
  const [minHeightMain, setMinHeightMain] = useState(0);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  useEffect(() => {
    if (user) {
      socket.open();
    } else {
      socket.close();
    }
  }, [socket, user]);

  useSocketEvent("invitation", (invitation: any) => {
    notify.info(
      <span>
        <strong>{invitation.inviter.identifier}</strong> hat dich zu{" "}
        <strong>{invitation.home.name}</strong> eingeladen.
      </span>,
      () => history.push("/invitations")
    );
  });

  const updateMinHeightMain = useCallback(() => {
    setMinHeightMain(window.innerHeight - 64);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateMinHeightMain);

    updateMinHeightMain();

    return () => window.removeEventListener("resize", updateMinHeightMain);
  }, [updateMinHeightMain]);

  return (
    <Fragment>
      <div
        id="layout"
        className={classnames({ "has-sidebar": activeCourse && showSidebar })}
      >
        <Navigation
          showSidebar={activeCourse && showSidebar}
          toggleSidebar={toggleSidebar}
        />
        <CSSTransition
          in={activeCourse && showSidebar}
          classNames="sidebar"
          timeout={200}
          unmountOnExit={true}
        >
          <Sidebar />
        </CSSTransition>
        <main className="main" style={{ minHeight: minHeightMain }}>
          <CSSTransition
            classNames="main-overlay"
            in={activeCourse && showSidebar && isScreenMobile()}
            timeout={200}
            unmountOnExit={true}
          >
            <div className="main-overlay" onClick={toggleSidebar} />
          </CSSTransition>
          {children}
        </main>
      </div>
      <Notifications />
    </Fragment>
  );
};
