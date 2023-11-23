import { useState, useImperativeHandle, forwardRef } from "react";
import Box from "@mui/joy/Box";
import ButtonGroup from "@mui/joy/ButtonGroup";
import IconButton from "@mui/joy/IconButton";
import Drawer from "./Drawer";
import BurgerMenuIcon from "../../plugins/ui/icons/BurgerMenuIcon";
import { useTranslation } from "react-i18next";
import { BurgerMenuProps } from "../../types/menu";

type T = {
  open: () => void;
  close: () => void;
};

const BurgerMenu = (
  { position = "left", title, children, contentSx, ...props }: BurgerMenuProps,
  ref: React.ForwardedRef<T>,
) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  return (
    <>
      <Box {...props}>
        {/* <ButtonGroup
          orientation="vertical"
          spacing={10}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            "--ButtonGroup-connected": "1"
          }}
        >
          <IconButton onClick={() => setOpen("top")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
              />
            </svg>
          </IconButton>
          <IconButton onClick={() => setOpen("bottom")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
              />
            </svg>
          </IconButton>
        </ButtonGroup> */}
        <ButtonGroup sx={{ m: "auto" }}>
          <IconButton onClick={handleOpen}>
            <BurgerMenuIcon />
          </IconButton>
          {/* <Typography sx={{ alignSelf: "center", px: 1, marginLeft: "-1px" }}>
            Open drawer
          </Typography> */}
          {/* <IconButton onClick={() => setOpen("right")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </IconButton> */}
        </ButtonGroup>
      </Box>
      <Drawer
        open={open}
        title={title}
        position={position}
        contentSx={contentSx}
        onClose={handleClose}
      >
        {children ?? t("common.burgerMenu.children")}
      </Drawer>
    </>
  );
};

export default forwardRef(BurgerMenu);
