import { Snackbar, SnackbarProps } from "@mui/joy";
import { PropsWithChildren, useState } from "react";
import { keyframes } from "@mui/system";
import { AxiosError } from "axios";

interface CustomSnackbarProps extends SnackbarProps {}

const CustomSnackbar = ({
  open,
  color,
  autoHideDuration = 4000,
  anchorOrigin,
  children,
}: CustomSnackbarProps) => {
  const [show, setShow] = useState(open);

  const inAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

  const outAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

  const animationDuration = 600;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Snackbar
      anchorOrigin={anchorOrigin ?? { vertical: "top", horizontal: "right" }}
      open={show}
      onClose={handleClose}
      autoHideDuration={autoHideDuration}
      animationDuration={animationDuration}
      color={color}
      sx={{
        ...(show && {
          animation: `${inAnimation} ${animationDuration}ms forwards`,
        }),
        ...(!show && {
          animation: `${outAnimation} ${animationDuration}ms forwards`,
        }),
      }}
    >
      {/* {error?.response?.data.message} */}
      {children}
    </Snackbar>
  );
};

export default CustomSnackbar;
