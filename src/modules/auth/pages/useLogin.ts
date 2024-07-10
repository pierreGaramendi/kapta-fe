import axios from "axios";
export const loginFnMutation = ({ email, password }: any) => {
  return axios.post("http://localhost:3000/api/auth/login", { email, password });
};
