import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Level, Loader, Status, Tile, Icon, Button } from "../components";
import { useHttp, HttpMethod } from "../hooks/useHttp";

export const Devices: React.FunctionComponent = () => {
  const history = useHistory();
  const { http, loading } = useHttp();
  const [createDeviceActive, setCreateDeviceActive] = useState(false);
  const [error, setError] = useState();
  const [devices, setDevices] = useState<any[]>([]);

  const handleDeviceSelect = (device: any) => {
    history.push(`/devices/${device._id}`);
  };

  const toggleCreateDevice = () => {
    setCreateDeviceActive(old => !old);
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
      <section>
        <Loader loading={loading}>
          {error ? <span>{error}</span> : null}
          {createDeviceActive ? <span>Editing</span> : null}
          {devices.length ? (
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
        </Loader>
      </section>
    </div>
  );
};
