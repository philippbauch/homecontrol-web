import React from "react";
import { DeviceItem } from "./DeviceItem";

interface DeviceListProps {
  devices: any[];
}

export const DeviceList: React.FunctionComponent<DeviceListProps> = ({
  devices
}) => {
  return (
    <div className="device-list">
      {devices.length ? (
        devices.map(device => <DeviceItem device={device} key={device._id} />)
      ) : (
        <span>No devices found.</span>
      )}
    </div>
  );
};
