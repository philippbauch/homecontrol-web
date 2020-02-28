import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { DeviceList } from "./DeviceList";
import { Button, Icon, Input, Level, Loader } from "../../components";
import { HttpMethod, useHttp } from "../../hooks/useHttp";

export const Devices: React.FunctionComponent = () => {
  const { http, loading } = useHttp();
  const [createDeviceActive, setCreateDeviceActive] = useState(false);
  const [error, setError] = useState();
  const [deviceName, setDeviceName] = useState();
  const [devices, setDevices] = useState<any[]>([]);

  const toggleCreateDevice = () => {
    setCreateDeviceActive(old => !old);
  };

  const handleDeviceNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeviceName(event.target.value);
  };

  useEffect(() => {
    setError(null);

    async function fetchDevices() {
      try {
        const devices = await http(HttpMethod.GET, "/devices");

        setDevices(devices);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchDevices();
  }, [http]);

  return (
    <div id="devices-page">
      <Level className="devices-header">
        <h1>Devices</h1>
        <Button
          className={classnames("add-device-button", {
            "is-active": createDeviceActive
          })}
          onClick={toggleCreateDevice}
        >
          <Icon size="sm" icon="fas fa-plus" />
          {createDeviceActive ? "Cancel" : "Add"}
        </Button>
      </Level>
      <div className="devices-body">
        <Loader loading={loading}>
          {error ? <span>{error}</span> : null}
          {createDeviceActive ? (
            <Input
              className="add-device-input"
              value={deviceName}
              onChange={handleDeviceNameChange}
              placeholder="Device Name"
            />
          ) : null}
          <DeviceList devices={devices} />
        </Loader>
      </div>
    </div>
  );
};
