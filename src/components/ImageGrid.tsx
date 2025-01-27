import React from 'react';
import { GalleryImage } from '../types';

interface ImageGridProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onImageClick
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <div
          key={image.url}
          className="group relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]"
        >
          <img
            src={image.url}
            alt="Dog"
            loading='lazy'
            className="w-full h-64 object-cover cursor-pointer"
            onClick={() => onImageClick(image)}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          </div>
        </div>
      ))}
    </div>
  );
}