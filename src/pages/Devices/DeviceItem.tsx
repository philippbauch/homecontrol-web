import React from "react";
import { useHistory } from "react-router-dom";
import { Icon, Status, Tile } from "../../components";

interface DeviceItemProps {
  device: any;
}

export const DeviceItem: React.FunctionComponent<DeviceItemProps> = ({
  device
}) => {
  const history = useHistory();

  const handleDeviceSelect = (device: any) => {
    history.push(`/devices/${device._id}`);
  };
  return (
    <Tile
      className="devices-item"
      dark={true}
      key={device._id}
      onClick={() => handleDeviceSelect(device)}
    >
      <div className="device-tile">
        <div className="device-info">
          <Status status="connected" />
          <span className="device-title">{device.name}</span>
        </div>
        <Icon icon="fas fa-chevron-right" size="sm" />
      </div>
    </Tile>
  );
};
