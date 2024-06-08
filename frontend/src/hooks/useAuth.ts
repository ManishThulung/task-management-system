import { useContext } from "react";
import { AuthContext, AuthType } from "../contexts/auth";

const useAuth = (): AuthType => {
  return useContext<AuthType>(AuthContext);
};

export default useAuth;
