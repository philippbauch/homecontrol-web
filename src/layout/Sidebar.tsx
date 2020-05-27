import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Divider } from "../components";
import { useCoursesState } from "../contexts/CoursesContext";
import { CogIcon, PeopleIcon } from "../components/icons";

interface SidebarProps {}

export const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const { activeCourse } = useCoursesState();

  return (
    <aside className="sidebar">
      {activeCourse ? (
        <div className="sidebar-content">
          <section className="sidebar-header">
            <Avatar big={true} name={activeCourse.title} />
            <h3>{activeCourse.title}</h3>
          </section>

          <section className="sidebar-menu">
            <div className="sidebar-menu-section">
              <NavLink
                className="sidebar-menu-item nostyle"
                exact={true}
                to={`/courses/${activeCourse.id}/overview`}
              >
                Übersicht
              </NavLink>
              <NavLink
                className="sidebar-menu-item nostyle"
                to={`/courses/${activeCourse.id}/material`}
              >
                Material
              </NavLink>
            </div>
            <Divider />
            <div className="sidebar-menu-section">
              <div className="sidebar-menu-header">Abschnitte</div>
              {activeCourse.chapters.map((chapter: any, index: number) => (
                <NavLink
                  key={chapter.id}
                  className="sidebar-menu-item nostyle"
                  to={`/courses/${activeCourse.id}/chapters/${chapter.id}`}
                >
                  <span>{index + 1}.</span> <span>{chapter.title}</span>
                </NavLink>
              ))}
            </div>
            <Divider />
            <div className="sidebar-menu-section">
              <NavLink
                className="sidebar-menu-item nostyle"
                to={`/courses/${activeCourse.id}/sections`}
              >
                Kursabschnitte
              </NavLink>
              <NavLink
                className="sidebar-menu-item nostyle"
                to={`/courses/${activeCourse.id}/people`}
              >
                <PeopleIcon />
                <span>Leute</span>
              </NavLink>
              <NavLink
                className="sidebar-menu-item nostyle"
                to={`/courses/${activeCourse.id}/settings`}
              >
                <CogIcon />
                <span>Einstellungen</span>
              </NavLink>
            </div>
          </section>
        </div>
      ) : (
        <span>Kein Kurs ausgewählt.</span>
      )}
    </aside>
  );
};
