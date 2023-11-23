import { Box, Typography } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorMessage: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <Box
      id="error-page"
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography level="h1">{t("errors.h1")}</Typography>
      <Typography level="h2">{t("errors.h2")}</Typography>
      <Box>{children}</Box>
    </Box>
  );
};

const ErrorPage = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <ErrorMessage>
          <Typography level="h3">{t("errors.404")}</Typography>
        </ErrorMessage>
      );
    }

    if (error.status === 401) {
      return (
        <ErrorMessage>
          <Typography level="h3">{t("errors.401")}</Typography>
        </ErrorMessage>
      );
    }

    if (error.status === 503) {
      return (
        <ErrorMessage>
          <Typography level="h3">{t("errors.503")}</Typography>
        </ErrorMessage>
      );
    }
  }

  return (
    <ErrorMessage>
      <Typography level="h3">{t("errors.h3")}</Typography>
    </ErrorMessage>
  );
};

export default ErrorPage;
