import { Box, Sheet, Typography, Button, Stack } from "@mui/joy";
import useForm from "../../hooks/useForm";
import { useAuthorize } from "../../hooks/useAuthorize";
import linking from "../../routes/linking";
import { useTranslation } from "react-i18next";
import UniversalLink from "@/components/UniversalLink";
import PasswordControl from "@/components/PasswordControl";
import InputControl from "@/components/InputControl";
import CustomSnackbar from "@/components/CustomSnackbar";

const Login = () => {
  const { t } = useTranslation();
  const { submit, register } = useForm({
    email: "",
    password: "",
  });

  const { login, isLoading: loading, error, isError }: any = useAuthorize();

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
        onSubmit={submit(login)}
      >
        <Box>
          <Typography level="h4" component="h1">
            <b>{t("auth.login.text.h1")}</b>
          </Typography>
          <Typography level="body-sm">{t("auth.login.text.p")}</Typography>
        </Box>

        <InputControl
          label={t("auth.login.label.email")}
          placeholder={t("auth.login.placeholder.email")}
          type="email"
          {...register("email")}
        />

        <PasswordControl
          sx={{ marginBottom: "26px" }}
          label={
            <>
              {t("auth.login.label.password")}
              <UniversalLink fontSize="sm" href={linking.auth.forgetPassword} lineHeight={0}>
                {t("auth.login.links.forgotPassword")}
              </UniversalLink>
            </>
          }
          placeholder={t("auth.login.placeholder.password")}
          {...register("password")}
        />

        <Button
          type="submit"
          sx={{
            mt: 1,
          }}
          loading={loading}
        >
          {t("auth.login.button.submit")}
        </Button>

        <Typography
          endDecorator={
            <UniversalLink href={linking.auth.register}>
              {t("auth.login.links.signUp.submit")}
            </UniversalLink>
          }
          fontSize="sm"
          sx={{
            alignSelf: "center",
          }}
        >
          {t("auth.login.links.signUp.label")}{" "}
        </Typography>
      </Sheet>
    </Stack>
  );
};

export default Login;
