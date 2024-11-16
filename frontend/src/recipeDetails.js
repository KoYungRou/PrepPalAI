import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RecipeDetail({ match }) {
  const [recipe, setRecipe] = useState(null);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`http://localhost:5000/api/recipes/${match.params.id}`);
      setRecipe(response.data.data);
    };
    
    fetchRecipe();
  }, [match.params.id]);
  
  if (!recipe) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>{recipe.link}</p>
    </div>
  );
}

export default RecipeDetail;
