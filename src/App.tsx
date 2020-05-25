import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotificationProvider } from "./contexts/NotificationContext";
import { useUserState } from "./contexts/UserContext";
import { Layout } from "./layout";
import { AddUser, CoursePage, Courses, User, Users } from "./pages";
import { CoursesProvider } from "./contexts/CoursesContext";
import { Notifications } from "./layout/Notifications";

export const App: React.FunctionComponent = () => {
  const user = useUserState();

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <NotificationProvider>
      <CoursesProvider>
        <Layout>
          <Notifications />
          <Switch>
            <Route component={Courses} exact={true} path="/courses" />
            <Route component={CoursePage} path="/courses/:courseId" />
            <Route component={Users} exact={true} path="/users" />
            <Route component={AddUser} path={"/users/new"} />
            <Route component={User} path="/users/:userId" />
            <Redirect to="/courses" />
          </Switch>
        </Layout>
      </CoursesProvider>
    </NotificationProvider>
  );
};
