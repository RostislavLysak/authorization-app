import { Box, Button, Modal, ModalClose, ModalDialog, Stack, Typography } from "@mui/joy";
import useForm from "../../hooks/useForm";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomSnackbar from "@/components/CustomSnackbar";
import { useChangeEmail } from "@/hooks/useChangeEmail";
import InputControl from "../InputControl";

type T = {
  open: () => void;
  close: () => void;
};

type ValuesForm = {
  email: string;
};

interface ChangeEmailFormProps {
  loading: boolean;
  onSubmit: (v: ValuesForm) => void;
}

const ChangeEmailForm = ({ loading, onSubmit }: ChangeEmailFormProps) => {
  const { t } = useTranslation();

  const { register, submit } = useForm({
    email: "",
  });

  return (
    <Stack component="form" onSubmit={submit(onSubmit)} spacing={4}>
      <Box>
        <Typography level="h4" component="h4">
          <b>{t("auth.changeEmail.text.h4")}</b>
        </Typography>
        <Typography level="body-sm">{t("auth.changeEmail.text.p")}</Typography>
      </Box>

      <InputControl
        label={t("auth.changeEmail.label.newEmail")}
        placeholder={t("auth.changeEmail.label.newEmail").toLowerCase()}
        {...register("email")}
      />

      <Button
        type="submit"
        sx={{
          mt: 1,
        }}
        disabled={loading}
      >
        {t("auth.changeEmail.button.submit")}
      </Button>
    </Stack>
  );
};

const ChangeEmail = ({ ...props }, ref: React.ForwardedRef<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  const { t } = useTranslation();

  const { changeEmail, isLoading, isSuccess, error, isError }: any = useChangeEmail();

  return (
    <>
      {isError && (
        <CustomSnackbar open={true} color="danger">
          {error?.response?.data.message}
        </CustomSnackbar>
      )}
      {isSuccess && (
        <CustomSnackbar open={true} color="success">
          {t("snackbar.changeEmail")}
        </CustomSnackbar>
      )}
      <Modal open={open} onClose={handleClose}>
        <ModalDialog>
          <ModalClose />
          <ChangeEmailForm
            loading={isLoading}
            onSubmit={async (v: any) => {
              await changeEmail(v);
              handleClose();
            }}
          />
        </ModalDialog>
      </Modal>
    </>
  );
};

export default forwardRef(ChangeEmail);
