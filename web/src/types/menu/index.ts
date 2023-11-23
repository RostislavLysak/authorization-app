import { ModalProps } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

export interface BurgerMenuProps {
  contentSx?: SxProps;
  title?: string;
  position?: "left" | "right" | "top" | "bottom";
  children?: React.ReactNode;
}

export interface DrawerProps
  extends Omit<ModalProps, "open" | "children" | "onClose">,
    BurgerMenuProps {
  open: boolean;
  // content?: SxProps;
  // children: React.ReactNode;
  // title?: string;
  size?: number | string;
  onClose: VoidFunction;

  // position?: "left" | "right" | "top" | "bottom";
}
