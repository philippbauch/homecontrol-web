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
        <DeviceItem device={device} key={device._id} />
      ))}
    </div>
  ) : (
    <span>No devices found.</span>
  );
};
