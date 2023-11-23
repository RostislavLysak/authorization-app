import { Button, Box, Stack, Typography } from "@mui/joy";
import InputControl from "@/components/InputControl";
import useForm from "@/hooks/useForm";
import { useMe } from "@/hooks/useMe";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import ChangePassword from "@/components/ChangePassword";
import ChangeEmail from "@/components/ChangeEmail";
import DeleteAccount from "@/components/DeleteAccount";

const Security = () => {
  const refPassword = useRef<any>();
  const refEmail = useRef<any>();
  const refDelete = useRef<any>();
  const { t } = useTranslation();
  const { me } = useMe();
  const { email }: any = me?.data;
  const { register } = useForm({
    email,
  });

  return (
    <>
      <Stack
        spacing={4}
        sx={{
          justifyContent: "space-between",
          py: 3,
          px: 2,
          gap: 2,
          border: "none",
        }}
      >
        <Box display="flex" alignItems="flex-end">
          <InputControl
            label={t("auth.register.label.email")}
            placeholder={t("auth.register.placeholder.email")}
            type="email"
            {...register("email")}
            sx={{ width: "250px" }}
            disabled
          />
          <Button
            fullWidth
            onClick={() => refEmail.current.open()}
            sx={{
              ml: 1,
            }}
          >
            {t("auth.changeEmail.button.change")}
          </Button>
          <ChangeEmail ref={refEmail} />
        </Box>
        <Box>
          <Typography fontSize="sm" fontWeight="bold">
            {t("auth.changePassword.label.password")}
          </Typography>
          <Button fullWidth onClick={() => refPassword.current.open()} sx={{ mt: 1 }}>
            {t("auth.changePassword.button.change")}
          </Button>
          <ChangePassword ref={refPassword} />
        </Box>
        <Box>
          <Typography fontSize="sm" fontWeight="bold">
            {t("auth.deleteAccount.label")}
          </Typography>
          <Button
            fullWidth
            onClick={() => refDelete.current.open()}
            sx={{ mt: 1 }}
            variant="outlined"
            color="neutral"
          >
            {t("auth.deleteAccount.button.submit")}
          </Button>
          <DeleteAccount ref={refDelete} />
        </Box>
      </Stack>
    </>
  );
};

export default Security;
