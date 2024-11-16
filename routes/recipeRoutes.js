const express = require('express');
const Recipe = require('../models/Recipe'); // Import the Recipe model
const mongoose = require('mongoose');

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

// Endpoint to get a recipe by id
// GET: Get recipe by ID
router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ data: recipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching recipe', error: error.message });
    }
});

// Endpoint to update a recipe by id
// PUT: Update recipe by ID
router.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, link, image, ingredients } = req.body;

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, { title, link, image, ingredients }, { new: true });
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe updated', data: updatedRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating recipe', error: error.message });
    }
});


//Endpoint to update part of a recipe by id
// PATCH endpoint
router.patch('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Take the partial updates from the request body

    try {
        // Find the recipe by ID and update only the fields provided
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        res.status(200).json({ message: 'Recipe updated', data: updatedRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating recipe', error: error.message });
    }
});


// Endpoint to search recipies with same ingredients
// POST: Search recipes by ingredients with partial matches, sorted by match count
router.post('/search-recipes', async (req, res) => {
    const { ingredients } = req.body; // Ingredients should be an array of strings

    try {
        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ message: 'Ingredients are required for search.' });
        }

        // Create an array of regex patterns for each ingredient
        const regexPatterns = ingredients.map(ingredient => ({
            ingredients: { $regex: ingredient, $options: 'i' } // Case-insensitive match
        }));

        // Find recipes where at least one ingredient partially matches
        const recipes = await Recipe.find({
            $or: regexPatterns
        });

        if (recipes.length === 0) {
            return res.status(404).json({ message: 'No recipes found' });
        }

        // Calculate match count for each recipe
        const recipesWithMatchCount = recipes.map(recipe => {
            const matchCount = recipe.ingredients.filter(ingredient =>
                ingredients.some(searchIngredient =>
                    ingredient.toLowerCase().includes(searchIngredient.toLowerCase())
                )
            ).length;
            return { ...recipe._doc, matchCount }; // Include matchCount in the returned data
        });

        // Sort recipes by match count in descending order
        recipesWithMatchCount.sort((a, b) => b.matchCount - a.matchCount);

        res.status(200).json({ data: recipesWithMatchCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching for recipes', error: error.message });
    }
});



// Endpoint to get recommendations from selected recipes
// POST: Select recipes and get recommendations
router.post('/recommend-recipes', async (req, res) => {
    const { selectedRecipes } = req.body; // Array of selected recipe IDs

    try {
        // Get the ingredients of the selected recipes
        const selectedIngredients = await Recipe.find({ _id: { $in: selectedRecipes } })
            .select('ingredients -_id'); // Only fetch ingredients field, excluding _id

        // Flatten the selected ingredients into a single array
        const ingredientSet = [...new Set(selectedIngredients.flatMap(r => r.ingredients))];

        // Find recommendations and calculate matches
        const recommendations = await Recipe.aggregate([
            {
                $match: {
                    _id: { $nin: selectedRecipes.map(id => new mongoose.Types.ObjectId(id)) }, // Exclude selected recipes
                    ingredients: { $in: ingredientSet } // Match at least one ingredient
                }
            },
            {
                $addFields: {
                    matchCount: {
                        $size: {
                            $setIntersection: ['$ingredients', ingredientSet] // Count common ingredients
                        }
                    }
                }
            },
            { $sort: { matchCount: -1 } }, // Sort by highest matchCount
            { $limit: 50 } // Limit to top 50 recommendations
        ]);

        if (recommendations.length === 0) {
            return res.status(404).json({ message: 'No recommendations found' });
        }

        res.status(200).json({ data: recommendations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating recommendations', error: error.message });
    }
});




// Endpoint to delete a recipe by id
// DELETE: Delete recipe by ID
router.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted', data: deletedRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting recipe', error: error.message });
    }
});




module.exports = router;
