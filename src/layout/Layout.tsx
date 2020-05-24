import classnames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
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
        <main className="main">
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
