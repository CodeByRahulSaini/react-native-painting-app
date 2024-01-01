import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';

import { Tools } from './shared.types';
import { useTheme } from './theme';

interface ITool {
  name: string;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
}

interface IFooterProps {
  onClear: () => void;
  setTool: Dispatch<SetStateAction<Tools>>;
  tool: string;
  undo: () => void;
  redo: () => void;
}

const Footer = ({ onClear, setTool, tool, undo, redo }: IFooterProps) => {
  const { theme, insets } = useTheme();

  const tools: ITool[] = [
    {
      name: 'undo',
      icon: 'rotate-ccw',
      onPress: undo,
    },
    {
      name: 'redo',
      icon: 'rotate-cw',
      onPress: redo,
    },
    {
      name: 'trash',
      icon: 'trash',
      onPress: onClear,
    },
    {
      name: Tools.square,
      icon: 'square',
      onPress: () => setTool(Tools.square),
    },
    {
      name: Tools.circle,
      icon: 'circle',
      onPress: () => setTool(Tools.circle),
    },
    {
      name: Tools.line,
      icon: 'activity',
      onPress: () => setTool(Tools.line),
    },
    {
      name: Tools.pen,
      icon: 'pen-tool',
      onPress: () => setTool(Tools.pen),
    },
  ];

  return (
    <LinearGradient
      start={theme.background.gradient.start}
      colors={theme.background.gradient.colors}
      style={[styles.gradient, { paddingBottom: insets.bottom }]}>
      <View style={styles.iconContainer}>
        {tools.map((item) => (
          <Feather.Button
            key={item.name}
            name={item.icon}
            onPress={item.onPress}
            iconStyle={styles.icon}
            underlayColor={theme.colors.underlayColor}
            backgroundColor="transparent"
            color={
              item.name === tool
                ? theme.colors.textColors.primaryText
                : theme.colors.textColors.secondaryText
            }
          />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    display: 'flex',
    shadowColor: '#000',
    paddingTop: '2.5%',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    //@ts-ignore
    gap: '14%',
  },
  icon: {
    marginRight: 0,
  },
});

export default Footer;
