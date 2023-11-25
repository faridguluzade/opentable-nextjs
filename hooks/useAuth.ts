import { useContext } from "react";
import axios from "axios";

import { AuthContext } from "../app/context/AuthContext";

export const useAuth = () => {
  const { data, loading, error, setAuthState } = useContext(AuthContext);

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });
      setAuthState({
        data: res.data,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.errorMessage,
      });
    }
  };

  const signup = async () => {};

  return {
    data,
    loading,
    error,
    signin,
    signup,
  };
};
