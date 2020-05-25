import React from "react";
import { UserIcon, Divider } from "../components";
import { useCoursesState } from "../contexts/CoursesContext";
import { NavLink } from "react-router-dom";

interface SidebarProps {}

export const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const { activeCourse } = useCoursesState();

  return (
    <aside className="sidebar">
      {activeCourse ? (
        <div className="sidebar-content">
          <section className="sidebar-header">
            <UserIcon user={{ identifier: "My course" }} />
            <h3>{activeCourse.title}</h3>
          </section>

          <section className="sidebar-menu">
            <div className="sidebar-menu-section">
              <NavLink
                className="sidebar-menu-item"
                exact={true}
                to={`/courses/${activeCourse.id}`}
              >
                Übersicht
              </NavLink>
              <NavLink
                className="sidebar-menu-item"
                to={`/courses/${activeCourse.id}/material`}
              >
                Material
              </NavLink>
            </div>
            <Divider />
            <div className="sidebar-menu-section">Section2</div>
            <Divider />
            <div className="sidebar-menu-section">Section 3</div>
          </section>
        </div>
      ) : (
        <span>Kein Kurs ausgewählt.</span>
      )}
    </aside>
  );
};
