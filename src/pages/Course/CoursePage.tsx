import React from "react";
import { Page } from "../../layout";
import { useParams, Route, Switch, Redirect } from "react-router-dom";

export const CoursePage: React.FunctionComponent = () => {
  const { courseId } = useParams();

  return (
    <Switch>
      <Route path="/courses/:courseId/people">Personen</Route>
      <Route path="/courses/:courseId/sections">Kursabschnitte</Route>
      <Route path="/courses/:courseId/settings">Einstellungen</Route>
      <Route path="/courses/:courseId/material">Kursmaterialien</Route>
      <Route path="/courses/:courseId/overview">
        <Page title="Mobile verteilte Systeme">
          Das ist ein Kurs {courseId}.
        </Page>
      </Route>
      <Redirect to="/courses/:courseId/overview" />
    </Switch>
  );
};
