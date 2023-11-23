import { Box, Sheet, Typography, Button, Stack } from "@mui/joy";
import useForm from "../../hooks/useForm";
import { useAuthorize } from "../../hooks/useAuthorize";
import linking from "../../routes/linking";
import { useTranslation } from "react-i18next";
import UniversalLink from "@/components/UniversalLink";
import PasswordControl from "@/components/PasswordControl";
import InputControl from "@/components/InputControl";
import CustomSnackbar from "@/components/CustomSnackbar";

const Registration = () => {
  const { t } = useTranslation();
  const { errors, register, submit } = useForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    {
      firstName: (v) => {
        if (!v.length) return "Required";
        if (v.length < 3) return "Min 3";
        if (v.length > 12) return "Max 12";
        return true;
      },
      lastName: (v) => {
        if (!v.length) return "Required";
        if (v.length < 3) return "Min 3";
        if (v.length > 12) return "Max 12";
        return true;
      },
      email: (v) => {
        if (!v.length) return "Required";
        if (v.length < 6) return "Min 6";
        return true;
      },
      password: (v) => {
        if (!v.length) return "Required";
        return true;
      },
    },
  );

  const { signUp, isLoading: loading, error, isError }: any = useAuthorize();

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
        onSubmit={submit(signUp)}
      >
        <Box>
          <Typography level="h4" component="h1">
            <b>{t("auth.register.text.h1")}</b>
          </Typography>
          <Typography level="body-sm">{t("auth.register.text.p")}</Typography>
        </Box>

        <InputControl
          label={t("auth.register.label.firstName")}
          placeholder={t("auth.register.placeholder.firstName")}
          helperText={errors["firstName"]}
          {...register("firstName")}
        />
        <InputControl
          label={t("auth.register.label.lastName")}
          placeholder={t("auth.register.placeholder.lastName")}
          helperText={errors["lastName"]}
          {...register("lastName")}
        />
        <InputControl
          label={t("auth.register.label.email")}
          placeholder={t("auth.register.placeholder.email")}
          type="email"
          helperText={errors["email"]}
          {...register("email")}
        />

        <PasswordControl
          label={t("auth.register.label.password")}
          placeholder={t("auth.register.placeholder.password")}
          withRate
          {...register("password")}
        />

        <Button
          type="sumbit"
          sx={{
            mt: 1,
          }}
          loading={loading}
        >
          {t("auth.register.button.submit")}
        </Button>

        <Typography
          endDecorator={
            <UniversalLink href={linking.auth.login}>
              {t("auth.register.links.signIn.submit")}
            </UniversalLink>
          }
          fontSize="sm"
          sx={{
            alignSelf: "center",
          }}
        >
          {t("auth.register.links.signIn.label")}
        </Typography>
      </Sheet>
    </Stack>
  );
};

export default Registration;
