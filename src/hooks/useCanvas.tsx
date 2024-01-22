import { SkPoint, Skia, TouchInfo, useTouchHandler, vec } from '@shopify/react-native-skia';
import { useCallback, useRef, useState } from 'react';
import { useSharedValue, withSpring } from 'react-native-reanimated';

import { IPaintStyle, Tools } from '../shared.types';

interface IShape extends IPaintStyle {
  tool: string;
  coordinates: any;
}

const useCanvas = ({ paintStyle, tool }: { paintStyle: IPaintStyle; tool: string }) => {
  const [shapes, setShapes] = useState<IShape[]>([]); // Array to store all the shapes drawn on the canvas
  const [trash, putInTrash] = useState<IShape[]>([]); // Array to store the shapes that are deleted
  const [, reRender] = useState(0); // State variable to force re-render
  const currentShape = useRef<IShape>(null); // Reference to the current shape being drawn
  const sharedValueX = useSharedValue(5);
  const sharedValueY = useSharedValue(5); // Shared value for Square shape
  const sharedValue = useSharedValue<SkPoint | null>(null); // Shared value for Line shape

  // Function to create a new shape based on the selected tool
  const createShape = (x: number, y: number) => {
    switch (tool) {
      case Tools.square:
        return {
          tool,
          coordinates: { x, y, width: sharedValueX, height: sharedValueY },
          ...paintStyle,
        };
      case Tools.circle:
        return { tool, coordinates: { cx: x, cy: y, r: sharedValueX }, ...paintStyle };
      case Tools.line:
        sharedValue.value = vec(x, y);
        return {
          tool,
          coordinates: { p1: vec(x, y), p2: sharedValue },
          ...paintStyle,
        };
      default: {
        // pen
        const path = Skia.Path.Make();
        path.moveTo(x, y);
        return { tool, coordinates: { path }, ...paintStyle };
      }
    }
  };

  // Callback function when drawing starts
  const onDrawingStart = useCallback(
    (touchInfo: TouchInfo) => {
      const { x, y } = touchInfo;
      const newShape = createShape(x, y);
      // @ts-ignore
      currentShape.current = newShape;
      // TODO: Figure out a better way to rerender
      reRender((old) => old + 1); // Force re-render to render the current shape
    },
    [tool, paintStyle],
  );

  // Callback function when drawing is in progress
  const onDrawingActive = useCallback(
    (touchInfo: TouchInfo) => {
      const { x, y } = touchInfo;
      const shape = currentShape.current;
      if (!shape) return;
      if (tool === Tools.circle) {
        const deltaX = shape.coordinates.cx - x;
        const deltaY = shape.coordinates.cy - y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        currentShape.current.coordinates.r.value = withSpring(distance);
      } else if (tool === Tools.square) {
        currentShape.current.coordinates.width.value = withSpring(x - shape.coordinates.x);
        currentShape.current.coordinates.height.value = withSpring(y - shape.coordinates.y);
      } else if (tool === Tools.pen) {
        const lastPoint = currentShape.current.coordinates.path.getLastPt();
        const xMid = (lastPoint.x + x) / 2;
        const yMid = (lastPoint.y + y) / 2;
        currentShape.current.coordinates.path.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      } else if (tool === Tools.line) {
        currentShape.current.coordinates.p2.value = withSpring(vec(x, y));
        currentShape.current.coordinates.x = x;
        currentShape.current.coordinates.y = y;
      }
    },
    [tool, paintStyle],
  );

  // Callback function when drawing ends
  const onDrawingEnd = useCallback(() => {
    setShapes((shapes) => {
      if (!currentShape.current) return shapes;
      if (tool === Tools.circle) {
        currentShape.current.coordinates.r = currentShape.current.coordinates.r.value;
      } else if (tool === Tools.square) {
        const shape = currentShape.current;
        currentShape.current.coordinates.width = shape.coordinates.width.value;
        currentShape.current.coordinates.height = shape.coordinates.height.value;
      } else if (tool === Tools.line) {
        currentShape.current.coordinates.p2 = vec(
          currentShape.current.coordinates.x,
          currentShape.current.coordinates.y,
        );
      }
      sharedValueX.value = 5;
      sharedValueY.value = 5;
      sharedValue.value = vec(5, 5);
      return [...shapes, currentShape.current];
    });
    putInTrash([]);

    // @ts-ignore
    currentShape.current = null;
  }, [tool, paintStyle]);

  // Touch handler for handling touch events on the canvas
  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
      onEnd: onDrawingEnd,
    },
    [onDrawingActive, onDrawingStart],
  );

  // Function to clear the canvas
  const onClear = () => {
    setShapes([]);
    putInTrash([]);
  };

  // Function to undo the last drawn shape
  const undo = () => {
    if (shapes.length === 0) return;
    const shape = shapes.splice(shapes.length - 1, 1)[0];
    putInTrash((old) => [...old, shape]);
    setShapes([...shapes]);
  };

  // Function to redo the last deleted shape
  const redo = () => {
    if (trash.length === 0) return;
    const shape = trash.splice(trash.length - 1, 1)[0];
    setShapes((old) => [...old, shape]);
    putInTrash([...trash]);
  };

  return {
    undo,
    redo,
    onClear,
    touchHandler,
    shapes,
    currentShape: currentShape.current,
  };
};

export default useCanvas;
