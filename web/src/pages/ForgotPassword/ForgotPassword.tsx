import { Box, Button, IconButton, Sheet, Stack, Typography, useColorScheme } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useForgetPassword } from "../../hooks/useForgetPassword";
import linking from "../../routes/linking";
import ArrowIcon from "../../plugins/ui/icons/ArrowIcon";
import { useTranslation, Trans } from "react-i18next";
import InputControl from "@/components/InputControl";
import CustomSnackbar from "@/components/CustomSnackbar";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useColorScheme();
  const boxShadow = theme.mode === "dark" ? "none" : "md";

  const { values, register, submit } = useForm({ email: "" });
  const { forgetPassword, isLoading, isSuccess, error, isError }: any = useForgetPassword();

  if (isSuccess) {
    return (
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "column",
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
          <Trans components={{ br: <br /> }}>{t("emailSend.forgetPassword.h1")}</Trans>
          <Typography component="span" fontWeight="bold" color="primary">
            {`${values.email}`}
          </Typography>
        </Typography>
        <Typography level="title-md" component="p" fontWeight="normal">
          {t("emailSend.forgetPassword.p")}
        </Typography>
      </Sheet>
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
        onSubmit={submit(forgetPassword)}
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
            <b>{t("auth.forgetPassword.button.label")}</b>
          </Typography>
        </Stack>
        <Box>
          <Typography level="h4" component="h1">
            <b>{t("auth.forgetPassword.text.h1")}</b>
          </Typography>
          <Typography level="body-sm">{t("auth.forgetPassword.text.p")}</Typography>
        </Box>

        <InputControl
          label={t("auth.forgetPassword.label.email")}
          placeholder={t("auth.forgetPassword.placeholder.email")}
          type="email"
          {...register("email")}
        />
        <Button
          type="submit"
          sx={{
            mt: 1,
          }}
          disabled={isLoading}
        >
          {t("auth.forgetPassword.button.submit")}
        </Button>
      </Sheet>
    </Stack>
  );
};

export default ForgotPassword;
