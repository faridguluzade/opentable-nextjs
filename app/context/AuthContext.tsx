"use client";

import React, { createContext, useState } from "react";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  city: string;
}

interface State {
  loading: boolean;
  data: User | null;
  error: string | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

export const AuthContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  });

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
