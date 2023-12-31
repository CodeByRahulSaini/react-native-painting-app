const lightTheme = {
  background: {
    gradient: {
      start: { x: 1, y: 1 },
      colors: ['#FFD54F', '#FFB74D', '#FF8A65'],
    },
  },
  colors: {
    primary: '#FF5722', // Deep Orange
    secondary: '#4CAF50', // Green
    accent: '#FFC107', // Amber
    error: '#F44336', // Red
    surface: '#FFFFFF', // White
    onSurface: '#212121', // Dark Grey for text on light background
    onPrimary: '#FFFFFF', // White for text on primary color
    textColors: {
      primaryText: '#212121',
      secondaryText: '#ffffff',
    },
    underlayColor: 'rgba(255,255,255,0.6)',
  },
  gradients: {
    sunrise: ['#FFD54F', '#FFB74D', '#FF8A65'], // Warm shades of sunrise
    ocean: ['#4FC3F7', '#29B6F6', '#039BE5'], // Blue shades of ocean
    forest: ['#81C784', '#66BB6A', '#4CAF50'], // Green shades of forest
    sunset: ['#EF5350', '#EC407A', '#AB47BC'], // Sunset shades
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
  colors: {
    primary: '#4CAF50', // Green
    secondary: '#FFC107', // Amber
    background: '#FFF8E1', // Light yellow
    surface: '#A5D6A7', // Light green
    error: '#D32F2F', // Red
    text: '#1B5E20', // Dark green
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#FFFFFF',
    underlayColor: 'rgba(255,255,255,0.4)',
  },
  background: lightTheme.background,
  fontSizes: lightTheme.fontSizes,
  spacing: lightTheme.spacing,
};

export { lightTheme, darkTheme };
