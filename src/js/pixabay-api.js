export async function fetchImages(query) {
    const API_KEY = '43258718-b5e692e88f6a0e01a4c3d4849';
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Error fetching images: ${response.statusText}`);
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Error fetching images:', error.message);
    return [];
  }
}
