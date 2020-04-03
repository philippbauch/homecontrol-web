import { useUserState } from "../contexts/UserContext";

export const useDefaultRoute = () => {
  const user = useUserState();
  const activeHomeId = user?.preferences?.activeHomeId;

  return activeHomeId ? `/homes/${activeHomeId}` : "/homes";
};
