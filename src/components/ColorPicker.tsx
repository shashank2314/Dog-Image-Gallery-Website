import React from 'react';
import { MdPalette } from 'react-icons/md';

interface ColorPickerProps {
  currentColor: string;
  onChange: (color: string) => void;
}

const colors = [
  'transparent',
  '#f87171',
  '#fb923c',
  '#fbbf24',
  '#a3e635',
  '#34d399',
  '#22d3ee',
  '#60a5fa',
  '#a78bfa',
  '#f472b6',
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ currentColor, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <MdPalette className="w-5 h-5 text-white" />
      <div className="flex space-x-1">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
              color === 'transparent'
                ? 'bg-white bg-opacity-20'
                : ''
            } ${
              color === currentColor
                ? 'border-white scale-110'
                : 'border-transparent'
            }`}
            style={{ backgroundColor: color !== 'transparent' ? color : undefined }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
    </div>
  );
}