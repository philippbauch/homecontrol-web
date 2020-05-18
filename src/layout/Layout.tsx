import classnames from "classnames";
import React, {
  Fragment,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Subnavigation } from "./Subnavigation";
import { Notifications } from "./Notifications";
import { useUserState } from "../contexts/UserContext";
import { useNotify, useSocket, useSocketEvent } from "../hooks";
import { useScreenSize } from "../contexts/ResponsiveContext";
import { CSSTransition } from "react-transition-group";

export const Layout: React.FunctionComponent = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const { isScreenMobile } = useScreenSize();
  const [showSidebar, setShowSidebar] = useState(!isScreenMobile());
  const history = useHistory();
  const notify = useNotify();
  const { socket } = useSocket();
  const user = useUserState();

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  const asideWidth = asideRef?.current?.offsetWidth || 0;

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

  const bodyHeight =
    (layoutRef?.current?.offsetHeight || 0) -
    (headerRef?.current?.offsetHeight || 0);

  return (
    <Fragment>
      <div id="layout" ref={layoutRef}>
        <section id="header" ref={headerRef}>
          <Navigation />
          {isScreenMobile() && (
            <Subnavigation
              showSidebar={showSidebar}
              toggleSidebar={toggleSidebar}
            />
          )}
        </section>
        <section
          id="body"
          className={classnames({ "has-sidebar": showSidebar })}
          style={{ height: bodyHeight }}
        >
          <CSSTransition
            in={showSidebar}
            classNames="sidebar"
            timeout={200}
            unmountOnExit={true}
          >
            <aside className="sidebar" ref={asideRef}></aside>
          </CSSTransition>

          <main
            id="main"
            style={
              !isScreenMobile()
                ? {
                    marginLeft: asideWidth,
                  }
                : {}
            }
          >
            {children}
          </main>
        </section>
      </div>
      <Notifications />
    </Fragment>
  );
};
