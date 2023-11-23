import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import AuthService from "../services/AuthService";
import { useAuth } from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import linking from "../routes/linking";

export const useAuthorize = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const errorHandler = (error: AxiosError<Api.Error>) => {
    if (error?.response?.status === 412) {
      navigate("/verify");
    }

    if (error?.response?.data) {
      console.log(error.response?.data?.message);
    }
  };

  const {
    mutate: mutateLogin,
    isLoading: isLoadingLogin,
    error: errorLogin,
    isError: isErrorLogin,
  } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: ({ data }: any) => {
      const path = location.state?.from?.pathname ?? linking.dashboard.root;

      auth.login(data?.accessToken, data?.refreshToken);
      navigate(path);
    },
    onError: errorHandler,
  });

  const {
    mutate: mutateSignUp,
    isLoading: isLoadingSignUp,
    error: errorSighUp,
    isError: isErrorSighUp,
  } = useMutation({
    mutationFn: AuthService.registration,
    onSuccess: () => {
      navigate(linking.auth.verify);
    },
  });

  return useMemo(
    () => ({
      login: mutateLogin,
      signUp: mutateSignUp,
      isLoading: isLoadingLogin || isLoadingSignUp,
      error: errorLogin || errorSighUp,
      isError: isErrorLogin || isErrorSighUp,
    }),
    [
      mutateLogin,
      mutateSignUp,
      isLoadingLogin,
      isLoadingSignUp,
      errorLogin,
      isErrorLogin,
      errorSighUp,
      isErrorSighUp,
    ],
  );
};
