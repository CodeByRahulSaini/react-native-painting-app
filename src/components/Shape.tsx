import { Circle, Line, Path, Rect } from '@shopify/react-native-skia';

import { Tools } from '../shared.types';

interface IShapeProps {
  tool: string;
  coordinates: any;
  color: string;
  strokeWidth: number;
}

const Shape = ({ tool, coordinates, color, strokeWidth }: IShapeProps) => {
  const getShape = () => {
    switch (tool) {
      case Tools.square:
        return Rect;
      case Tools.circle:
        return Circle;
      case Tools.line:
        return Line;
      default:
        return Path;
    }
  };

  const Element = getShape();

  return <Element {...coordinates} color={color} strokeWidth={strokeWidth} style="stroke" />;
};

export default Shape;
