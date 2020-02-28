import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { DeviceList } from "./DeviceList";
import { Button, Icon, Level, Loader } from "../../components";
import { HttpMethod, useHttp } from "../../hooks/useHttp";
import { DeviceInput } from "./DeviceInput";

export const Devices: React.FunctionComponent = () => {
  const { http, loading } = useHttp();
  const [createDeviceActive, setCreateDeviceActive] = useState(false);
  const [error, setError] = useState();
  const [devices, setDevices] = useState<any[]>([]);

  const toggleCreateDevice = () => {
    setCreateDeviceActive(old => !old);
  };

  const handleSaveDevice = (device: any) => {
    setDevices(old => device + old);
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
          primary={!createDeviceActive}
        >
          <Icon size="sm" icon="fas fa-plus" />
          {createDeviceActive ? "Cancel" : "Add"}
        </Button>
      </Level>
      <div className="devices-body">
        <Loader loading={loading}>
          {error ? <span>{error}</span> : null}
          <DeviceInput onSave={handleSaveDevice} visible={createDeviceActive} />
          <DeviceList devices={devices} />
        </Loader>
      </div>
    </div>
  );
};
