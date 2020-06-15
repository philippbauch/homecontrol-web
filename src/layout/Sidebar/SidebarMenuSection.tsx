import React from "react";

interface SidebarMenuSectionProps {
  title?: string;
}

export const SidebarMenuSection: React.FunctionComponent<SidebarMenuSectionProps> = ({
  children,
  title,
}) => {
  return (
    <div className="sidebar-menu-section">
      {title && <div className="sidebar-menu-header">{title}</div>}
      {children}
    </div>
  );
};
