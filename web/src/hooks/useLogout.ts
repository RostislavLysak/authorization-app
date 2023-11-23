import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import linking from "../routes/linking";
import { useAuth } from "./useAuth";
import { useMemo } from "react";

export const useLogout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const { mutate: mutateLogout, isLoading } = useMutation({
    mutationFn: () => auth.logout(),
    onSuccess: () => {
      navigate(linking.auth.login);
    },
  });

  return useMemo(
    () => ({
      logout: mutateLogout,
      isLoading,
    }),
    [mutateLogout, isLoading],
  );
};
