import { createContext, useEffect, useState } from "react";

export interface AuthType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthType>({
  user: "",
  setUser: () => {
    return;
  },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const storedUserData = localStorage.getItem("user");
  const initialUser: string = storedUserData
    ? (JSON.parse(storedUserData) as string)
    : "";

  const [user, setUser] = useState<string>(initialUser);

  // Update local storage whenever the user state changes.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
