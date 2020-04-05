import React from "react";
import { ResidentItem } from "./ResidentItem";

interface ResidentListProps {
  residents: any[];
}

export const ResidentList: React.FunctionComponent<ResidentListProps> = ({
  residents,
}) => {
  return (
    <div className="resident-list">
      {residents.length ? (
        residents.map((resident) => (
          <ResidentItem resident={resident} key={resident._id} />
        ))
      ) : (
        <span>Keine Bewohner gefunden.</span>
      )}
    </div>
  );
};
