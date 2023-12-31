import { Pressable, View, Text, StyleSheet } from 'react-native';

import { useTheme } from '../theme';

interface IRoundButtonProps {
  onPress: () => void;
  label?: string | number;
  style?: object;
}
const RoundButton = ({ onPress, label, style }: IRoundButtonProps) => {
  const { theme } = useTheme();
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress}>
      <View
        style={[
          {
            borderColor: theme.colors.accent,
          },
          styles.container,
          style,
        ]}>
        <Text style={{ color: theme.colors.textColors.secondaryText }}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
