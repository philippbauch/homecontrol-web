import React from "react";
import { DeviceItem } from "./DeviceItem";

interface DeviceListProps {
  devices: any[];
}

export const DeviceList: React.FunctionComponent<DeviceListProps> = ({
  devices
}) => {
  return devices.length ? (
    <div>
      {devices.map(device => (
        <DeviceItem device={device} />
      ))}
    </div>
  ) : (
    <span>No devices found.</span>
  );
};
