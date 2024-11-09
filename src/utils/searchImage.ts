import { ImageData } from "./types";

export const searchImages = async (query: string): Promise<ImageData[]> => {
  const modifiedQuery = query.trim().includes(" ")
    ? query.split(" ").join("+")
    : query;

  const response = await fetch(
    `https://pixabay.com/api/?key=46971370-2ebaf1051071345fc3300c8e8&q=${modifiedQuery}&image_type=photo&pretty=true`
  );

  const imageData = await response.json();
  return imageData.hits;
};

export const searchSpecificImage = async (id: number): Promise<string> => {
  const response = await fetch(
    `https://pixabay.com/api/?key=46971370-2ebaf1051071345fc3300c8e8&id=${id}`
  );

  const imageData = await response.json();
  return imageData.hits[0].previewURL;
};
