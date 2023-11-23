import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService from "@/services/AuthService";

export const useChangeEmail = () => {
  const queryClient = useQueryClient();

  const {
    mutate: changeEmail,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: AuthService.changeEmail,
    onSuccess: () => queryClient.invalidateQueries(["me"]),
  });

  return useMemo(
    () => ({
      changeEmail,
      isLoading,
      isSuccess,
      error,
      isError,
    }),
    [changeEmail, isLoading, isSuccess, error, isError],
  );
};
