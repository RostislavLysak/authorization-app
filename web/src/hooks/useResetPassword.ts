import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService, { ResetInput } from "../services/AuthService";
import { useSearchParams } from "react-router-dom";

export const useResetPassword = () => {
  const [params] = useSearchParams();
  const code = params.get("code") ?? "";

  const {
    mutate: resetPassword,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: (values: Omit<ResetInput, "code">) =>
      AuthService.resetPassword({ ...values, code }),
  });

  return useMemo(
    () => ({
      resetPassword,
      isLoading,
      isSuccess,
      error,
      isError,
    }),
    [resetPassword, isLoading, isSuccess, error, isError],
  );
};
