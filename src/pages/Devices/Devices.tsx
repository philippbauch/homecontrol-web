import React, { useEffect, useState } from "react";
import { AddDeviceButton } from "./AddDeviceButton";
import { DeviceInput } from "./DeviceInput";
import { DeviceList } from "./DeviceList";
import http from "../../HttpClient";
import { Divider, Level, Loader } from "../../components";

export const Devices: React.FunctionComponent = () => {
  const [createDeviceActive, setCreateDeviceActive] = useState(false);
  const [devices, setDevices] = useState<any[]>([]);
  const [deviceName, setDeviceName] = useState("");
  const [fetchDevicesError, setFetchDevicesError] = useState();
  const [fetchDevicesLoading, setFetchDevicesLoading] = useState(false);
  const [postDeviceError, setPostDeviceError] = useState();
  const [postDeviceLoading, setPostDeviceLoading] = useState(false);

  const handleSaveDevice = async () => {
    setPostDeviceError(null);
    setPostDeviceLoading(true);

    const device = {
      name: deviceName
    };

    try {
      const { _id } = await http.post("/devices", device);

      setCreateDeviceActive(false);
      setDeviceName("");
      setDevices(old => old.concat({ _id, ...device }));
    } catch (error) {
      setPostDeviceError(error.message);
    } finally {
      setPostDeviceLoading(false);
    }
  };

  const toggleCreateDevice = () => {
    if (createDeviceActive) {
      setDeviceName("");
    }

    setCreateDeviceActive(old => !old);
  };

  useEffect(() => {
    setFetchDevicesError(null);
    setFetchDevicesLoading(true);

    async function fetchDevices() {
      try {
        const devices = await http.get("/devices");

        setDevices(devices);
      } catch (error) {
        setFetchDevicesError(error.message);
      } finally {
        setFetchDevicesLoading(false);
      }
    }

    fetchDevices();
  }, []);

  return (
    <div id="devices-page">
      <div className="devices-header">
        <Level>
          <h1>Devices</h1>
          <AddDeviceButton
            active={createDeviceActive}
            onToggle={toggleCreateDevice}
          />
        </Level>
        {postDeviceError ? <span>{postDeviceError}</span> : null}
        {fetchDevicesError ? <span>{fetchDevicesError}</span> : null}
        <DeviceInput
          loading={postDeviceLoading}
          onChange={setDeviceName}
          onSave={handleSaveDevice}
          value={deviceName}
          visible={createDeviceActive}
        />
        <Divider />
      </div>
      <Loader loading={fetchDevicesLoading}>
        <DeviceList devices={devices} />
      </Loader>
    </div>
  );
};
