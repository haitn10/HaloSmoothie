// color design tokens export
export const tokensDark = {
  grey: {
    0: "#eee", // background color
    10: "#f6f6f6", 
    50: "#f0f0f0", // mài khi click
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#fff", // màu nav
  },
  primary: {
    100: "#dce2dc",
    200: "#b8c4b9",
    300: "#95a796",
    400: "#fff", //màu chữ active 
    500: "#4e6c50",
    600: "#3e5640",
    700: "#2f4130",
    800: "#1f2b20",
    900: "#101610",
  },
  secondary: {
    100: "#ffffff", 
    200: "#4e6c50",
    300: "#ffffff",
    400: "#718973",
    500: "#2f4130",
    600: "#ffffff",//logo
    700: "#10654E",//background active color
    800: "#10654E",//icon and letter colums
    900: "#10654E",//color chữ
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
