import { Modal, View, StyleSheet, Text, Pressable } from 'react-native';
import ColorPicker, {
  Panel1,
  Swatches,
  OpacitySlider,
  HueSlider,
  returnedResults,
} from 'reanimated-color-picker';

import { IPaintStyle } from '../shared.types';
import { useTheme } from '../theme';

interface IColorPickerProps {
  onSelectColor: ((colors: returnedResults) => void) | undefined;
  show: boolean;
  selectedColor: IPaintStyle['color'];
  onClose: () => void;
}

const ColorPickerComponent = ({
  onSelectColor,
  show,
  onClose,
  selectedColor,
}: IColorPickerProps) => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <Modal visible={show} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ColorPicker value={selectedColor} onComplete={onSelectColor}>
            <Panel1 style={styles.gutter} />
            <HueSlider style={styles.gutter} />
            <OpacitySlider style={styles.gutter} />
            <Swatches style={styles.gutter} />
          </ColorPicker>
          <Pressable onPress={onClose}>
            <Text style={[{ color: colors.textColors.primaryText }, styles.button]}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ColorPickerComponent;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gutter: {
    marginVertical: 8,
  },
  button: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
