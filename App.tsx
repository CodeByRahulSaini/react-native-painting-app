import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import App from './src';

const MainApp = () => (
  <SafeAreaProvider>
    {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
    <App />
    {/* </GestureHandlerRootView> */}
  </SafeAreaProvider>
);

export default MainApp;
