import React from "react";
import { Button, Stack, Card, Tab, Tabs, UserIcon } from "../../components";
import { Page } from "../../layout";
import { useUserState } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";

export const Courses: React.FunctionComponent = () => {
  const user = useUserState();
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
        <Card
          className="courses-item"
          onClick={() => history.push("/courses/1")}
        >
          <UserIcon user={user} />
          <div>
            <h3>Mobile verteilte Systeme</h3>
            <p>
              In diesem Kurs lernen wir etwas über verteilte Systeme. Das wird
              mit Sicherheit ein riesen Spaß!
            </p>
          </div>
        </Card>
        <Card
          className="courses-item"
          onClick={() => history.push("/courses/2")}
        >
          <UserIcon user={user} />
          <div>
            <h3>Security Engineering</h3>
            <p>
              In diesem Kurs lernen wir etwas über verteilte Systeme. Das wird
              mit Sicherheit ein riesen Spaß!
            </p>
          </div>
        </Card>
        <Card
          className="courses-item"
          onClick={() => history.push("/courses/3")}
        >
          <UserIcon user={user} />
          <div>
            <h3>Diskrete Wahrscheinlichkeitstheorie</h3>
            <p>
              In diesem Kurs lernen wir etwas über verteilte Systeme. Das wird
              mit Sicherheit ein riesen Spaß!
            </p>
          </div>
        </Card>
      </Stack>
    </Page>
  );
};
