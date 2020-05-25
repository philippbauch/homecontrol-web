import React from "react";
import { Page } from "../../layout";
import { useParams } from "react-router-dom";

export const CoursePage: React.FunctionComponent = () => {
  const { courseId } = useParams();

  return (
    <Page title="Mobile verteilte Systeme">Das ist ein Kurs {courseId}.</Page>
  );
};
