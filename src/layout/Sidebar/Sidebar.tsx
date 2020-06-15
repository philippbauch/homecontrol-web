import React from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuSection } from "./SidebarMenuSection";
import { Avatar, Divider } from "../../components";
import { useCoursesState } from "../../contexts/CoursesContext";
import {
  CogIcon,
  PeopleIcon,
  FolderIcon,
  CubeIcon,
} from "../../components/icons";

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
            <SidebarMenuSection>
              <SidebarMenuItem endpoint="overview" icon={<CubeIcon />}>
                Übersicht
              </SidebarMenuItem>
              <SidebarMenuItem endpoint="people" icon={<PeopleIcon />}>
                Leute
              </SidebarMenuItem>
              <SidebarMenuItem endpoint="material" icon={<FolderIcon />}>
                Material
              </SidebarMenuItem>
              <SidebarMenuItem endpoint="settings" icon={<CogIcon />}>
                Einstellungen
              </SidebarMenuItem>
            </SidebarMenuSection>

            <Divider />

            <SidebarMenuSection title="Abschnitte">
              {activeCourse.chapters.map((chapter: any, index: number) => (
                <SidebarMenuItem
                  endpoint={`chapters/${chapter.id}`}
                  icon={<span>{index + 1}.</span>}
                  key={chapter.id}
                >
                  {chapter.title}
                </SidebarMenuItem>
              ))}
            </SidebarMenuSection>
          </section>
        </div>
      ) : (
        <span>Kein Kurs ausgewählt.</span>
      )}
    </aside>
  );
};
