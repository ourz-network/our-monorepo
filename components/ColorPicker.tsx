import { Box } from "degene-sais-quoi";
import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

const ColorPicker = ({ name, currentValue, updateColor }) => {
  const [color, setColor] = useState(currentValue ?? "#000");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    updateColor({ name: name, color: newColor });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="2" marginTop="1">
      <HexColorPicker color={color} onChange={handleColorChange} />
      <HexColorInput color={color} onChange={handleColorChange} />
    </Box>
  );
};

export default ColorPicker;
