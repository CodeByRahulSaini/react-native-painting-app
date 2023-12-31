import React, { createContext } from 'react';

import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext({ theme: lightTheme });

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  //   const [theme, setTheme] = useState(lightTheme); // Default theme
  const theme = lightTheme;
  //   // Function to toggle theme
  //   const toggleTheme = () => {
  //     setTheme(theme === lightTheme ? darkTheme : lightTheme);
  //   };

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext };
export default ThemeProvider;
