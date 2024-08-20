// utils/pexels.js
import axios from 'axios';

export const fetchImages = async (page) => {
  const randomPage = Math.floor(Math.random() * 100) + 1; // Generates a random page number between 1 and 100
  const response = await axios.get('https://api.pexels.com/v1/curated', {
    params: {
      page: randomPage, // Use random page number
      per_page: 65, // Number of images per page
    },
    headers: {
      Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
    },
  });

  return response.data.photos;
};
