import React from "react";
import { useHistory } from "react-router-dom";
import { Status, Tile } from "../../components";

interface DeviceItemProps {
  device: any;
}

export const DeviceItem: React.FunctionComponent<DeviceItemProps> = ({
  device,
}) => {
  const history = useHistory();

  const handleDeviceSelect = (device: any) => {
    history.push(`/devices/${device._id}`);
  };
  return (
    <Tile className="devices-item" onClick={() => handleDeviceSelect(device)}>
      <div className="device-tile">
        <div className="device-info">
          <Status connected={true} />
          <span className="device-title">{device.name}</span>
        </div>
      </div>
    </Tile>
  );
};
