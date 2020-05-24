import React, { useMemo } from "react";
import { Page } from "../../layout";
import { useParams } from "react-router-dom";
import { useCoursesState } from "../../contexts/CoursesContext";

export const CoursePage: React.FunctionComponent = () => {
  const { courseId } = useParams();
  const { courses } = useCoursesState();

  const activeCourse = useMemo(
    () => courses.find((course: any) => course.id === Number(courseId)) ?? null,
    [courseId, courses]
  );

  return (
    <Page title="Mobile verteilte Systeme">Das ist ein Kurs {courseId}.</Page>
  );
};
