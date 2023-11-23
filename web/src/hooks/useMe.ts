import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService from "../services/AuthService";
import { useAuth } from "./useAuth";

export const useMe = () => {
  const auth = useAuth();

  const { data: me, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: AuthService.me,
    enabled: auth.authorized,
  });

  return useMemo(
    () => ({
      me,
      isLoading,
    }),
    [me, isLoading],
  );
};
