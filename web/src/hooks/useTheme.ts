import { useContext } from "react";
import { ThemeContext } from "../plugins/ui/UiProvider";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("context");
  }

  return context;
};
