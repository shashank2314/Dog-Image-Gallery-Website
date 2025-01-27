export interface Dog {
  message: string[];
  status: string;
}

export interface DogBreeds {
  message: { [key: string]: string[] };
  status: string;
}

export interface GalleryImage {
  url: string;
  backgroundColor: string;
}

export interface BreedImage {
  breed: string;
  url: string;
}