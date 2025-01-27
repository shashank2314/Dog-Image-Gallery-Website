import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { ColorPicker } from './ColorPicker';
import { ImageSlider } from './ImageSlider';
import { GalleryImage, Dog } from '../types';

export const ImageDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState<GalleryImage>(location.state?.image);
  const [relatedImages, setRelatedImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedImages();
  }, []);
  useEffect(()=>{
    setImage(location.state?.image);
  },[location.state])
  const fetchRelatedImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/image/random/6');
      const data: Dog = await response.json();
      const galleryImages: GalleryImage[] = data.message.map((url) => ({
              url,
              backgroundColor: 'transparent'
            }));
      setRelatedImages(galleryImages);
    } catch (error) {
      console.error('Error fetching related images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (color: string) => {
    setImage(prev => ({ ...prev, backgroundColor: color }));
  };
  const handleImageClick = (image: GalleryImage) => {
      const imageId = image.url.split('/').pop()?.split('.')[0];
      navigate(`/image/${imageId}`, { state: { image } });
  };

  if (!image) {
    navigate('/');
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="relative">
        <button
          onClick={() => navigate('/')}
          className="absolute -top-4 -right-2 bg-white/50 backdrop-blur-md rounded-xl px-4 py-2.5 text-black hover:bg-white/90 transition-all duration-200 flex items-center space-x-2 group shadow-lg hover:scale-105 z-10"
        >
          <span className="font-medium">Close</span>
          <IoClose className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-200" />
        </button>
        
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-6 " style={{ backgroundColor: image.backgroundColor }}>
          <div
            className="rounded-xl overflow-hidden shadow-lg"
            
          >
            <img
              src={image.url}
              alt="Dog"
              className="w-full h-auto"
              loading="eager"
            />
          </div>
          
          <div className="mt-6 flex justify-center">
            <div className="bg-black/60 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-lg">
              <ColorPicker
                currentColor={image.backgroundColor}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">More Dogs You Might Like</h2>
        <ImageSlider images={relatedImages} handleImageClick={handleImageClick} loading={loading} />
      </div>
    </div>
  );
};