import { Canvas } from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Footer from './Footer';
import Header from './Header';
import Shape from './components/Shape';
import useCanvas from './hooks/useCanvas';
import useToolbar from './hooks/useToolbar';
import ThemeProvider from './theme/ThemeProvider';

const App = () => {
  const { tool, setTool, ...headerTools } = useToolbar();
  const { paintStyle } = headerTools;
  const { shapes, touchHandler, currentShape, onClear, undo, redo } = useCanvas({
    paintStyle,
    tool,
  });
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Header {...headerTools} />
        <Canvas style={styles.canvas} onTouch={touchHandler}>
          {shapes.map((shape, index) => (
            <Shape key={index} {...shape} />
          ))}
          {currentShape && <Shape {...currentShape} />}
        </Canvas>
        <Footer onClear={onClear} tool={tool} setTool={setTool} undo={undo} redo={redo} />
      </View>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 5,
  },
});

export default App;
