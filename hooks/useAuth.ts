import axios from "axios";

export const useAuth = () => {
  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async () => {};

  return {
    signin,
    signup,
  };
};
