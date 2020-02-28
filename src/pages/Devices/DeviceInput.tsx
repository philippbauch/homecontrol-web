import React, { useState } from "react";
import { Button, Input } from "../../components";

interface DeviceInputProps {
  onSave: (device: any) => void;
  visible: boolean;
}

export const DeviceInput: React.FunctionComponent<DeviceInputProps> = ({
  onSave,
  visible
}) => {
  const [name, setName] = useState("");

  const handleCreateDevice = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Works");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return visible ? (
    <form className="device-input" onSubmit={handleCreateDevice}>
      <Input
        onChange={handleNameChange}
        placeholder="Device Name"
        value={name}
      />
      <Button disabled={!name} type="submit">
        Save
      </Button>
    </form>
  ) : null;
};
