import { type ConfigProps } from "react-sanctum";

import axios from "axios";

axios.defaults.withCredentials = true;

export const sanctumConfig: ConfigProps = {
  apiUrl: "http://localhost:8000",
  csrfCookieRoute: "sanctum/csrf-cookie",
  signInRoute: "api/auth/login",
  signOutRoute: "api/auth/logout",
  userObjectRoute: "api/auth/user",
};
