import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import AuthService from "../services/AuthService";
import { useNavigate, useSearchParams } from "react-router-dom";
import linking from "../routes/linking";

export const useResetPasswordStatus = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const code = params.get("code") ?? "";

  const { isLoading: loadingStatus } = useQuery({
    queryFn: () => AuthService.resetPasswordStatus({ code }),
    queryKey: [],
    onError: () => navigate(linking.auth.login),
  });

  return useMemo(
    () => ({
      loadingStatus,
    }),
    [loadingStatus],
  );
};
