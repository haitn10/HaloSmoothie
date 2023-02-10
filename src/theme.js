// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", // manually adjusted
    10: "#f6f6f6", // manually adjusted
    50: "#f0f0f0", // manually adjusted
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#678983", // manually adjusted
  },
  primary: {
    100: "#dce2dc",
    200: "#b8c4b9",
    300: "#95a796",
    400: "#ffffff",
    500: "#4e6c50",
    600: "#3e5640",
    700: "#2f4130",
    800: "#1f2b20",
    900: "#101610",
  },
  // primary: {
  //   // blue
  //   100: "#d3d4de",
  //   200: "#a6a9be",
  //   300: "#7a7f9d",
  //   400: "#4d547d",
  //   500: "#21295c",
  //   600: "#191F45", // manually adjusted
  //   700: "#141937",
  //   800: "#0d1025",
  //   900: "#070812",
  // },
  // secondary: {
  //   // yellow
  //   50: "#f0f0f0", // manually adjusted
  //   100: "#dce2dc",
  //   200: "#b8c4b9",
  //   300: "#95a796",
  //   400: "#718973",
  //   500: "#4e6c50",
  //   600: "#3e5640",
  //   700: "#2f4130",
  //   800: "#1f2b20",
  //   900: "#101610",
  // },
  secondary: {
    100: "#ffffff",
    200: "#4e6c50",
    300: "#ffffff",
    400: "#718973",
    500: "#2f4130",
    600: "#ffffff",
    700: "#999999",
    800: "#ffffff",
    900: "#333333",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[1000],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[1000],
            },
          }),
    },
  };
};
