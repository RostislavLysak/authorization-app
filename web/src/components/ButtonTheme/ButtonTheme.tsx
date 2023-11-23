import { IconButton, useColorScheme } from "@mui/joy";
import LightModeIcon from "../../plugins/ui/icons/LightModeIcon";
import DarkModeIcon from "../../plugins/ui/icons/DarkModeIcon";

const ButtonTheme = ({ ...props }) => {
  const scheme = useColorScheme();

  return (
    <IconButton
      {...props}
      size="sm"
      onClick={() => scheme.setMode(scheme.mode === "dark" ? "light" : "dark")}
      variant="outlined"
    >
      {scheme.mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ButtonTheme;
