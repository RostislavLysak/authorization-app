import { PropsWithChildren } from "react";

export interface ThemeProviderProps extends PropsWithChildren {}

export type Mode = "light" | "dark";

export interface IThemeContext {
  mode: Mode;
  setMode: (mode: Mode) => void;
}
