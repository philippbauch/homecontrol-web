import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Subnavigation } from "./Subnavigation";
import { Notifications } from "./Notifications";
import { useUserState } from "../contexts/UserContext";
import { useNotify, useSocket, useSocketEvent } from "../hooks";

export const Layout: React.FunctionComponent = ({ children }) => {
  const history = useHistory();
  const notify = useNotify();
  const { socket } = useSocket();
  const user = useUserState();

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
      <div id="layout">
        <Navigation />
        <Subnavigation />
        <main id="main">{children}</main>
      </div>
      <Notifications />
    </Fragment>
  );
};
