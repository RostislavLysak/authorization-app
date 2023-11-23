import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useAuth } from "./useAuth";
import AuthService from "../services/AuthService";
import linking from "../routes/linking";

export const useVerify = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const {
    mutate: verify,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: AuthService.verify,
    onSuccess: ({ data }: any) => {
      auth.login(data?.accessToken, data?.refreshToken);
      navigate(linking.dashboard.root);
    },
  });

  return useMemo(
    () => ({
      verify,
      isLoading,
      isSuccess,
      error,
      isError,
    }),
    [verify, isLoading, isSuccess, error, isError],
  );
};
