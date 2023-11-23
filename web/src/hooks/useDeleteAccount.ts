import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService from "@/services/AuthService";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteAccount,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: AuthService.deleteAccount,
    onSuccess: () => queryClient.invalidateQueries(["me"]),
  });

  return useMemo(
    () => ({
      deleteAccount,
      isLoading,
      isSuccess,
      error,
      isError,
    }),
    [deleteAccount, isLoading, isSuccess, error, isError],
  );
};
