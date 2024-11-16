const express = require('express');
const Recipe = require('./models/Recipe'); // Import the Recipe model

const router = express.Router();

// Endpoint to save a recipe
router.post('/recipes', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body); // Expect the recipe data in the request body
        await newRecipe.save();
        res.status(201).json({ message: 'Recipe saved successfully', data: newRecipe });
    } catch (error) {
        res.status(500).json({ error: 'Error saving recipe', details: error.message });
    }
});

// Endpoint to fetch all recipes
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipes', details: error.message });
    }
});

module.exports = router;
