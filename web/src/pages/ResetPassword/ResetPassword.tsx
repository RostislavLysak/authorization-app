import { Box, Button, IconButton, Sheet, Stack, Typography, useColorScheme } from "@mui/joy";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useForm from "../../hooks/useForm";
import { useResetPassword } from "../../hooks/useResetPassword";
import { useResetPasswordStatus } from "../../hooks/useResetPasswordStatus";
import linking from "../../routes/linking";
import ArrowIcon from "../../plugins/ui/icons/ArrowIcon";
import Loader from "../../components/Loader";
import PasswordControl from "@/components/PasswordControl";
import CustomSnackbar from "@/components/CustomSnackbar";

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useColorScheme();
  const boxShadow = theme.mode === "dark" ? "none" : "md";

  const { loadingStatus } = useResetPasswordStatus();

  const { register, submit } = useForm({
    newPassword: "",
  });

  const { resetPassword, isLoading, isSuccess, error, isError }: any = useResetPassword();

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const timeout = setTimeout(() => {
      navigate(linking.auth.login);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  if (loadingStatus) {
    return <Loader />;
  }

  if (isSuccess) {
    return (
      <>
        <CustomSnackbar open={true} color="success">
          {t("snackbar.resetPassword")}
        </CustomSnackbar>

        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 700,
            mx: "auto",
            my: 4,
            py: 6,
            px: 2,
            gap: 2,
            textAlign: "center",
            borderRadius: "sm",
            boxShadow,
          }}
          variant="plain"
        >
          <Typography level="h4" component="p" fontWeight="normal">
            {t("emailSend.resetPassword.h1")}
          </Typography>
          <Typography level="title-md" component="p" fontWeight="normal">
            {t("emailSend.resetPassword.p")}
          </Typography>
          <Button
            sx={{
              width: "35%",
              mt: 1,
            }}
            onClick={() => navigate(linking.auth.login)}
          >
            {t("auth.login.button.submit")}
          </Button>
        </Sheet>
      </>
    );
  }

  return (
    <Stack>
      {isError && (
        <CustomSnackbar open={true} color="danger">
          {error?.response?.data.message}
        </CustomSnackbar>
      )}
      <Sheet
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          mx: "auto",
          py: 3,
          px: 2,
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
        onSubmit={submit(resetPassword)}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <IconButton
            onClick={() => navigate(linking.auth.login)}
            size="sm"
            sx={{ borderRadius: "50%" }}
            variant="soft"
          >
            <ArrowIcon />
          </IconButton>
          <Typography level="title-sm" component="h5" sx={{ display: "inline-block" }}>
            {t("auth.resetPassword.button.label")}
          </Typography>
        </Stack>
        <Box>
          <Typography level="h4" component="h1">
            {t("auth.resetPassword.text.h1")}
          </Typography>
          <Typography level="body-sm">{t("auth.resetPassword.text.p")}</Typography>
        </Box>
        <PasswordControl
          label={t("auth.resetPassword.label.newPassword")}
          placeholder={t("auth.resetPassword.label.newPassword").toLowerCase()}
          withRate
          {...register("newPassword")}
        />
        <Button
          type="submit"
          sx={{
            mt: 1,
          }}
          disabled={isLoading}
        >
          {t("auth.resetPassword.button.submit")}
        </Button>
      </Sheet>
    </Stack>
  );
};

export default ResetPassword;
