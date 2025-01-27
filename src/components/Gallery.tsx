import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageGrid } from './ImageGrid';
import { Loader } from './Loader';
import { Dog, GalleryImage } from '../types';

export const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDogImages();
  }, []);

  const fetchDogImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random/20');
      const data: Dog = await response.json();
      
      const galleryImages: GalleryImage[] = data.message.map((url) => ({
        url,
        backgroundColor: 'transparent'
      }));
      
      setImages(galleryImages);
    } catch (error) {
      console.error('Error fetching dog images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image: GalleryImage) => {
    const imageId = image.url.split('/').pop()?.split('.')[0];
    navigate(`/image/${imageId}`, { state: { image } });
  };

  

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={fetchDogImages}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Fetch New Dogs
        </button>
      </div>
      
      {loading ? (
        <Loader />
      ) : (
        <ImageGrid
          images={images}
          onImageClick={handleImageClick}
        />
      )}
    </div>
  );
};