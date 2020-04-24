import { useUserDispatch } from "../contexts/UserContext";

export function useLogin() {
  const dispatch = useUserDispatch();

  const login = (user: any) => {
    dispatch({ type: "set_user", user });
  };

  return login;
}
