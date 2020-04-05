import React from "react";
import { Level, Tag, Tile } from "../../components";

interface ResidentItemProps {
  resident: any;
}

export const ResidentItem: React.FunctionComponent<ResidentItemProps> = ({
  resident,
}) => {
  return (
    <Tile className="resident-item">
      <Level>
        <span className="resident-info">
          <span className="resident-name">{resident.identifier}</span>
        </span>
        {resident.owner && <Tag>Besitzer</Tag>}
      </Level>
    </Tile>
  );
};
