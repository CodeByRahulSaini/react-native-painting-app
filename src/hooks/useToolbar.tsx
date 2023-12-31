import { useState } from 'react';

import { Tools, IPaintStyle } from '../shared.types';

const useToolbar = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [paintStyle, setPaintStyle] = useState<IPaintStyle>({ strokeWidth: 2, color: 'black' });
  const [tool, setTool] = useState<Tools>(Tools.pen);

  return {
    tool,
    showColorPicker,
    setShowColorPicker,
    setPaintStyle,
    paintStyle,
    setTool,
  };
};

export default useToolbar;
