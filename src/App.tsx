import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import { Gallery } from './components/Gallery';
import { ImageDetail } from './components/ImageDetail';
import { BreedGallery } from './components/BreedGallery';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <FaPaw className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">Dog Gallery</h1>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/breeds"
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Breeds
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/image/:id" element={<ImageDetail />} />
          <Route path="/breeds" element={<BreedGallery />} />
        </Routes>
      </main>
    </div>
  );
}

export default App