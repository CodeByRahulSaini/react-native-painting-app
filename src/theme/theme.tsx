const lightTheme = {
  background: {
    gradient: {
      start: { x: 1, y: 1, z: 1 },
      colors: ['hsla(298, 68%, 90%, 1)', 'hsla(30, 82%, 91%, 1) '],
    },
  },
  colors: {
    primary: 'hsla(298, 68%, 90%, 1)',
    secondary: 'hsla(30, 82%, 91%, 1)',
    accent: '#FFC107',
    error: '#F44336',
    surface: '#FFFFFF',
    onSurface: '#212121',
    onPrimary: '#FFFFFF',
    textColors: {
      primaryText: '#212121',
      secondaryText: '#b79eb7',
    },
    underlayColor: 'rgba(0,0,0,0.05)',
  },
  fontSizes: {
    small: 12,
    medium: 14,
    large: 18,
    xLarge: 24,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
};

const darkTheme = {
  ...lightTheme,
};

export { lightTheme, darkTheme };
