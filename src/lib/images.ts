// Image API utilities for stock photos

interface ImageSearchRequest {
  query: string;
  perPage?: number;
  page?: number;
}

interface ImageResult {
  id: number;
  url: string;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
    tiny: string;
  };
  photographer: string;
  alt: string;
}

interface ImageSearchResponse {
  images: ImageResult[];
  totalResults: number;
  nextPage?: string;
}

// Mock image search for development (replace with actual Pexels API)
export async function searchImages(request: ImageSearchRequest): Promise<ImageSearchResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock image data - in production, this would call the actual Pexels API
  const mockImages: ImageResult[] = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg',
      src: {
        original: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg',
        large: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&h=350',
        small: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&h=130',
        tiny: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=280'
      },
      photographer: 'Christina Morillo',
      alt: `${request.query} - Professional photo`
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      src: {
        original: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
        large: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&h=350',
        small: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&h=130',
        tiny: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=280'
      },
      photographer: 'Christina Morillo',
      alt: `${request.query} - Creative photo`
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg',
      src: {
        original: 'https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg',
        large: 'https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        medium: 'https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg?auto=compress&cs=tinysrgb&h=350',
        small: 'https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg?auto=compress&cs=tinysrgb&h=130',
        tiny: 'https://images.pexels.com/photos/1181280/pexels-photo-1181280.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=280'
      },
      photographer: 'Christina Morillo',
      alt: `${request.query} - Beautiful photo`
    }
  ];

  return {
    images: mockImages.slice(0, request.perPage || 6),
    totalResults: 100,
    nextPage: request.page ? `page=${(request.page || 1) + 1}` : 'page=2'
  };
}

// Get trending/popular images
export async function getTrendingImages(): Promise<ImageResult[]> {
  const trendingQueries = ['business', 'technology', 'lifestyle', 'nature', 'success'];
  const randomQuery = trendingQueries[Math.floor(Math.random() * trendingQueries.length)];
  
  const response = await searchImages({ query: randomQuery, perPage: 4 });
  return response.images;
}

// Function to download/save image (for future implementation)
export async function downloadImage(imageUrl: string, filename: string): Promise<void> {
  // This would implement the actual download functionality
  console.log(`Downloading image: ${imageUrl} as ${filename}`);
}