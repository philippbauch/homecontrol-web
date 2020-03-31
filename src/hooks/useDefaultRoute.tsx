import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useDefaultRoute = () => {
  const { user } = useContext(UserContext);
  const activeHomeId = user?.preferences?.activeHomeId;

  return activeHomeId ? `/homes/${activeHomeId}` : "/homes";
};
