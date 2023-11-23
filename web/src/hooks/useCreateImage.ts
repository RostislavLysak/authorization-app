import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService from "@/services/AuthService";

export const useCreateImage = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createImage,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: AuthService.createImage,
    onSuccess: () => queryClient.invalidateQueries(["me"]),
  });

  return useMemo(
    () => ({
      createImage,
      isLoading,
      isSuccess,
      error,
      isError,
    }),
    [createImage, isLoading, isSuccess, error, isError],
  );
};
