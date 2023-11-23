import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomSnackbar from "@/components/CustomSnackbar";
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
import WarningIcon from "@/plugins/ui/icons/WarningIcon";

type T = {
  open: () => void;
  close: () => void;
};

const DeleteAccount = ({ ...props }, ref: React.ForwardedRef<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  const { t } = useTranslation();

  const { deleteAccount, isLoading, error, isError }: any = useDeleteAccount();

  return (
    <>
      {isError && (
        <CustomSnackbar open={true} color="danger">
          {error?.response?.data.message}
        </CustomSnackbar>
      )}

      <Modal open={open} onClose={handleClose}>
        <ModalDialog>
          <DialogTitle sx={{ alignItems: "center" }}>
            <WarningIcon />
            {t("auth.deleteAccount.text.h4")}
          </DialogTitle>
          <Divider />
          <DialogContent>{t("auth.deleteAccount.text.p")}</DialogContent>

          <DialogActions>
            <Button variant="solid" color="danger" onClick={deleteAccount} loading={isLoading}>
              {t("auth.deleteAccount.button.submit")}
            </Button>
            <Button variant="plain" color="neutral" onClick={handleClose}>
              {t("auth.deleteAccount.button.cancel")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default forwardRef(DeleteAccount);
