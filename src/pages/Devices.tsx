import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Add, Level, Status, Tile, Icon, Spinner } from "../components";
import { useHttp, HttpMethod } from "../hooks/useHttp";

export const Devices: React.FunctionComponent = () => {
  const history = useHistory();
  const { http, loading } = useHttp();
  const [error, setError] = useState();
  const [devices, setDevices] = useState<any[]>([]);

  const handleDeviceSelect = (device: any) => {
    history.push(`/devices/${device._id}`);
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
        <Add />
      </Level>
      <section>
        {loading ? (
          <Spinner></Spinner>
        ) : error ? (
          <span>{error}</span>
        ) : devices.length ? (
          devices.map(device => {
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
          })
        ) : (
          <span>No devices found.</span>
        )}
      </section>
    </div>
  );
};
