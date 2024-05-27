import "@mui/material/styles/createPalette";
import { createTheme } from "@mui/material";

export interface Gradients {
  info: string[];
  danger: string[];
  primary: string[];
  success: string[];
  error: string[];
}

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    chaosBlack: string;
    subText: string;
    buttons: string;
    success: string;
  }

  interface PaletteOptions {
    gradients: Gradients;
  }

  interface Palette {
    gradients: Gradients;
  }
}

const gradients: Gradients = {
  info: ["#ffc145", "#e59f13"],
  danger: ["#ff7d45", "#ea5110"],
  primary: ["#3d98ff", "#076ee2"],
  success: ["#2ed313", "#20a90a"],
  error: ["#cf2a2a", "#aa0606"],
};

const colors = {
  primary: {
    main: "#3d98ff",
  },
  secondary: {
    main: "#AEAEAE",
    light: "#e0e0e0",
  },
  success: {
    main: "#4ca90c",
  },
  error: {
    main: "#dc2101",
  },
};

const chaosBlack = "#4f4f4f";
const subText = colors.secondary.main;
const buttons = colors.primary.main;
const success = colors.success.main;

const breakpoints = {
  values: {
    xs: 0,
    sm: 546,
    md: 768,
    lg: 1064,
    xl: 1400,
  },
};

export const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
  palette: {
    ...colors,

    common: {
      chaosBlack,
      subText,
      buttons,
      success,
    },

    gradients,
  },
  breakpoints,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "24px",
          paddingRight: "24px",
          [`@media (min-width: ${breakpoints.values.lg}px)`]: {
            paddingLeft: "60px",
            paddingRight: "60px",
            maxWidth: "100%",
          },
          [`@media (min-width: ${breakpoints.values.xl}px)`]: {
            paddingLeft: "76px",
            paddingRight: "76px",
          },
        },
      },
    },
  },
});
