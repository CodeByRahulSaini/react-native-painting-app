import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ColorPicker from './components/ColorPicker';
import RoundButton from './components/RoundButton';
import { useTheme } from './theme';

interface IHeader {
  setPaintStyle: (paintStyle: any) => void;
  paintStyle: any;
}

const Header = ({ setPaintStyle, paintStyle }: IHeader) => {
  const { theme, insets } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const onSelectColor = ({ hex }: { hex: string }) => {
    setPaintStyle({ ...paintStyle, color: hex });
  };

  const sizes = [2, 4, 6, 10, 15, 20, 25, 30];
  const setStrokeWidth = (width: number) => {
    setPaintStyle({ ...paintStyle, strokeWidth: width });
  };

  return (
    <>
      <LinearGradient
        start={theme.background.gradient.start}
        colors={theme.background.gradient.colors}
        style={[styles.gradient, { paddingTop: insets.top }]}>
        <View style={styles.sizesContainer}>
          {sizes.map((size) => (
            <RoundButton
              key={size}
              label={size}
              style={{
                backgroundColor:
                  paintStyle.strokeWidth === size ? theme.colors.primary : 'transparent',
              }}
              onPress={() => setStrokeWidth(size)}
            />
          ))}
          <RoundButton
            onPress={() => setShowModal(true)}
            style={{ backgroundColor: paintStyle.color }}
          />
        </View>
      </LinearGradient>
      <ColorPicker
        onSelectColor={onSelectColor}
        selectedColor={paintStyle.color}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    backgroundColor: '#fff',
    elevation: 7,
    paddingHorizontal: '5%',
    paddingBottom: '2%',
  },
  icon: {
    marginRight: 0,
  },
  sizesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 5,
  },
});

export default Header;
