import { type ConfigProps } from "react-sanctum";

import axios from "axios";
import { env } from "../../env.mjs";

axios.defaults.withCredentials = true;

export const sanctumConfig: ConfigProps = {
  apiUrl: env.NEXT_PUBLIC_API_URL,
  csrfCookieRoute: "sanctum/csrf-cookie",
  signInRoute: "api/auth/login",
  signOutRoute: "api/auth/logout",
  userObjectRoute: "api/auth/user",
};
