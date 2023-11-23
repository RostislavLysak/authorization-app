import { Box, Button, Modal, ModalClose, ModalDialog, Stack, Typography } from "@mui/joy";
import useForm from "../../hooks/useForm";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useChangePassword } from "../../hooks/useChangePassword";
import { useTranslation } from "react-i18next";
import PasswordControl from "@/components/PasswordControl";
import CustomSnackbar from "@/components/CustomSnackbar";

type T = {
  open: () => void;
  close: () => void;
};

type ValuesForm = {
  oldPassword: string;
  newPassword: string;
};

interface ChangePasswordFormProps {
  loading: boolean;
  onSubmit: (v: ValuesForm) => void;
}

const ChangePasswordForm = ({ loading, onSubmit }: ChangePasswordFormProps) => {
  const { t } = useTranslation();

  const { register, submit } = useForm({
    oldPassword: "",
    newPassword: "",
  });

  return (
    <Stack component="form" onSubmit={submit(onSubmit)} spacing={1}>
      <Box>
        <Typography level="h4" component="h4">
          <b>{t("auth.changePassword.text.h4")}</b>
        </Typography>
        <Typography level="body-sm">{t("auth.changePassword.text.p")}</Typography>
      </Box>

      <PasswordControl
        label={t("auth.changePassword.label.oldPassword")}
        placeholder={t("auth.changePassword.label.oldPassword").toLowerCase()}
        withRate
        {...register("oldPassword")}
      />

      <PasswordControl
        label={t("auth.changePassword.label.newPassword")}
        placeholder={t("auth.changePassword.label.newPassword").toLowerCase()}
        withRate
        {...register("newPassword")}
      />
      <Button
        type="submit"
        sx={{
          mt: 1,
        }}
        disabled={loading}
      >
        {t("auth.changePassword.button.submit")}
      </Button>
    </Stack>
  );
};

const ChangePassword = ({ ...props }, ref: React.ForwardedRef<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  const { t } = useTranslation();

  const { changePassword, isLoading, isSuccess, error, isError }: any = useChangePassword();

  return (
    <>
      {isError && (
        <CustomSnackbar open={true} color="danger">
          {error?.response?.data.message}
        </CustomSnackbar>
      )}
      {isSuccess && (
        <CustomSnackbar open={true} color="success">
          {t("snackbar.changePassword")}
        </CustomSnackbar>
      )}
      <Modal open={open} onClose={handleClose}>
        <ModalDialog>
          <ModalClose />
          <ChangePasswordForm
            loading={isLoading}
            onSubmit={async (v: any) => {
              await changePassword(v);
              !isError && handleClose();
            }}
          />
        </ModalDialog>
      </Modal>
    </>
  );
};

export default forwardRef(ChangePassword);
