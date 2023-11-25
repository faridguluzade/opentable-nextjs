import { useContext } from "react";
import axios from "axios";

import { AuthContext } from "../app/context/AuthContext";

export const useAuth = () => {
  const { data, loading, error, setAuthState } = useContext(AuthContext);

  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
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
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.errorMessage,
      });
    }
  };

  const signup = async (
    {
      firstName,
      lastName,
      email,
      password,
      city,
      phone,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      loading: true,
      data: null,
      error: null,
    });

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        city,
        phone,
      });
      setAuthState({
        data: res.data,
        loading: false,
        error: null,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        loading: false,
        error: error.response.data.errorMessage,
      });
    }
  };

  return {
    data,
    loading,
    error,
    signin,
    signup,
  };
};
