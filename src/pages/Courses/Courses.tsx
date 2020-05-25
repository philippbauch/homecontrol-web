import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Stack, Card, Tab, Tabs, UserIcon } from "../../components";
import { useCoursesState } from "../../contexts/CoursesContext";
import { Page } from "../../layout";

export const Courses: React.FunctionComponent = () => {
  const { courses } = useCoursesState();
  const history = useHistory();

  return (
    <Page
      title="Meine Kurse"
      extra={<Button kind="primary">Kurs erstellen</Button>}
    >
      <Tabs>
        <Tab active={true}>Alle</Tab>
        <Tab>Favoriten</Tab>
      </Tabs>
      <Stack gap="lg" vertical={true}>
        {courses.map((course) => (
          <Card
            className="courses-item"
            onClick={() => history.push(`/courses/${course.id}`)}
          >
            <UserIcon user={{ identifier: course.title }} />
            <div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          </Card>
        ))}
      </Stack>
    </Page>
  );
};
