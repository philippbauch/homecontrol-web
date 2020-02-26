import React from "react";
import { Add, Level, Status, Tile, Icon } from "../components";

export const Devices: React.FunctionComponent = () => {
  const devices = ["Arduino Uno", "Raspberry Pi"];

  return (
    <div id="devices-page">
      <Level className="devices-header">
        <h1>Devices</h1>
        <Add />
      </Level>
      <section>
        {devices.map(device => {
          return (
            <Tile className="devices-item" dark={true}>
              <div className="device-tile">
                <div className="device-info">
                  <Status status="connected" />
                  <span className="device-title">{device}</span>
                </div>
                <Icon icon="fas fa-chevron-right" size="sm" />
              </div>
            </Tile>
          );
        })}
      </section>
    </div>
  );
};
