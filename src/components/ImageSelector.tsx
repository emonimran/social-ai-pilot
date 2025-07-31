'use client';

import React, { useState, useEffect } from 'react';
import { searchImages, getTrendingImages } from '@/lib/images';
import { Button } from '@/components/ui/Button';
import { Search, Download, Eye } from 'lucide-react';

interface ImageSelectorProps {
  searchQuery?: string;
  onImageSelect?: (imageUrl: string) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({ 
  searchQuery = '', 
  onImageSelect 
}) => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(searchQuery);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      loadTrendingImages();
    }
  }, [searchQuery]);

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await searchImages({ query: searchTerm, perPage: 6 });
      setImages(response.images);
    } catch (error) {
      console.error('Error searching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTrendingImages = async () => {
    setLoading(true);
    try {
      const trendingImages = await getTrendingImages();
      setImages(trendingImages);
    } catch (error) {
      console.error('Error loading trending images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    if (onImageSelect) {
      onImageSelect(imageUrl);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
        />
        <Button
          onClick={() => handleSearch(query)}
          disabled={loading}
          variant="outline"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Images Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group ${
                selectedImage === image.src.medium ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleImageClick(image.src.medium)}
            >
              <img
                src={image.src.medium}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-1">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs">Photo by {image.photographer}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          No images found. Try a different search term.
        </div>
      )}

      {selectedImage && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            ✓ Image selected! This will be included with your social media post.
          </p>
        </div>
      )}
    </div>
  );
};