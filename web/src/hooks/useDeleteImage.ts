import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService from "@/services/AuthService";

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteImage,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useMutation({
    mutationFn: AuthService.deleteImage,
    onSuccess: () => queryClient.invalidateQueries(["me"]),
  });

  return useMemo(
    () => ({
      deleteImage,
      isLoading,
      isSuccess,
      error,
      isError,
    }),
    [deleteImage, isLoading, isSuccess, error, isError],
  );
};
