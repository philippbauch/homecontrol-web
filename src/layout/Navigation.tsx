import React, { Fragment } from "react";
import { Link, useHistory, NavLink } from "react-router-dom";
import {
  Status,
  UserIcon,
  Dropdown,
  Level,
  Divider,
  Burger,
} from "../components";
import { useUserState } from "../contexts/UserContext";
import { useLogout, useSocket } from "../hooks";
import http from "../HttpClient";
import { SignOutIcon } from "../components/icons";
import { useScreenSize } from "../contexts/ResponsiveContext";

interface NavigationProps {
  showSidebar: boolean;
  toggleSidebar: () => void;
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  showSidebar,
  toggleSidebar,
}) => {
  const history = useHistory();
  const { isScreenMobile } = useScreenSize();
  const logout = useLogout();
  const { connected } = useSocket();
  const user = useUserState();

  const handleLogout = () => {
    http.post("/logout").then(logout);
  };

  const goToDefaultRoute = () => {
    history.push("/courses");
  };

  return (
    <nav id="navigation">
      <div className="navigation-left">
        {isScreenMobile() && (
          <Burger onClick={toggleSidebar} open={showSidebar} />
        )}
        <h1 className="navigation-brand" onClick={goToDefaultRoute}>
          teapot
        </h1>
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
            <UserIcon
              className={active ? "is-active" : undefined}
              dark={true}
              user={user}
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
