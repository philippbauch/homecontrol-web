import React from "react";
import { Button, Input } from "../../components";

interface DeviceInputProps {
  loading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  value: string;
  visible: boolean;
}

export const DeviceInput: React.FunctionComponent<DeviceInputProps> = ({
  loading,
  onChange,
  onSave,
  value,
  visible
}) => {
  const handleCreateDevice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSave();
  };

  return visible ? (
    <form className="device-input" onSubmit={handleCreateDevice}>
      <Input onChange={onChange} placeholder="Device Name" value={value} />
      <Button disabled={!value} loading={loading} type="submit">
        Save
      </Button>
    </form>
  ) : null;
};
