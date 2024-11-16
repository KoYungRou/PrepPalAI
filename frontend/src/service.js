// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const searchRecipes = async (ingredients) => {
  try {
    const response = await axios.post(`${API_URL}search-recipes`, { ingredients });
    return response.data.data;
  } catch (error) {
    console.error("Error searching recipes:", error);
  }
};

export const getRecipe = async (id) => {
  try {
    const response = await axios.get(`${API_URL}recipes/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting recipe:", error);
  }
};
