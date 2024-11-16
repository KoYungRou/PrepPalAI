// src/pages/RecipeRecommendations.js
import React, { useState } from 'react';
import axios from 'axios';
import RecipeList from '../components/RecipeList';

function RecipeRecommendations() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]); // Assume selected recipes are passed here or selected by user

  const getRecommendations = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/recommend-recipes', { selectedRecipes });
      setRecipes(response.data.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <h1>Recipe Recommendations</h1>
      <button onClick={getRecommendations}>Get Recommendations</button>
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default RecipeRecommendations;
