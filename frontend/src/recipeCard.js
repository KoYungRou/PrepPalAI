import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      <p>Ingredients: {recipe.ingredients.join(', ')}</p>
      <Link to={`/recipe/${recipe._id}`}>View Recipe</Link>
    </div>
  );
}

export default RecipeCard;
