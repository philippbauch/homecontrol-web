import React, { Fragment, useEffect } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import {
  Avatar,
  Burger,
  Divider,
  Dropdown,
  Level,
  Status,
} from "../components";
import { SignOutIcon } from "../components/icons";
import { useCoursesState } from "../contexts/CoursesContext";
import { useScreenSize } from "../contexts/ResponsiveContext";
import { useUserState } from "../contexts/UserContext";
import { useLogout, useSocket } from "../hooks";
import http from "../HttpClient";

interface NavigationProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  showSidebar,
  toggleSidebar,
}) => {
  const { activeCourse } = useCoursesState();
  const history = useHistory();
  const logout = useLogout();
  const { isScreenMobile } = useScreenSize();
  const { connected, socket } = useSocket();
  const user = useUserState();

  const handleLogout = () => {
    http.post("/logout").then(logout);
  };

  const goToDefaultRoute = () => {
    history.push("/courses");
  };

  useEffect(() => {
    if (user) {
      socket.open();
    } else {
      socket.close();
    }
  }, [socket, user]);

  return (
    <nav id="navigation">
      <div className="navigation-left">
        {activeCourse && isScreenMobile() && (
          <Burger onClick={toggleSidebar} open={showSidebar} />
        )}
        <h2 className="navigation-brand" onClick={goToDefaultRoute}>
          teapot
        </h2>
        {!isScreenMobile() && (
          <div className="navigation-menu">
            <NavLink
              className="navigation-menu-item nostyle"
              exact={true}
              to="/courses"
            >
              Meine Kurse
            </NavLink>
            <NavLink className="navigation-menu-item nostyle" to="/catalog">
              Katalog
            </NavLink>
          </div>
        )}
      </div>
      <div className="navigation-right">
        <Status connected={connected} />
        <Dropdown
          className="navigation-dropdown"
          trigger={(active) => (
            <Avatar
              className={active ? "is-active" : undefined}
              dark={true}
              name={user.identifier}
            />
          )}
        >
          {isScreenMobile() && (
            <Fragment>
              <div className="navigation-dropdown-item">
                <span>Meine Kurse</span>
              </div>
              <div className="navigation-dropdown-item">
                <span>Katalog</span>
              </div>
              <Divider size="sm" />
            </Fragment>
          )}
          <div className="navigation-dropdown-item">
            <Link className="nostyle" to={`/users/${user._id}`}>
              Account
            </Link>
          </div>
          <div className="navigation-dropdown-item" onClick={handleLogout}>
            <Level>
              <span>Ausloggen</span>
              <SignOutIcon size="sm" />
            </Level>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};
