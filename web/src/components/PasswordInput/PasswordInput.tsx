import { useState } from "react";
import { IconButton, Input, type InputProps } from "@mui/joy";

import VisibilityIcon from "@/plugins/ui/icons/VisibilityIcon";
import VisibilityOffIcon from "@/plugins/ui/icons/VisibilityOffIcon";

interface PasswordInputProps extends InputProps {}

const PasswordInput = (props: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <Input
      type={!show ? "password" : "text"}
      endDecorator={
        <IconButton
          sx={{
            minWidth: '16px',
            minHeight: '16px',
            border: "none",
            borderRadius: "50%",
            padding: 0,
            mr: 0.3,
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:focus": {
              backgroundColor: "transparent",
            },
          }}
          onClick={(e) => {
            e.preventDefault();
            setShow((prev) => !prev);
          }}
          type={!show ? "password" : "text"}
        >
          {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      }
      {...props}
    />
  );
};

export default PasswordInput;
