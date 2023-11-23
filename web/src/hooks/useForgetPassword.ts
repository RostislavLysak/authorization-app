import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService from "../services/AuthService";

export const useForgetPassword = () => {
  const {
    mutate: forgetPassword,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: AuthService.forgetPassword,
  });

  return useMemo(
    () => ({
      forgetPassword,
      isLoading,
      isSuccess,
      error,
      isError,
    }),
    [forgetPassword, isLoading, isSuccess, error, isError],
  );
};
