

import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#0f0a19" : "#f4f6fb",
        color: props.colorMode === "dark" ? "gray.300" : "gray.800",
      },
    }),
  },
});

export default theme;