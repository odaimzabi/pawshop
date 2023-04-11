import axios, { type AxiosInstance } from "axios";
import { env } from "../env.mjs";

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  withCredentials: true,
});
