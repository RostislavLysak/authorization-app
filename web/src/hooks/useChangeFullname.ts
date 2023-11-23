import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService from "@/services/AuthService";

export const useChangeFullname = () => {
  const queryClient = useQueryClient();

  const {
    mutate: changeFullname,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: AuthService.changeFullname,
    onSuccess: () => queryClient.invalidateQueries(["me"]),
  });

  return useMemo(
    () => ({
      changeFullname,
      isLoading,
      isSuccess,
      error,
      isError,
    }),
    [changeFullname, isLoading, isSuccess, error, isError],
  );
};
