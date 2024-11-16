import React, { useState } from 'react';
import axios from 'axios';

function IngredientSearch({ onSearchResults }) {
  const [ingredients, setIngredients] = useState('');
  
  const handleSearch = async () => {
    if (!ingredients.trim()) return;
    try {
      const response = await axios.post('http://localhost:3002/api/search-recipes', { ingredients: ingredients.split(',') });
      onSearchResults(response.data.data);
    } catch (error) {
      console.error("Error searching for recipes:", error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients, separated by commas" 
      />
      <button onClick={handleSearch}>Search Recipes</button>
    </div>
  );
}

export default IngredientSearch;
