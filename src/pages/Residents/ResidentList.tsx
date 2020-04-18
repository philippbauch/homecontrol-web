import React from "react";
import { ResidentItem } from "./ResidentItem";
import { Stack } from "../../components";

interface ResidentListProps {
  residents: any[];
}

export const ResidentList: React.FunctionComponent<ResidentListProps> = ({
  residents,
}) => {
  return (
    <Stack className="resident-list" vertical={true}>
      {residents.length ? (
        residents.map((resident) => (
          <ResidentItem resident={resident} key={resident._id} />
        ))
      ) : (
        <span>Keine Bewohner gefunden.</span>
      )}
    </Stack>
  );
};
