import { useState, createContext } from "react";
import {
  StyledEngineProvider,
  CssVarsProvider,
  extendTheme,
  useColorScheme,
  getInitColorSchemeScript,
} from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

import { ThemeProviderProps, Mode, IThemeContext } from "./typesProvider";

const theme = extendTheme({
  components: {
    JoyButton: {
      styleOverrides: {
        root() {
          return {
            userSelect: "none",
          };
        },
      },
    },
    JoyLink: {
      defaultProps: {
        underline: "none",
      },
    },
  },
});

export const ThemeContext = createContext<IThemeContext | null>(null);

// const UiProvider = ({ children }: ThemeProviderProps) => {
//   const [mode, setMode] = useState<Mode>(
//     localStorage.getItem("mode") as Mode ?? 'light'
//   );

//   const scheme = useColorScheme();

//   document.body.dataset.mode = localStorage.getItem("mode") || mode;

//   const handleChangeMode = (mode: Mode) => {
//     setMode(mode);
//     scheme.setMode(mode);

//     document.body.dataset.mode = mode;
//     localStorage.setItem("mode", mode);
//   };

//   const value = {
//     mode,
//     setMode: handleChangeMode,
//   };

//   return (
//     <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
//   );
// };

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssVarsProvider defaultMode={"light"} theme={theme}>
          <CssBaseline />
          {/* <UiProvider>{children}</UiProvider> */}
          {children}
        </CssVarsProvider>
      </StyledEngineProvider>
    </>
  );
};
