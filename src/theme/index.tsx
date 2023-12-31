import { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeContext } from './ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return { ...context, insets };
};
