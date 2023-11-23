import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import jwt from "jwt-decode";
import token from "../plugins/api/token";
import queryClient from "../queryClient";
import AuthService from "@/services/AuthService";

type TTokenPayload = {
  id?: string;
};

const cacheKey = ["token"];

export const login = async (accessToken: string, refreshToken: string) => {
  token.setTokens(accessToken, refreshToken);
  queryClient.setQueryData(cacheKey, accessToken);
};

export const logout = async () => {
  const refreshToken = token.getRefreshToken();
  await AuthService.logout({ refreshToken });
  token.clearTokens();
  queryClient.setQueryData(cacheKey, null);
  queryClient.clear();
};

const getTokenPayload = (token: string | null) => {
  try {
    if (token) {
      const payload = jwt<TTokenPayload>(token);

      return {
        userId: payload?.id,
      };
    }

    return {};
  } catch {
    return {};
  }
};

export const useAuth = () => {
  const { data } = useQuery(cacheKey, token.getAccessToken, {
    enabled: false,
    initialData: token.getAccessToken(),
  });

  return useMemo(() => {
    const payload = getTokenPayload(data);

    return {
      ...payload,
      authorized: !!payload.userId,
      login,
      logout,
    };
  }, [data]);
};
