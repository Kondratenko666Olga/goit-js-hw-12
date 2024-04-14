import axios from 'axios';

const API_KEY = '43258718-b5e692e88f6a0e01a4c3d4849';
const BASE_URL = `https://pixabay.com/api/`;

export async function fetchImages(query, page) {
  try {
      const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`);
      return response.data.hits;
  } catch (error) {
      console.error('Error fetching images:', error.message);
      return [];
  }
};
console.log(fetchImages());