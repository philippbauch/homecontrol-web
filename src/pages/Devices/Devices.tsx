import React, { useEffect, useState } from "react";
import { AddDeviceButton } from "./AddDeviceButton";
import { DeviceInput } from "./DeviceInput";
import { DeviceList } from "./DeviceList";
import { Level, Loader } from "../../components";
import { HttpMethod, useHttp } from "../../hooks/useHttp";

export const Devices: React.FunctionComponent = () => {
  const { http, loading } = useHttp();
  const [createDeviceActive, setCreateDeviceActive] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [error, setError] = useState();

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
        <AddDeviceButton
          active={createDeviceActive}
          onToggle={toggleCreateDevice}
        />
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
