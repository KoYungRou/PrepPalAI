// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import RecipeList from '../components/RecipeList';  // Assuming you have a RecipeList component

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');

  // Fetch all recipes when the component mounts
  useEffect(() => {
    // Fetch all recipes on initial load (GET /recipes)
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');  // Replace with your backend URL
        setRecipes(response.data);
      } catch (err) {
        setError('Error fetching recipes');
        console.error(err);
      }
    };
    fetchRecipes();
  }, []);  // Empty array to run only once when component mounts

  // Handle search by ingredients
  const handleSearch = async () => {
    try {
      // Send ingredients to the backend for search (POST /search-recipes)
      const response = await axios.post('http://localhost:5000/api/search-recipes', {
        ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()) // Split ingredients by comma and trim spaces
      });
      setRecipes(response.data.data);  // Set the matched recipes
    } catch (err) {
      setError('Error searching for recipes');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Meal Prep Helper</h1>
      <div>
        <input
          type="text"
          placeholder="Enter ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <button onClick={handleSearch}>Search Recipes</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <RecipeList recipes={recipes} /> {/* Assuming you have this component to display recipes */}
    </div>
  );
}

export default Home;
