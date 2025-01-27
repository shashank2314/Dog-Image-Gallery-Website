import React from 'react';
import { IoClose } from 'react-icons/io5';
import { GalleryImage } from '../types';
import { ColorPicker } from './ColorPicker';

interface ImageModalProps {
  image: GalleryImage | null;
  isOpen: boolean;
  onClose: () => void;
  onColorChange?: (color: string, imageUrl: string) => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ 
  image, 
  isOpen, 
  onClose,
  onColorChange 
}) => {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      <div
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="relative max-w-4xl w-full mx-4 transform animate-modalSlideIn">
        <div className="absolute -top-14 right-0 flex items-center space-x-6">
          {onColorChange && (
            <div className="bg-black/60 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-lg transform transition-all duration-200 hover:scale-105">
              <ColorPicker
                currentColor={image.backgroundColor}
                onChange={(color) => onColorChange(color, image.url)}
              />
            </div>
          )}
          <button
            onClick={onClose}
            className="bg-black/60 backdrop-blur-md rounded-xl px-4 py-2.5 text-white hover:bg-black/70 transition-all duration-200 flex items-center space-x-2 group shadow-lg hover:scale-105"
          >
            <span className="font-medium">Close</span>
            <IoClose className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform transition-all duration-300 hover:scale-[1.01]"
          style={{ backgroundColor: image.backgroundColor }}
        >
          <img
            src={image.url}
            alt="Dog"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}