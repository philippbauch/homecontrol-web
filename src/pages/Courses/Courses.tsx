import React from "react";
import { Button, Stack, Card, UserIcon } from "../../components";
import { Page } from "../../layout";
import { useUserState } from "../../contexts/UserContext";

export const Courses: React.FunctionComponent = () => {
  const user = useUserState();

  return (
    <Page
      title="Meine Kurse"
      extra={<Button kind="primary">Kurs erstellen</Button>}
    >
      <Stack gap="lg" vertical={true}>
        <Card className="courses-item">
          <UserIcon user={user} />
          <div>
            <h3>Mobile verteilte Systeme</h3>
            <p>
              In diesem Kurs lernen wir etwas über verteilte Systeme. Das wird
              mit Sicherheit ein riesen Spaß!
            </p>
          </div>
        </Card>
        <Card className="courses-item">
          <UserIcon user={user} />
          <div>
            <h3>Security Engineering</h3>
            <p>
              In diesem Kurs lernen wir etwas über verteilte Systeme. Das wird
              mit Sicherheit ein riesen Spaß!
            </p>
          </div>
        </Card>
        <Card className="courses-item">
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
