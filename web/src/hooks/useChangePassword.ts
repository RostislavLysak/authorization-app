import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService from "@/services/AuthService";

export const useChangePassword = () => {
  const {
    mutate: changePassword,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: AuthService.changePassword,
  });

  return useMemo(
    () => ({
      changePassword,
      isLoading,
      isSuccess,
      error,
      isError,
    }),
    [changePassword, isLoading, isSuccess, error, isError],
  );
};
