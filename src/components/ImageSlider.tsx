import React from 'react';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { GalleryImage } from '../types';

interface ImageSliderProps {
  images: GalleryImage[];
  loading: boolean;
  handleImageClick:(image: GalleryImage) => void;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images,handleImageClick, loading }) => {
  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {images.map((image) => {
        return (
            <div key={image.url} onClick={()=>handleImageClick(image)} className="aspect-square cursor-pointer rounded-lg overflow-hidden shadow-md transition-transform duration-200 group-hover:scale-105">
              <img
                src={image.url}
                alt="Dog"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
         
        );
      })}
    </div>
  );
};