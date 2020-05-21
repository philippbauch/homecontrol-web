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
import { Notifications } from "./Notifications";
import { useUserState } from "../contexts/UserContext";
import { useNotify, useSocket, useSocketEvent } from "../hooks";
import { useScreenSize } from "../contexts/ResponsiveContext";
import { CSSTransition } from "react-transition-group";

export const Layout: React.FunctionComponent = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { isScreenMobile } = useScreenSize();
  const [showSidebar, setShowSidebar] = useState(!isScreenMobile());
  const history = useHistory();
  const notify = useNotify();
  const { socket } = useSocket();
  const user = useUserState();

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
    <Fragment>
      <div
        id="layout"
        ref={layoutRef}
        className={classnames({ "has-sidebar": showSidebar })}
      >
        <Navigation showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <CSSTransition
          in={showSidebar}
          classNames="sidebar"
          timeout={200}
          unmountOnExit={true}
        >
          <aside className="sidebar"></aside>
        </CSSTransition>
        <main id="main">{children}</main>
      </div>
      <Notifications />
    </Fragment>
  );
};
