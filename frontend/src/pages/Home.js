// src/pages/Home.js
import React, { useState } from 'react';
import IngredientSearch from '../components/IngredientSearch';
import RecipeList from '../components/RecipeList';


function Home() {
  const [recipes, setRecipes] = useState([]);

  const handleSearchResults = (data) => {
    setRecipes(data);
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <IngredientSearch onSearchResults={handleSearchResults} />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default Home;
