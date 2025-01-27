import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { DogBreeds, BreedImage } from '../types';

export const BreedGallery: React.FC = () => {
  const [breeds, setBreeds] = useState<BreedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [breedImages, setBreedImages] = useState<string[]>([]);

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      fetchBreedImages(selectedBreed);
    }
  }, [selectedBreed]);

  const fetchBreeds = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const data: DogBreeds = await response.json();
      
      const breedPromises = Object.keys(data.message).map(async (breed) => {
        const imageResponse = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const imageData = await imageResponse.json();
        return {
          breed,
          url: imageData.message
        };
      });

      const breedImages = await Promise.all(breedPromises);
      setBreeds(breedImages);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBreedImages = async (breed: string) => {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`);
      const data = await response.json();
      setBreedImages(data.message);
    } catch (error) {
      console.error('Error fetching breed images:', error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 margin-y-4">
      {selectedBreed && breedImages.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize">
            {selectedBreed} Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {breedImages.map((url) => {
              const imageId = url.split('/').pop()?.split('.')[0];
              return (
                <Link
                  key={url}
                  to={`/image/${imageId}`}
                  state={{ image: { url, backgroundColor: 'transparent' } }}
                  className="block group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden shadow-md transition-transform duration-200 group-hover:scale-105">
                    <img
                      src={url}
                      alt={selectedBreed}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-20 capitalize">
            BreedWise Gallery
          </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      
        {breeds.map(({ breed, url }) => (
          <button
            key={breed}
            onClick={() => setSelectedBreed(breed)}
            className={`group relative rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:scale-105 ${
              selectedBreed === breed ? 'ring-4 ring-indigo-500' : ''
            }`}
          >
            <div className="aspect-square">
              <img
                src={url}
                alt={breed}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
              <span className="text-white font-medium capitalize">
                {breed}
              </span>
            </div>
          </button>
        ))}
      </div>

      
    </div>
  );
};