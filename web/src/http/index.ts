import axios from "axios";
import { AuthResponse } from "../types/response/AuthResponse";
import token from "../plugins/api/token";

import { logout } from "@/hooks/useAuth";
import browserFingerprint from "./browserFingerprint";

export const API_URL = "http://localhost:5000/api";

browserFingerprint().then(console.log);

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(async (config) => {
  const accessToken = token.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  const deviceId = await browserFingerprint();

  config.headers["device-id"] = deviceId;

  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const refreshToken = token.getRefreshToken();
        const res = await axios.post<AuthResponse>(
          `${API_URL}/refresh`,
          { refreshToken },
          {
            withCredentials: true,
          },
        );

        token.setTokens(res.data.accessToken, res.data.refreshToken);

        return $api.request(originalRequest);
      } catch (error) {
        logout();
        console.log("User not authorized");
      }
    }

    throw error;
  },
);

export default $api;
