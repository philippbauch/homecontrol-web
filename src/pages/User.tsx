import React from "react";
import { Page } from "../layout";
import { Divider, Level } from "../components";

export const User: React.FunctionComponent = () => {
  return (
    <Page title="Benutzer">
      <Divider />
      <section id="change-password-section">
        <Level id="change-password-header">
          <h3 id="change-password-title">Passwort ändern</h3>
        </Level>
        <div>Coming soon</div>
      </section>
    </Page>
  );
};
