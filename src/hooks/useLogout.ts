import { useUserDispatch } from "../contexts/UserContext";

export function useLogout() {
  const dispatch = useUserDispatch();

  const logout = () => {
    dispatch({ type: "reset_user" });
  };

  return logout;
}
