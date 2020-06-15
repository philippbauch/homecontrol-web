import React from "react";
import { NavLink } from "react-router-dom";
import { useCoursesState } from "../../contexts/CoursesContext";

interface SidebarMenuItemProps {
  endpoint: string;
  icon?: React.ReactNode;
}

export const SidebarMenuItem: React.FunctionComponent<SidebarMenuItemProps> = ({
  children,
  endpoint,
  icon,
}) => {
  const { activeCourse } = useCoursesState();

  return (
    <NavLink
      className="sidebar-menu-item nostyle"
      to={`/courses/${activeCourse.id}/${endpoint}`}
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};
