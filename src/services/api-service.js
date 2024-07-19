import axios from 'axios';

const API_URL = 'http://localhost:8000'; // FastAPI server URL

export const createCollection = async (collectionName) => {
  const response = await axios.post(`${API_URL}/create_collection`, { collection_name: collectionName });
  return response.data;
};

export const deleteCollection = async (collectionName) => {
  const response = await axios.post(`${API_URL}/delete_collection`, { collection_name: collectionName });
  return response.data;
};

export const insertObjects = async (collectionName, objects) => {
  const response = await axios.post(`${API_URL}/insert_objects`, { collection_name: collectionName, objects });
  return response.data;
};

export const nearbySearch = async (collectionName, query, image = null) => {
  const response = await axios.post(`${API_URL}/nearby_search`, { collection_name: collectionName, query, image });
  return response.data;
};
